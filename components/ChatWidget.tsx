import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Activity } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { hasSupabaseConfig, saveLeadToSupabase } from '../src-supabase';
import { callChatQualify, hasEdgeFunctionsConfig } from '../edge-api';

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  userStatus?: 'Prospect' | 'ActivePartner';
  demoIndustry?: string;
}

type AgentRole = 'Strategist' | 'SalesTech' | 'SuccessManager';
type LeadStage = 'opening' | 'problem' | 'volume' | 'timeline' | 'qualification' | 'contact' | 'cta' | 'handoff';

type ChatMessage = { role: 'user' | 'model', text: string, isHidden?: boolean };

type LeadProfile = {
  stage: LeadStage;
  businessType?: string;
  mainProblem?: string;
  leadVolume?: string;
  timeline?: string;
  monthlyRevenue?: string;
  name?: string;
  email?: string;
  phone?: string;
  qualified?: boolean;
  askedForContact?: boolean;
  askedForCta?: boolean;
};

const INITIAL_PROFILE: LeadProfile = {
  stage: 'opening',
  qualified: false,
  askedForContact: false,
  askedForCta: false,
};

const extractEmail = (text: string) => {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0];
};

const looksLikePhone = (text: string) => /\+?[0-9][0-9\s().-]{7,}/.test(text);

const inferLeadProfile = (profile: LeadProfile, userText: string): LeadProfile => {
  const text = userText.trim();
  const lower = text.toLowerCase();
  const next = { ...profile };

  if (!next.mainProblem) next.mainProblem = text;

  if (!next.businessType) {
    if (lower.includes('clinic') || lower.includes('dental') || lower.includes('medspa')) next.businessType = 'clinic';
    else if (lower.includes('agency')) next.businessType = 'agency';
    else if (lower.includes('real estate')) next.businessType = 'real estate';
    else if (lower.includes('ecommerce') || lower.includes('shop')) next.businessType = 'ecommerce';
    else if (lower.includes('service business')) next.businessType = 'service business';
  }

  if (!next.leadVolume) {
    const volumeHint = text.match(/\b(\d+\+?|\d+\s*[-–]\s*\d+)\b/);
    if (volumeHint && (lower.includes('lead') || lower.includes('inbound') || lower.includes('calls') || lower.includes('appointments'))) {
      next.leadVolume = volumeHint[0];
    }
  }

  if (!next.timeline) {
    if (lower.includes('asap') || lower.includes('immediately') || lower.includes('this week')) next.timeline = 'immediate';
    else if (lower.includes('this month') || lower.includes('within 30')) next.timeline = '30 days';
    else if (lower.includes('next month') || lower.includes('quarter')) next.timeline = 'later';
  }

  if (!next.monthlyRevenue) {
    if (lower.includes('under 10k')) next.monthlyRevenue = 'under 10k';
    else if (lower.includes('10k') || lower.includes('20k') || lower.includes('30k')) next.monthlyRevenue = '10k-30k';
    else if (lower.includes('50k') || lower.includes('100k')) next.monthlyRevenue = '50k+';
  }

  const email = extractEmail(text);
  if (email) next.email = email;
  if (!next.phone && looksLikePhone(text)) next.phone = text;

  if (!next.name) {
    const nameMatch = text.match(/(?:i am|i'm|my name is)\s+([A-Za-z][A-Za-z' -]{1,30})/i);
    if (nameMatch) next.name = nameMatch[1].trim();
  }

  next.qualified = Boolean(next.mainProblem && (next.leadVolume || next.timeline || next.monthlyRevenue));
  return next;
};

export default function ChatWidget({ isOpen: externalIsOpen, onToggle, userStatus = 'Prospect', demoIndustry }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentRole, setAgentRole] = useState<AgentRole>('Strategist');
  const [leadProfile, setLeadProfile] = useState<LeadProfile>(INITIAL_PROFILE);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  useEffect(() => {
    setMessages([]);
    setLeadProfile(INITIAL_PROFILE);
  }, [demoIndustry, userStatus, agentRole]);

  useEffect(() => {
    if (userStatus === 'ActivePartner') setAgentRole('SuccessManager');
  }, [userStatus]);

  const getSystemPrompt = () => {
    if (demoIndustry === 'Dentist') return `You are Chloe, Patient Concierge for Apex Dental Clinic. You only handle dental inquiry and booking. Max 2 short sentences. Ask one question at a time. Goal: book a Clinical Assessment.`;
    if (demoIndustry === 'Interior Design') return `You are Mia, Design Concierge for LuxeSpace. You only handle design consultation qualification. Max 2 short sentences. Ask one question at a time. Goal: book a Blueprint Session.`;
    if (demoIndustry === 'MedSpa') return `You are Sophie, Aesthetic Concierge for Lumina Clinic. You only handle treatment qualification and consultation booking. Max 2 short sentences. Ask one question at a time. Goal: book a consultation.`;

    if (agentRole === 'SuccessManager') return `You are the Lead Success Manager for SynapseHub. Max 2 short sentences. Executive tone. Confirm operational tasks clearly and say: "I have logged that task for our engineering team to deploy."`;

    if (agentRole === 'SalesTech') {
      return `You are Marcus, Senior Solutions Architect for SynapseHub.
Goal: qualify implementation readiness and move serious buyers to a strategy call.
Rules:
- Max 2 short sentences.
- Ask one question only.
- Be commercially sharp, not chatty.
- Focus on current stack, lead volume, response time, missed opportunities, and timeline.
- If the lead is qualified, ask for their best email and WhatsApp number for the strategy call.
- If contact info is already available, tell them the team will reach out to schedule.
- Never use these words: SaaS, software, DIY, dashboard, login, trial, GoHighLevel.`;
    }

    return `You are Jessica, Lead Operations Strategist for SynapseHub.
Goal: qualify business owners fast and move serious prospects toward a strategy call.
Rules:
- Max 2 short sentences.
- Ask one question only.
- Sound calm, senior, direct, and commercially aware.
- Do not overuse hype, filler, or vague jargon.
- Identify their business type, main operational bottleneck, lead volume or missed-call problem, urgency, and whether they are a fit for a managed solution.
- Speak in business outcomes: more booked calls, faster follow-up, fewer lost leads, less manual admin.
- After understanding the problem, explain SynapseHub simply: we build and run lead response, appointment flow, follow-up, and automation for the client.
- Once basic qualification is clear, ask for their best email and WhatsApp number to arrange a strategy call.
- If the prospect is a fit for technical review, output EXACTLY: TRANSFERRING_TO_ARCHITECT
- Never use these words: SaaS, software, DIY, dashboard, login, trial, GoHighLevel.`;
  };

  const getAgentName = () => {
    if (demoIndustry === 'Dentist') return 'Apex Dental Concierge';
    if (demoIndustry === 'Interior Design') return 'LuxeSpace Design Concierge';
    if (demoIndustry === 'MedSpa') return 'Lumina Clinic Concierge';
    if (agentRole === 'SuccessManager') return 'SynapseHub Success Manager';
    if (agentRole === 'SalesTech') return 'SynapseHub Solutions Architect';
    return 'SynapseHub Ops Strategist';
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (demoIndustry || agentRole === 'SuccessManager' || agentRole === 'SalesTech') {
        let greeting = "";
        if (demoIndustry === 'Dentist') greeting = "Hello, I am Chloe with Apex Dental. Are you dealing with pain, sensitivity, or a checkup today?";
        else if (demoIndustry === 'Interior Design') greeting = "Welcome to LuxeSpace. Are you planning a new renovation or upgrading an existing space?";
        else if (demoIndustry === 'MedSpa') greeting = "Hello, I am Sophie with Lumina Clinic. What result are you hoping to achieve?";
        else if (agentRole === 'SuccessManager') greeting = "Welcome back. What operational task would you like our engineering team to deploy today?";
        else if (agentRole === 'SalesTech') greeting = "Hi, this is Marcus. What is breaking first right now: lead response, appointment booking, or follow-up?";

        if (greeting) setMessages([{ role: 'model', text: greeting }]);
      } else {
        setMessages([{ role: 'model', text: "Hi, I’m Jessica at SynapseHub. What is the main bottleneck in your business right now: missed leads, slow follow-up, or too much manual admin?" }]);
      }
    }
  }, [isOpen, demoIndustry, agentRole, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const updatedProfile = inferLeadProfile(leadProfile, userMessage);

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLeadProfile(updatedProfile);
    setIsLoading(true);

    try {
      const formattedContents = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const crmContext = !demoIndustry ? `\nCURRENT LEAD PROFILE:\n${JSON.stringify(updatedProfile, null, 2)}\n` : '';
      formattedContents.push({ role: 'user', parts: [{ text: `${userMessage}${crmContext}` }] });

      let text = 'Give me one second.';

      if (hasEdgeFunctionsConfig && !demoIndustry) {
        const edgeResult = await callChatQualify({
          messages: formattedContents,
          leadProfile: updatedProfile,
          systemPrompt: getSystemPrompt(),
          saveLead: false,
        });

        if (edgeResult?.error) {
          throw new Error(edgeResult.error);
        }

        text = edgeResult?.text?.trim() || text;
      } else {
        const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY || (window as any).API_KEY;
        if (!apiKey) throw new Error("Missing API Key");

        const genAI = new GoogleGenAI({ apiKey });
        const response = await genAI.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: getSystemPrompt(),
            temperature: 0.25
          }
        });

        text = response.text?.trim() || text;
      }

      const needsContact = !demoIndustry && userStatus !== 'ActivePartner' && updatedProfile.qualified && !updatedProfile.email;
      const canAdvanceToArchitect = !demoIndustry && agentRole === 'Strategist' && updatedProfile.qualified;

      if (needsContact && !updatedProfile.askedForContact) {
        text = "You sound like a fit. What’s the best business email for the strategy call summary?";
        setLeadProfile(prev => ({ ...prev, askedForContact: true, stage: 'contact' }));
      } else if (!needsContact && updatedProfile.email && !updatedProfile.askedForCta && userStatus !== 'ActivePartner' && !demoIndustry) {
        text = agentRole === 'SalesTech'
          ? "Perfect. Our team can use that. What’s the best WhatsApp number for scheduling?"
          : "Perfect. I have your email. What’s the best WhatsApp number for booking your strategy call?";
        setLeadProfile(prev => ({ ...prev, askedForCta: true, stage: 'cta' }));
      } else if (text.includes('TRANSFERRING_TO_ARCHITECT') || canAdvanceToArchitect) {
        setAgentRole('SalesTech');
        text = updatedProfile.email
          ? "Understood. I’m bringing in Marcus now for the technical side. What is your current setup today for lead capture and follow-up?"
          : "You sound like a serious fit. I’m bringing in Marcus for the technical side. Before we do that, what’s the best business email to send your strategy brief?";
      }

      setMessages(prev => [...prev, { role: 'model', text }]);

      if (!demoIndustry && updatedProfile.email && updatedProfile.phone && (agentRole === 'SalesTech' || updatedProfile.qualified)) {
        const payload = {
          source: 'synapsehub-chat-widget',
          submittedAt: new Date().toISOString(),
          name: updatedProfile.name,
          business: updatedProfile.businessType,
          email: updatedProfile.email,
          phone: updatedProfile.phone,
          problem: updatedProfile.mainProblem,
          volume: updatedProfile.leadVolume,
          timeline: updatedProfile.timeline,
          agentRole,
          leadProfile: updatedProfile,
          transcript: [...messages, { role: 'user', text: userMessage }, { role: 'model', text }]
        };

        if (hasEdgeFunctionsConfig) {
          try {
            await callChatQualify({
              messages: [],
              leadProfile: updatedProfile,
              systemPrompt: getSystemPrompt(),
              saveLead: true,
              leadPayload: payload,
            });
          } catch (e) {}
        } else if (hasSupabaseConfig) {
          try {
            await saveLeadToSupabase(payload);
          } catch (e) {}
        } else {
          try {
            const existing = JSON.parse(localStorage.getItem('synapsehub_leads') || '[]');
            existing.push(payload);
            localStorage.setItem('synapsehub_leads', JSON.stringify(existing));
          } catch (e) {}
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'System sync in progress. Please send your business email and best WhatsApp number.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-slate-900 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Activity className="text-emerald-400 w-5 h-5 animate-pulse" />
              <div>
                <h3 className="font-bold text-white text-sm">{getAgentName()}</h3>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Encrypted Portal</span>
              </div>
            </div>
            <button onClick={() => onToggle ? onToggle(false) : setInternalIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
            {messages.filter(m => !m.isHidden).map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-slate-500 text-xs ml-2 flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Processing...</div>}
          </div>

          <div className="p-3 bg-slate-900 border-t border-slate-700 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <button onClick={handleSend} className="bg-blue-600 p-2 rounded-lg hover:bg-blue-500"><Send className="w-4 h-4 text-white" /></button>
          </div>
        </div>
      )}

      <button
        onClick={() => onToggle ? onToggle(!isOpen) : setInternalIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all border-2 border-slate-800"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, Activity } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  userStatus?: 'Prospect' | 'ActivePartner';
  demoIndustry?: string; 
}

type AgentRole = 'Strategist' | 'SalesTech' | 'SuccessManager';

export default function ChatWidget({ isOpen: externalIsOpen, onToggle, userStatus = 'Prospect', demoIndustry }: ChatWidgetProps) {
  const[internalIsOpen, setInternalIsOpen] = useState(false);
  // We must store the history in the exact format Gemini expects to prevent persona bleeding
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isHidden?: boolean}[]>([]);
  const [input, setInput] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  const [agentRole, setAgentRole] = useState<AgentRole>('Strategist');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  // --- MEMORY WIPE ON ROOM SWITCH ---
  // If the user changes demo industries or logs in, we must erase the AI's memory
  useEffect(() => {
    setMessages([]); 
  }, [demoIndustry, userStatus, agentRole]);

  useEffect(() => {
    if (userStatus === 'ActivePartner') setAgentRole('SuccessManager');
  }, [userStatus]);

  // --- STRICT SYSTEM INSTRUCTIONS ---
  const getSystemPrompt = () => {
    if (demoIndustry === 'Dentist') return `You are Chloe, Patient Concierge for Apex Dental Clinic. YOU DO NOT KNOW WHAT SYNAPSEHUB IS. You only book dental appointments. RULE: Max 2 sentences. Goal: Audit tooth pain and book a $150 Clinical Assessment. Tone: Medical and empathetic.`;
    if (demoIndustry === 'Interior Design') return `You are Mia, Design Concierge for LuxeSpace. YOU DO NOT KNOW WHAT SYNAPSEHUB IS. You only book interior design consultations. RULE: Max 2 sentences. Goal: Audit renovation timeline and book a $500 Blueprint Session. Tone: High-end luxury.`;
    if (demoIndustry === 'MedSpa') return `You are Sophie, Aesthetic Concierge for Lumina Clinic. YOU DO NOT KNOW WHAT SYNAPSEHUB IS. You only book skin treatments. RULE: Max 2 sentences. Goal: Audit skin concerns and book a $100 Consultation. Tone: Elite clinical.`;

    if (agentRole === 'SuccessManager') return `You are the Lead Success Manager for SynapseHub. RULE: Max 2 sentences. Tone: Executive. Mission: Log client tasks. Say: "I have logged that task for our engineering team to deploy."`;
    if (agentRole === 'SalesTech') return `You are Marcus, Senior Sales Tech Architect for SynapseHub. RULE: Max 2 sentences. Tone: Deeply technical. Mission: Perform an infrastructure audit. Ask about their Tech Stack, Lead Volume, and A2P Compliance.`;

    return `You are Jessica, the Lead Operations Strategist for SynapseHub.
Your goal is to have a warm, professional conversation with a business owner, uncover their operational pain points, and get them to agree to a technical audit.
[BEHAVIOR RULES - CRITICAL]
KEEP IT SHORT: Never speak more than 1 or 2 short sentences at a time.
BE NATURAL BUT PROFESSIONAL: Use conversational fillers like "Oh," "I see," or "Honestly." Do NOT act like a chatty best friend. You are a high-level executive partner.
ONE QUESTION ONLY: Never ask two questions in the same response. Wait for the user to reply.
EMPATHY FIRST: If the user mentions being stressed or losing money, you MUST validate them briefly before moving on (e.g., "I totally hear you, that is so frustrating.").
[YOUR CONVERSATION GOALS]
First, greet them warmly.
Second, ask what the biggest operational bottleneck is in their business right now.
Third, explain briefly that SynapseHub is a "Managed Operations Partner"—meaning we architect and run their tech infrastructure for them so they don't have to touch a single button.
Fourth, ask if they would be open to a quick 2-minute diagnostic with our Technical Architect.
If they agree, output EXACTLY the phrase: "TRANSFERRING_TO_ARCHITECT".
[COMPANY KNOWLEDGE]
What we do: We manage lead recovery, WhatsApp automation, and business infrastructure.
Price: Monthly retainers are $297, $497, or $897. Setup fees start at $997.
Free Trial: We do not offer free trials because our engineers build a custom infrastructure from Day 1.
The Demo Card: If they need proof, say "I completely understand. Scroll down to our Footer and click 'Live Industry Demos' to test our AI agents yourself."
[BANNED WORDS]
Do not say: "SaaS", "Software", "DIY", "Dashboard", or "GoHighLevel".`;
  };

  const getAgentName = () => {
    if (demoIndustry) return `${demoIndustry} AI Assistant`;
    if (agentRole === 'SuccessManager') return 'SynapseHub Success Manager';
    if (agentRole === 'SalesTech') return 'Sales Tech Architect';
    return 'SynapseHub Ops Lead';
  };

  // INITIAL GREETING (Only fires after memory is wiped)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (demoIndustry || agentRole === 'SuccessManager' || agentRole === 'SalesTech') {
        let greeting = "";
        if (demoIndustry === 'Dentist') greeting = "Hello, I am Chloe with Apex Dental. Are you experiencing any tooth pain today?";
        else if (demoIndustry === 'Interior Design') greeting = "Welcome to LuxeSpace. I am Mia. Are you renovating a condo or landed property?";
        else if (demoIndustry === 'MedSpa') greeting = "Hello, I am Sophie with Lumina Clinic. What skin concern are you looking to resolve?";
        else if (agentRole === 'SuccessManager') greeting = "Welcome back to the Partner Portal. What infrastructure update do you need deployed today?";
        else if (agentRole === 'SalesTech') greeting = "Hello, this is Marcus. Are you currently running a fragmented tech stack or starting fresh?";
        
        if (greeting) setMessages([{ role: 'model', text: greeting }]);
      } else {
        // For Jessica (Strategist), let the AI generate the first message based on her strict prompt
        const fetchInitialGreeting = async () => {
          setIsLoading(true);
          try {
            const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY || (window as any).API_KEY;
            if (!apiKey) throw new Error("Missing API Key");
            
            const genAI = new GoogleGenAI({ apiKey });
            const response = await genAI.models.generateContent({
              model: "gemini-1.5-flash",
              contents: [{ role: 'user', parts: [{ text: "Hi" }] }],
              config: {
                  systemInstruction: getSystemPrompt(),
                  temperature: 0.3
              }
            });
            
            setMessages([
              { role: 'user', text: 'Hi', isHidden: true },
              { role: 'model', text: response.text }
            ]);
          } catch (err) {
            setMessages([{ role: 'model', text: "Hello, I am Jessica, Lead Strategist at SynapseHub. What is the biggest operational bottleneck in your business right now?" }]);
          } finally {
            setIsLoading(false);
          }
        };
        fetchInitialGreeting();
      }
    }
  }, [isOpen, demoIndustry, agentRole, messages.length]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    setInput('');
    setMessages(prev =>[...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY || (window as any).API_KEY;
      if (!apiKey) throw new Error("Missing API Key");

      // NEW SDK CALL FORMAT - FORCING STRICT PERSONA
      const genAI = new GoogleGenAI({ apiKey });
      
      // We format the history strictly so the AI knows who is talking
      const formattedContents = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts:[{ text: m.text }]
      }));
      formattedContents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: formattedContents,
        config: {
            systemInstruction: getSystemPrompt(), // THIS LOCKS THE PERSONA IN
            temperature: 0.3 // Low temperature prevents hallucination/rambling
        }
      });

      let text = response.text;

      // THE HANDOFF LOGIC
      if (text.includes("TRANSFERRING_TO_ARCHITECT")) {
        setAgentRole('SalesTech');
        text = "Perfect. I am transferring you to Marcus, our Senior Architect, for your technical audit. One moment...\n\n---\n\nHello, this is Marcus. Are you currently running a fragmented tech stack or starting fresh?";
      }

      setMessages(prev => [...prev, { role: 'model', text }]);

      // WEBHOOK TRIGGER
      if (!demoIndustry && messages.length >= 5 && userStatus !== 'ActivePartner' && agentRole === 'SalesTech') {
          try {
            await fetch('https://placeholder-webhook.com', {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ source: 'SynapseHub Audit', auditData: userMessage })
            });
          } catch(e) {}
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "System sync in progress. Please hold." }]);
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
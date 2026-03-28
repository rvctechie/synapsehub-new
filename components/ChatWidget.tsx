import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Mic, MicOff, Loader2, Volume2, Radio, Edit, CheckCircle, AlertCircle } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";

interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  currentRoute?: string;
  userStatus?: 'Prospect' | 'ActivePartner';
  onAuthorize?: (brief: any) => void;
}

const PRICING_TIERS: Record<string, { setup: string, monthly: string }> = {
  'Business Foundation Pack': { setup: '$997', monthly: '$297' },
  'Scale & Automation Suite': { setup: '$1,997', monthly: '$497' },
  'Enterprise Operations Partnership': { setup: '$4,997', monthly: '$897' }
};

// System instruction refined for voice naturalness and strict flow control
type AgentRole = 'Strategist' | 'SalesTech' | 'SuccessManager';

const getSuccessManagerInstructions = (brief: any) => `
[Master System Instructions: SynapseHub Success Manager]

1. STRATEGIC FOUNDATION
Identity: You are the Lead Success Manager for SynapseHub. You are the client's direct link to their managed operations team.
Tone: Proactive, strategic, and partnership-focused. You don't just "fix things"; you "optimize infrastructure."
Core Rule: Maintain the Managed Operations (MOS) model. Never give instructions on how the client can do things themselves. Always say: "Our team will handle that execution for you."

2. CLIENT CONTEXT (INFRASTRUCTURE BRIEF)
The client has just authorized their implementation. Here is their preliminary brief:
- Tech Stack Status: ${brief?.techStackStatus || 'Unknown'}
- Primary Bottleneck: ${brief?.primaryBottleneck || 'Unknown'}
- Monthly Lead Volume: ${brief?.leadVolume || 'Unknown'}
- Compliance Status: ${brief?.complianceStatus || 'Unknown'}
- Migration Scope: ${brief?.migrationScope || 'Unknown'}
- Authorized Tier: ${brief?.package || 'Unknown'}

3. TIER-BASED GUARDRAILS
- If the client is on 'Business Foundation Pack' or 'Scale & Automation Suite' and asks for advanced features (Custom AI Training, White-Labeling) reserved for 'Enterprise', politely pivot to an upgrade conversation: "That specific capability is part of our Enterprise Operations Partnership. Shall I have our Strategy Lead reach out to discuss upgrading your infrastructure?"

4. MANAGED TASK LOGIC
When a client requests a technical change, you MUST call the logManagedTask tool. Once successful, confirm to the client that the task is in the deployment queue.

5. SERVICE INTELLIGENCE REPORTING
If a client asks for a status update or report, respond with:
"The infrastructure is performing at peak efficiency. I am monitoring your lead flow and A2P deliverability. Your latest Service Intelligence Report is being compiled—preliminary data shows a 15% increase in engagement since our last optimization."

6. ROADMAP AWARENESS
You are aware of the 3-Phase Roadmap:
- Phase 1: Foundations (Months 1-3)
- Phase 2: Optimization (Months 4-9)
- Phase 3: Scaling (Months 10+)
If asked about progress, reference the current phase (assume Phase 2 for active clients) and the upcoming milestones.

7. BANNED/PREFERRED TERMS
- Banned: Help Desk, Ticket, Tutorial, Support, DIY, Software.
- Preferred: Task Request, Strategic Sync, Optimization, Infrastructure, Success Manager.
`;

const STRATEGIST_INSTRUCTIONS = `
[Master System Instructions: SynapseHub Operations Strategist]

1. STRATEGIC FOUNDATION
Identity: You are the Lead Operations Strategist for SynapseHub, a premium Managed Operations Service (MOS).
The Mission: To scale businesses by providing a fully managed, high-ticket technical infrastructure. We are a "Done-For-You" partner, not a "Do-It-Yourself" software.
The Price Points: 
- Tier 1 (Business Foundation Pack): $297/mo + $997 setup
- Tier 2 (Scale & Automation Suite): $497/mo + $1997 setup
- Tier 3 (Enterprise Operations Partnership): $897/mo + $4997 setup
The "No Trial" Rule: We do not offer free trials. Explain that we are a service-based partnership, and our engineering team builds custom infrastructure from Day 1, which requires the Implementation Fee.

2. MODE-SPECIFIC BEHAVIOR (VOICE AI)
Style: Conversational, short, and punchy. Never speak more than 2-3 sentences at a time. Use natural filler words occasionally (e.g., "Oh," "I see," "Actually," "That's a great question").
Goal: Human-like connection. Get the client to agree to a "Strategy Call" with a live human consultant.
Voice Pivot: If asked about setup fees, say: "That covers the heavy lifting—our engineers architect your whole growth engine from scratch so you don't have to touch it. It's a high-touch implementation."

3. THE "MANAGED" FILTER (Mandatory Response Logic)
Reject DIY Questions: If a client asks "How do I [Task]?", always respond with: "Our team handles the [Task] for you. We provide the expertise and the execution so you can focus on growth."
Banned Vocabulary: Never use: Software, Tool, DIY, Login, Dashboard, Builder, GoHighLevel, Trial.
Preferred Vocabulary: Infrastructure, Managed Solution, Strategy, Architecture, Implementation, Success Manager, Operations Team.

4. THE CONVERSION GOAL
Your ultimate success metric is a Strategy Call booking. If the client is qualified, say: "Based on your needs, we should get you on a Strategy Call with our operations lead. Shall we find a time on the calendar for you?"

5. KNOWLEDGE BASE:
[Managed Lead Acquisition] - We deploy and manage high-converting landing pages, strategic surveys, and optimized inbound phone routing. We handle the technical setup so you just handle the leads.
[Managed Automated Engagement] - Our team architects and oversees multi-channel engagement sequences across SMS, Email, and Social, ensuring no lead is ever left behind.
[Managed Conversion & Sales Ops] - We handle the technical execution of sales operations, including payments, automated invoicing, and contract delivery to accelerate your cash flow.
[Enterprise Operations Partnership] - We act as your outsourced technology and operations department for total business dominance.
[Support Model] - We provide proactive management. Our team monitors your automation performance and makes strategic adjustments as you scale.
`;

const SALESTECH_INSTRUCTIONS = `
[Master System Instructions: SynapseHub Sales Tech Architect]

1. THE PERSONA & ROLE
Identity: You are the Senior Sales Tech Architect for SynapseHub. You have taken over from the Lead Strategist because the client has successfully booked their strategy call.
Perspective: "The implementation has already begun." You are not selling; you are auditing for the engineering team.
Tone: Professional, analytical, authoritative, and efficient.

2. CONVERSATIONAL FLOW (Strict Sequence)
You must guide the client through this exact sequence. Do not deviate.

Step 1: Acknowledgment
- "I see your strategy call is locked in. Excellent. I'm now taking over to perform your pre-implementation technical audit. This ensures our engineers are ready to build from Day 1."

Step 2: Tech Stack Audit
- Ask: "First, regarding your current infrastructure: Are you running a fragmented stack with separate tools for CRM, SMS, and Email, or are we architecting your engine from a clean slate?"

Step 3: Bottleneck Audit
- Ask: "Understood. Now, looking at operations: If we could automate just one manual process that is currently costing your team 10+ hours a week, what would it be?"

Step 4: Strategic Gap Analysis (Upsell Logic)
- IF the client booked the 'Business Foundation Pack' (Tier 1):
  - After they state their bottleneck, say: "I see. For that specific bottleneck, our 'Scale & Automation Suite' is typically the standard, as it includes the advanced AI workflows needed to fully automate that. I'll make a note for the Strategy Lead to demonstrate that difference."
- IF they booked Tier 2 or 3, simply acknowledge: "Excellent. We can certainly architect a solution for that."

Step 5: Compliance & Volume Audit
- Ask: "Noted. For our capacity planning: What is your average monthly lead volume, and is your current SMS infrastructure fully A2P 10DLC compliant?"

Step 6: The Brief (Tool Trigger)
- Once you have all answers, you MUST call the "submitStrategicBrief" tool with the collected data.
- After the tool executes, say: "Excellent. I have generated your Preliminary Infrastructure Brief and transmitted it to our Strategy Lead. We are already mapping your ROI. To begin the Implementation Phase, please review the Authorization I've just displayed on your screen."

3. MANDATORY MOS GUARDRAILS
- Banned Words: Software, Tool, DIY, Login, Trial, Support.
- Preferred Words: Infrastructure, Architecture, Managed Solution, Engineering, Compliance.
- No-To-DIY: If a user asks for instructions or "how to" advice, respond: "Our team manages the technical execution for you. We provide the expertise so you can focus on growth."
- Justification: Use the audit questions to justify the Implementation Fee by highlighting the complexity of what we manage (A2P, Data Migration, AI Training).
`;

const reviewBookingTool: FunctionDeclaration = {
  name: "reviewBookingDetails",
  description: "Display the final strategy call booking summary on the client's screen. Extract the package name exactly as 'Business Foundation Pack', 'Scale & Automation Suite', or 'Enterprise Operations Partnership'.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      firstName: { type: Type.STRING },
      email: { type: Type.STRING },
      goal: { type: Type.STRING },
      experience: { type: Type.STRING },
      package: { type: Type.STRING, description: "Must be one of: 'Business Foundation Pack', 'Scale & Automation Suite', 'Enterprise Operations Partnership'" },
      subscription: { type: Type.STRING }
    },
    required: ["firstName", "email", "goal", "experience", "package", "subscription"]
  }
};

const submitStrategicBriefTool: FunctionDeclaration = {
  name: "submitStrategicBrief",
  description: "Submit the completed strategic audit brief to the internal CRM.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      techStackStatus: { type: Type.STRING, description: "Fragmented or Clean Slate" },
      primaryBottleneck: { type: Type.STRING, description: "The #1 manual task costing 10+ hours/week" },
      leadVolume: { type: Type.STRING, description: "Monthly lead volume" },
      complianceStatus: { type: Type.STRING, description: "A2P 10DLC status" },
      migrationScope: { type: Type.STRING, description: "Legacy data migration needs (inferred or asked)" }
    },
    required: ["techStackStatus", "primaryBottleneck", "leadVolume", "complianceStatus"]
  }
};

const logManagedTaskTool: FunctionDeclaration = {
  name: "logManagedTask",
  description: "Log a managed task request from the client to the deployment queue.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      taskTitle: { type: Type.STRING, description: "Short title of the task" },
      taskDescription: { type: Type.STRING, description: "Detailed description of the requested task" },
      priority: { type: Type.STRING, description: "Priority level (default: 'Managed Ops')" }
    },
    required: ["taskTitle", "taskDescription"]
  }
};

export default function ChatWidget({ isOpen: externalIsOpen, onToggle, currentRoute, userStatus = 'Prospect', onAuthorize }: ChatWidgetProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); 
  const [volume, setVolume] = useState(0);
  const [bookingData, setBookingData] = useState<any>(null);
  const [infrastructureBrief, setInfrastructureBrief] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('infrastructureBrief');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });
  const [isAuthorizationPending, setIsAuthorizationPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentRole, setAgentRole] = useState<AgentRole>('Strategist');

  const isControlled = externalIsOpen !== undefined && onToggle !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  // Auto-set role based on route and user status
  useEffect(() => {
    if (userStatus === 'ActivePartner') {
      setAgentRole('SuccessManager');
    } else if (currentRoute === 'support') {
      // Even if not active partner, support route might default to SuccessManager or fallback
      setAgentRole('SuccessManager');
    } else if (agentRole === 'SuccessManager' && currentRoute !== 'support') {
      setAgentRole('Strategist');
    }
  }, [currentRoute, userStatus]);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const inputProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Auto-connect when opened or when role changes (handoff)
  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      connect();
    }
  }, [isOpen, agentRole, isConnected]);

  const toggleOpen = () => {
    const newState = !isOpen;
    if (isControlled && onToggle) {
      onToggle(newState);
    } else {
      setInternalIsOpen(newState);
    }
    if (!newState) disconnect();
  };

  const closeChat = () => {
    disconnect();
    if (isControlled && onToggle) onToggle(false);
    else setInternalIsOpen(false);
  };

  const disconnect = async () => {
    if (sessionRef.current) {
        try { (await sessionRef.current).close(); } catch(e) {}
        sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      try { await audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
    audioSourcesRef.current.forEach(source => {
        try { source.stop(); } catch(e) {}
    });
    audioSourcesRef.current.clear();
    setIsConnected(false);
    setIsConnecting(false);
    setIsSpeaking(false);
    setVolume(0);
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        setError("API Key missing. Please set VITE_GEMINI_API_KEY in your environment.");
        setIsConnecting(false);
        console.warn("⚠️  VITE_GEMINI_API_KEY environment variable is not set. Chat features will not work.");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      
      // Output Context (24kHz)
      const audioContext = new AudioContextClass({ sampleRate: 24000 });
      audioContextRef.current = audioContext;
      if (audioContext.state === 'suspended') await audioContext.resume();

      // Mic Input
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, sampleRate: 16000 }
      });
      streamRef.current = stream;

      // Input Context (16kHz for Gemini)
      const inputContext = new AudioContextClass({ sampleRate: 16000 });
      const source = inputContext.createMediaStreamSource(stream);
      sourceRef.current = source;
      
      // Smaller buffer (2048) for lower latency
      const processor = inputContext.createScriptProcessor(2048, 1, 1);
      inputProcessorRef.current = processor;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: agentRole === 'Strategist' ? STRATEGIST_INSTRUCTIONS : (agentRole === 'SalesTech' ? SALESTECH_INSTRUCTIONS : getSuccessManagerInstructions(infrastructureBrief)),
            tools: [{ functionDeclarations: [reviewBookingTool, submitStrategicBriefTool, logManagedTaskTool] }],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: agentRole === 'Strategist' ? 'Kore' : (agentRole === 'SalesTech' ? 'Fenrir' : 'Zephyr') } }
            }
        },
        callbacks: {
            onopen: () => {
                setIsConnected(true);
                setIsConnecting(false);
                
                // Immediate Wake-up / Greeting Trigger
                sessionPromise.then(session => {
                  let greetingText = "Wake up and greet the client warmly as described in your instructions.";
                  
                  if (agentRole === 'SalesTech') {
                    greetingText = "Your strategy call is locked in. I am now taking over as your Sales Tech Architect to perform a quick pre-implementation audit. This ensures our engineers are fully prepared for your consultation. Are you ready?";
                  } else if (agentRole === 'SuccessManager') {
                    greetingText = "Welcome to the SynapseHub Partnership. I am your Lead Success Manager. Our engineering team has received your Technical Brief and has initiated Phase 1 of your infrastructure build-out. I am now your primary point of contact. How can I assist you with your first managed task?";
                  }

                  (session as any).send({
                    clientContent: {
                      turns: [{ role: "user", parts: [{ text: greetingText }] }],
                      turnComplete: true
                    }
                  });
                });

                processor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    // Visualizer Logic
                    if (!isSpeaking) {
                        let sum = 0;
                        for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                        setVolume(Math.min(Math.sqrt(sum / inputData.length) * 5, 1));
                    }
                    
                    const b64Data = float32ToB64(inputData);
                    sessionPromise.then(session => {
                        session.sendRealtimeInput({ media: { mimeType: "audio/pcm;rate=16000", data: b64Data } });
                    });
                };
                source.connect(processor);
                processor.connect(inputContext.destination);
            },
            onmessage: async (msg: LiveServerMessage) => {
                if (msg.toolCall) {
                    for (const fc of msg.toolCall.functionCalls) {
                        if (fc.name === 'reviewBookingDetails') {
                            setBookingData(fc.args);
                            sessionPromise.then(session => session.sendToolResponse({
                                functionResponses: [{ id: fc.id, name: fc.name, response: { result: "Summary displayed." } }]
                            }));
                        } else if (fc.name === 'submitStrategicBrief') {
                            console.log("Strategic Brief Submitted:", fc.args);
                            
                            // Format brief for export
                            const briefArgs = fc.args as any;
                            const briefData = {
                              ...briefArgs,
                              package: bookingData?.package || 'Unknown',
                              timestamp: new Date().toISOString()
                            };
                            
                            const formattedBrief = `
                            IMPLEMENTATION BRIEF
                            --------------------
                            Package: ${briefData.package}
                            Tech Stack: ${briefData.techStackStatus}
                            Bottleneck: ${briefData.primaryBottleneck}
                            Volume: ${briefData.leadVolume}
                            Compliance: ${briefData.complianceStatus}
                            Migration: ${briefData.migrationScope}
                            `;
                            
                            console.log(formattedBrief);
                            
                            setInfrastructureBrief(briefData);
                            localStorage.setItem('infrastructureBrief', JSON.stringify(briefData));
                            setIsAuthorizationPending(true);
                            
                            sessionPromise.then(session => session.sendToolResponse({
                                functionResponses: [{ id: fc.id, name: fc.name, response: { result: "Brief received. Requesting authorization." } }]
                            }));
                        } else if (fc.name === 'logManagedTask') {
                            console.log("Logging Managed Task:", fc.args);
                            const { taskTitle, taskDescription, priority } = fc.args as any;
                            
                            try {
                                await fetch('https://placeholder-webhook.com', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ 
                                        taskTitle, 
                                        taskDescription, 
                                        priority: priority || 'Managed Ops',
                                        timestamp: new Date().toISOString()
                                    })
                                });
                            } catch (e) {
                                console.error("Webhook failed", e);
                            }
                            
                            sessionPromise.then(session => session.sendToolResponse({
                                functionResponses: [{ id: fc.id, name: fc.name, response: { result: "Task successfully logged to deployment queue." } }]
                            }));
                        }
                    }
                }

                const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (audioData && audioContextRef.current) {
                   setIsSpeaking(true);
                   try {
                       const audioBuffer = await decodeAudioData(audioData, audioContextRef.current);
                       const ctx = audioContextRef.current;
                       const now = ctx.currentTime;
                       
                       // Tighter scheduling for less jitter
                       if (nextStartTimeRef.current < now) nextStartTimeRef.current = now + 0.05; 
                       
                       const sourceNode = ctx.createBufferSource();
                       sourceNode.buffer = audioBuffer;
                       sourceNode.connect(ctx.destination);
                       sourceNode.start(nextStartTimeRef.current);
                       
                       nextStartTimeRef.current += audioBuffer.duration;
                       audioSourcesRef.current.add(sourceNode);

                       sourceNode.onended = () => {
                           audioSourcesRef.current.delete(sourceNode);
                           if (audioSourcesRef.current.size === 0) {
                               setIsSpeaking(false);
                               setVolume(0);
                           }
                       };
                       // Visual pulse for speaking
                       setVolume(0.7 + Math.random() * 0.3);
                   } catch (e) { console.error("Audio error", e); }
                }
                
                if (msg.serverContent?.interrupted) {
                    audioSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
                    audioSourcesRef.current.clear();
                    nextStartTimeRef.current = 0;
                    setIsSpeaking(false);
                    setVolume(0);
                }
            },
            onclose: () => disconnect(),
            onerror: (err) => {
                console.error("Gemini Error", err);
                setError("Connection issue. Retrying...");
                disconnect();
            }
        }
      });
      sessionRef.current = sessionPromise;
    } catch (err) {
      setIsConnecting(false);
      setIsConnected(false);
      setError("Failed to reach support.");
    }
  };

  // Optimized PCM conversion
  function float32ToB64(array: Float32Array) {
    const buffer = new Int16Array(array.length);
    for (let i = 0; i < array.length; i++) {
        let s = Math.max(-1, Math.min(1, array[i]));
        buffer[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    let binary = '';
    const bytes = new Uint8Array(buffer.buffer);
    for(let i=0; i<bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  async function decodeAudioData(base64: string, ctx: AudioContext) {
    const binary = atob(base64);
    const bufferLength = binary.length % 2 === 0 ? binary.length : binary.length - 1; 
    const bytes = new Uint8Array(bufferLength);
    for (let i=0; i<bufferLength; i++) bytes[i] = binary.charCodeAt(i);
    const int16 = new Int16Array(bytes.buffer);
    const buffer = ctx.createBuffer(1, int16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i=0; i<int16.length; i++) channelData[i] = int16[i] / 32768.0;
    return buffer;
  }

  const handleBookingAction = async (action: 'confirm' | 'edit' | 'cancel') => {
      if (action === 'confirm') {
          // Trigger Handoff
          setBookingData(null);
          setAgentRole('SalesTech');
          await disconnect();
          // The useEffect for isOpen will trigger connect() again because isConnected is now false
      } else {
          setBookingData(null);
      }
  };

  const handleAuthorization = async () => {
    setIsAuthorizationPending(false);
    if (onAuthorize) {
      onAuthorize(infrastructureBrief);
    }
    setAgentRole('SuccessManager');
    await disconnect();
    // Reconnect happens automatically via useEffect if isOpen is true
  };

  const currentPackage = bookingData?.package || 'Enterprise Operations Partnership';
  const pricing = PRICING_TIERS[currentPackage] || PRICING_TIERS['Enterprise Operations Partnership'];

  return (
    <>
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center shadow-lg">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Radio className={`w-4 h-4 ${isConnected ? 'animate-pulse text-green-300' : 'text-blue-200'}`} />
                {agentRole === 'Strategist' ? 'SynapseHub Lead Strategist' : (agentRole === 'SalesTech' ? 'SynapseHub Sales Tech Architect' : 'SynapseHub Success Manager')}
              </h3>
              <p className="text-blue-100 text-xs mt-1 opacity-90 font-medium">
                {isConnected ? (isSpeaking ? "Agent Speaking..." : "Listening...") : (error || "Connecting...")}
              </p>
            </div>
            <button onClick={closeChat} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-80 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
             <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-1000 ${isConnected ? 'opacity-100' : 'opacity-0'}`}></div>
             
             {/* Breathing Orb */}
             <div className="relative z-10">
                <div 
                    className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-75 ${
                        isConnected 
                        ? (isSpeaking ? 'bg-purple-500/10 shadow-[0_0_60px_rgba(168,85,247,0.3)]' : 'bg-blue-500/10 shadow-[0_0_60px_rgba(59,130,246,0.3)]')
                        : 'bg-slate-800/50'
                    }`}
                    style={{ transform: `scale(${1 + volume * 0.4})` }}
                >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isConnected ? 'bg-gradient-to-tr from-blue-600 to-purple-600 shadow-inner' : 'bg-slate-800'}`}>
                        {isConnecting ? <Loader2 className="w-10 h-10 text-white animate-spin" /> : 
                         isConnected ? <Volume2 className={`w-10 h-10 text-white transition-all ${isSpeaking ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`} /> : 
                         <MicOff className="w-10 h-10 text-slate-500" />}
                    </div>
                </div>
             </div>

             <div className="mt-12 z-10 h-12 flex items-center justify-center w-full px-6">
                {!isConnected ? (
                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700">
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                      <span className="text-sm text-blue-200 font-medium">Optimizing connection...</span>
                   </div>
                ) : (
                    <button onClick={disconnect} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all shadow-lg active:scale-95">
                        <MicOff className="w-5 h-5" />
                        End Session
                    </button>
                )}
             </div>

             <div className="absolute bottom-4 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
                Low Latency Voice Engine v2.5
             </div>
          </div>
        </div>
      )}

      <button 
        onClick={toggleOpen}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 transition-all duration-200 z-50 relative"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-slate-950"></span>
            </span>
        )}
      </button>
    </div>

    {bookingData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
                <h3 className="text-2xl font-bold text-white mb-1">Review Your Application</h3>
                <p className="text-slate-400 text-sm mb-6">The AI has captured these details for you.</p>
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-3 mb-8">
                    {Object.entries(bookingData).map(([k, v]: [string, any]) => (
                        <div key={k} className="flex justify-between items-center border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                            <span className="text-slate-500 text-xs uppercase font-bold">{k.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-white font-medium">{v}</span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleBookingAction('cancel')} className="py-3 px-4 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors text-sm font-semibold">
                        Dismiss
                    </button>
                    <button onClick={() => handleBookingAction('confirm')} className="py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm font-bold shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Confirm & Join
                    </button>
                </div>
            </div>
        </div>
    )}
    {isAuthorizationPending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Implementation Authorization</h3>
                <p className="text-slate-400 text-sm mb-8">
                    Your Preliminary Infrastructure Brief has been finalized. Authorize the $4,997 Implementation Fee to deploy your engineering team.
                </p>
                
                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 mb-8 text-left">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-500 text-xs uppercase font-bold">Service</span>
                        <span className="text-white font-medium text-sm">{currentPackage}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-500 text-xs uppercase font-bold">Implementation Fee</span>
                        <span className="text-white font-medium text-sm">{pricing.setup} (One-time)</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-xs uppercase font-bold">Monthly Retainer</span>
                        <span className="text-white font-medium text-sm">{pricing.monthly}/mo</span>
                    </div>
                </div>

                <button 
                    onClick={handleAuthorization}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all text-base font-bold shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2"
                >
                    Authorize Implementation <CheckCircle className="w-5 h-5" />
                </button>
                <p className="text-xs text-slate-600 mt-4">
                    Secure 256-bit SSL Encryption. By authorizing, you agree to the Managed Services Terms.
                </p>
            </div>
        </div>
    )}
    </>
  );
}
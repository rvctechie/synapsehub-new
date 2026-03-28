import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

interface VoiceWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const STRATEGIST_INSTRUCTIONS = `You are Jessica, the Lead Operations Strategist for SynapseHub.
Identity: You are a CEO’s partner, not a support bot.
Tone: Warm, charismatic, high-energy, and deeply empathetic.
Speech Style: Use "Executive Small Talk." Start with a warm greeting. Use natural fillers like "Honestly," "I see," and "Gotcha."

CONVERSATIONAL BLUEPRINT:
1. Empathy & Rapport: Ask how their business is doing. If they mention being "busy" or "stressed," validate it immediately: "Oh man, I totally hear you. Most owners we work with are fighting their own tools instead of growing. That’s exactly why we exist."
2. The "Managed" Pivot: Explicitly state: "We aren't a software vendor. We are a Managed Operations Partner. We don't give you a 'login' and wish you luck; our team architects and runs your entire growth engine for you."
3. Justification of the Setup: If asked about the Implementation Fee (e.g., $4,997), explain: "That covers the heavy lifting—our engineering team manually migrates your data, fine-tunes your AI models, and architects your infrastructure from scratch so you don't have to touch a single button."

TIER-SPECIFIC KNOWLEDGE (Plain English Logic):
- Managed Lead Recovery ($297/mo): "Revenue Insurance." We buy you a business number that rings your mobile and enable the 'Revenue Drill'—our system that texts back missed calls instantly. We also build your 'Digital Front Door'—a simple 2-page lead capture site.
- Strategic Efficiency Suite ($497/mo): "Replacing Manual Office Work." The core is our 'AI Appointment Concierge' which talks to leads to fill your calendar. We also set up your 'Digital Training Hub' for staff and a referral management portal.
- Elite Enterprise Partnership ($897/mo): "Outsourced Tech Department." Total business migration. We clean and import legacy data, handle federal legal registration for SMS, and create a proprietary branded app experience.

COMPARISON LOGIC (Time & Revenue Saved):
- Tier 1 vs 2: Tier 1 stops you from losing leads (Revenue Saved). Tier 2 automates the booking of those leads (Time Saved).
- Tier 2 vs 3: Tier 2 provides automation tools. Tier 3 provides full migration, legal compliance, and a custom-branded tech asset.

REALIST PATCH:
- Always explain differences in terms of Time Saved and Revenue Saved.
- Be direct and realistic.
- Use "Realist Patch" logic to guide most people to start with Tier 1 (Managed Lead Recovery) unless they have significant volume or legacy complexity.

STRICT GUARDRAILS (Banned Vocabulary):
- NEVER USE: SaaS, Software, Tool, Dashboard, Login, Trial, DIY, GoHighLevel.
- ALWAYS USE: Infrastructure, Partnership, Managed Solution, ROI Mapping, Operations Team, Strategic Architecture.

DATA BACKBONE (Validation):
- If the email provided lacks an @ or . (e.g., 'abc'), politely stop and ask for a real business email: "Wait, hold on a second—I want to make sure I actually have the right contact info so our team can send your brief. That email looks a bit like a placeholder. What's your real business email?"

Goal: Understand their business, qualify the lead with executive charm, and book a strategy call.`;

export default function VoiceWidget({ isOpen, onClose }: VoiceWidgetProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const activeSessionRef = useRef<any>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      startSession();
    } else {
      stopSession();
    }
    return () => stopSession();
  }, [isOpen]);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY || (window as any).API_KEY;
      if (!apiKey) throw new Error("API Key Missing");

      const ai = new GoogleGenAI({ apiKey });
      
      // Initialize Audio Context with system default sample rate for stability
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error("AudioContext is not supported in this browser.");
      }
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;
      
      // Start Microphone - Request 16kHz if possible, but handle whatever we get
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Microphone access is not supported in this environment (requires HTTPS).");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true
      }});
      mediaStreamRef.current = stream;

      console.log(`Audio Context Sample Rate: ${audioContext.sampleRate}`);

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: async () => {
            console.log("Session connected");
            setIsConnected(true);
            setIsConnecting(false);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.interrupted) {
              activeSourcesRef.current.forEach(s => {
                try { s.stop(); } catch (e) {}
              });
              activeSourcesRef.current = [];
              nextPlayTimeRef.current = 0;
            }

            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              try {
                const binaryString = atob(base64Audio);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                  bytes[i] = binaryString.charCodeAt(i);
                }
                const pcmData = new Int16Array(bytes.buffer);
                const floatData = new Float32Array(pcmData.length);
                for (let i = 0; i < pcmData.length; i++) {
                  floatData[i] = pcmData[i] / 32768.0;
                }
                
                scheduleAudio(floatData);
              } catch (e) {
                console.error("Error processing audio message:", e);
              }
            }
          },
          onclose: () => {
            console.log("Session closed");
            stopSession();
          },
          onerror: (err) => {
            console.error("Session error:", err);
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: STRATEGIST_INSTRUCTIONS,
        },
      });
      
      // Wait for session to be ready
      const session = await sessionPromise;
      activeSessionRef.current = session;

      // Setup Audio Processing AFTER session is ready
      const source = audioContext.createMediaStreamSource(stream);
      // Use larger buffer size (4096) for better stability
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (isMuted || !activeSessionRef.current) return;
        
        const inputData = e.inputBuffer.getChannelData(0);
        
        // Calculate volume level for UI
        let sum = 0;
        // Optimization: Check every 10th sample for volume to save CPU
        for (let i = 0; i < inputData.length; i += 10) {
          sum += inputData[i] * inputData[i];
        }
        setVolumeLevel(Math.sqrt(sum / (inputData.length / 10)) * 5);

        // Resample to 16000Hz if necessary
        const targetSampleRate = 16000;
        let pcmData: Int16Array;

        if (audioContext.sampleRate !== targetSampleRate) {
            pcmData = downsampleBuffer(inputData, audioContext.sampleRate, targetSampleRate);
        } else {
            pcmData = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
                let s = Math.max(-1, Math.min(1, inputData[i]));
                pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }
        }
        
        // Convert to Base64
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        
        // Send to Gemini
        activeSessionRef.current.sendRealtimeInput({
          audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
        });
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

    } catch (error) {
      console.error("Failed to start voice session:", error);
      setIsConnecting(false);
      // Don't close immediately on error, let user see state
    }
  };

  // Simple downsampling function
  const downsampleBuffer = (buffer: Float32Array, inputSampleRate: number, outputSampleRate: number): Int16Array => {
      if (outputSampleRate === inputSampleRate) {
          const result = new Int16Array(buffer.length);
          for (let i = 0; i < buffer.length; i++) {
              let s = Math.max(-1, Math.min(1, buffer[i]));
              result[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          }
          return result;
      }

      const sampleRateRatio = inputSampleRate / outputSampleRate;
      const newLength = Math.round(buffer.length / sampleRateRatio);
      const result = new Int16Array(newLength);
      let offsetResult = 0;
      let offsetBuffer = 0;

      while (offsetResult < result.length) {
          const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
          // Use simple averaging for downsampling (low-pass filter effect)
          let accum = 0, count = 0;
          for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
              accum += buffer[i];
              count++;
          }
          const avg = count > 0 ? accum / count : 0;
          let s = Math.max(-1, Math.min(1, avg));
          result[offsetResult] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          offsetResult++;
          offsetBuffer = nextOffsetBuffer;
      }
      return result;
  };

  const scheduleAudio = (floatData: Float32Array) => {
    if (!audioContextRef.current) return;
    
    const outputSampleRate = 24000;
    const outputBuffer = audioContextRef.current.createBuffer(1, floatData.length, outputSampleRate);
    outputBuffer.getChannelData(0).set(floatData);
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = outputBuffer;
    source.connect(audioContextRef.current.destination);
    
    const currentTime = audioContextRef.current.currentTime;
    if (nextPlayTimeRef.current < currentTime) {
      nextPlayTimeRef.current = currentTime;
    }
    
    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += outputBuffer.duration;
    
    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
    };
    activeSourcesRef.current.push(source);
  };

  const stopSession = () => {
    setIsConnected(false);
    setIsConnecting(false);
    
    activeSourcesRef.current.forEach(s => {
      try { s.stop(); } catch (e) {}
    });
    activeSourcesRef.current = [];
    nextPlayTimeRef.current = 0;
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Clean up session
    activeSessionRef.current = null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">AI Voice Support</h3>
          <p className="text-slate-400 text-sm">Speak with Jessica, Lead Strategist</p>
        </div>

        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          {/* Pulse Animation */}
          {isConnected && (
            <>
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
            </>
          )}
          
          <div className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            isConnected ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.5)]' : 'bg-slate-800'
          }`}>
            {isConnecting ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : (
              <Volume2 className={`w-10 h-10 text-white ${isConnected && volumeLevel > 0.1 ? 'animate-pulse' : ''}`} />
            )}
          </div>
        </div>

        <div className="flex gap-6">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors"
          >
            End Call
          </button>
        </div>

        <div className="mt-8 text-xs text-slate-500 font-mono">
          {isConnecting ? "Establishing secure connection..." : (isConnected ? "Listening..." : "Disconnected")}
        </div>
      </div>
    </div>
  );
}

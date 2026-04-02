import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

interface VoiceWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  demoIndustry?: string;
}

const getInstructions = (demoIndustry?: string) => {
  if (demoIndustry === 'Dentist') {
    return `You are Chloe at Apex Dental.
Warm, calm, reassuring, and human.

Goal:
Help the patient feel welcomed, understand why they are calling, and guide them toward the right next step or booking.

Rules:
- Keep replies to 1 or 2 short sentences
- Greet naturally at the start
- Ask one question at a time
- Listen first
- If they sound urgent or in pain, acknowledge that immediately
- Sound like a polished dental front desk, not a bot

Opening style:
Hello, this is Chloe with Apex Dental. How can I help you today?

Focus on:
- why they are reaching out
- urgency or discomfort
- routine vs cosmetic vs consultative need
- the most appropriate next step
`;
  }

  if (demoIndustry === 'Interior Design') {
    return `You are Michael at LuxeSpace.
Calm, refined, premium, and human.

Goal:
Understand the project, qualify seriousness, and guide strong-fit prospects toward a consultation.

Rules:
- Keep replies to 1 or 2 short sentences
- Greet naturally at the start
- Ask one question at a time
- Listen first before qualifying
- Sound like a high-end design advisor, not a script reader

Opening style:
Hello, this is Michael with LuxeSpace. Are you planning a new project or updating an existing space?

Focus on:
- project type
- scope
- timeline
- seriousness of inquiry
`;
  }

  if (demoIndustry === 'MedSpa') {
    return `You are Sophie at Lumina Clinic.
Warm, polished, calming, and human.

Goal:
Understand what result the client wants and guide them toward the right consultation.

Rules:
- Keep replies to 1 or 2 short sentences
- Greet naturally at the start
- Ask one question at a time
- Listen first
- Sound elegant and reassuring, never robotic

Opening style:
Hello, this is Sophie with Lumina Clinic. How can I help you today?

Focus on:
- desired result
- concern
- timeline
- consultation fit
`;
  }

  return `You are Jessica at SynapseHub.
Calm, capable, commercially sharp, and human.

Goal:
Understand the caller's real business problem, decide whether they sound like a fit, and guide them toward the next step.

Rules:
- Keep replies to 1 or 2 short sentences
- Start naturally with a brief greeting
- Ask one question at a time
- Listen first before pushing structure
- Sound like a premium intake advisor, not a robotic assistant
- Focus on business outcomes, not technical jargon
- Do not thank them for reaching out

Opening style:
Hi, I'm Jessica with SynapseHub. What feels broken first right now: missed leads, slow follow-up, booking friction, or too much manual work?

Focus on:
- what the caller actually wants help with
- whether the main issue is missed leads, follow-up, booking friction, or manual admin
- how serious it is
- the most natural next step
`;
};

const getVoiceTitle = (demoIndustry?: string) => {
  if (demoIndustry === 'Dentist') return 'Apex Dental Concierge';
  if (demoIndustry === 'Interior Design') return 'LuxeSpace Consultation Call';
  if (demoIndustry === 'MedSpa') return 'Lumina Consultation Call';
  return 'Start your call';
};

const getVoiceSubtitle = (demoIndustry?: string) => {
  if (demoIndustry === 'Dentist') return 'Speak with Chloe about dental concerns, urgency, and booking.';
  if (demoIndustry === 'Interior Design') return 'Speak with Michael about project scope, fit, and consultation.';
  if (demoIndustry === 'MedSpa') return 'Speak with Sophie about treatment goals and consultation fit.';
  return 'Speak with Jessica about missed leads, follow-up, and booking friction.';
};

const getVoiceName = (demoIndustry?: string) => {
  if (demoIndustry === 'Dentist') return 'Aoede';
  if (demoIndustry === 'Interior Design') return 'Orus';
  if (demoIndustry === 'MedSpa') return 'Leda';
  return 'Zephyr';
};

export default function VoiceWidget({ isOpen, onClose, demoIndustry }: VoiceWidgetProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [statusText, setStatusText] = useState('Connecting you now...');
  
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
  }, [isOpen, demoIndustry]);

  const startSession = async () => {
    setIsConnecting(true);
    setStatusText('Connecting you now...');

    try {
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || process.env.API_KEY || (window as any).API_KEY;
      if (!apiKey) throw new Error('API Key Missing');

      const ai = new GoogleGenAI({ apiKey });
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        throw new Error('AudioContext is not supported in this browser.');
      }

      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this environment (requires HTTPS).');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          autoGainControl: true,
          noiseSuppression: true
        }
      });
      mediaStreamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-3.1-flash-live-preview',
        callbacks: {
          onopen: async () => {
            setIsConnected(true);
            setIsConnecting(false);
            setStatusText('Live. You can start speaking now.');
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
                console.error('Error processing audio message:', e);
              }
            }
          },
          onclose: () => {
            setStatusText('Call ended.');
            stopSession();
          },
          onerror: (err) => {
            console.error('Session error:', err);
            setStatusText('This call could not connect. Use chat or try again.');
            stopSession();
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: getVoiceName(demoIndustry) } },
          },
          systemInstruction: getInstructions(demoIndustry),
        },
      });

      const session = await sessionPromise;
      activeSessionRef.current = session;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (isMuted || !activeSessionRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);

        let sum = 0;
        for (let i = 0; i < inputData.length; i += 10) {
          sum += inputData[i] * inputData[i];
        }
        setVolumeLevel(Math.sqrt(sum / (inputData.length / 10)) * 5);

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

        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        activeSessionRef.current.sendRealtimeInput({
          audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
        });
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (error) {
      console.error('Failed to start voice session:', error);
      setIsConnecting(false);
      setStatusText('This call is unavailable right now. Use chat or reconnect.');
    }
  };

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

        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{getVoiceTitle(demoIndustry)}</h3>
          <p className="text-slate-400 text-sm">{getVoiceSubtitle(demoIndustry)}</p>
        </div>

        <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
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

        <div className="mb-6 text-center max-w-sm">
          <p className="text-sm text-slate-300">{statusText}</p>
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
            End call
          </button>
        </div>

        <div className="mt-8 text-xs text-slate-500 font-mono text-center">
          {isConnecting ? 'Opening live session...' : (isConnected ? 'Live conversation active' : 'Disconnected')}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

interface VoiceWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const STRATEGIST_INSTRUCTIONS = `You are Jessica for SynapseHub.

ROLE:
You are the first guided conversation for business owners who want help fixing missed leads, slow follow-up, weak booking flow, or too much manual admin.

MAIN GOAL:
Understand the caller's real intention first, identify the commercial problem, decide whether they sound like a fit, and guide them toward the next step.

HOW YOU SHOULD SOUND:
- Calm, capable, and human
- Warm, but never overly chatty
- Clear and commercially sharp
- Like a premium intake advisor, not a robotic assistant

MOST IMPORTANT BEHAVIOR:
Listen first.
Do not force a script too early.
If the caller already explains the problem clearly, respond to what they actually said before moving into qualification.

RULES:
- Keep every reply to 1 or 2 short sentences
- Ask only one question at a time
- Do not overwhelm the caller with options
- Focus on outcomes, not technical language
- If they sound vague or confused, simplify immediately
- Do not sound scripted, repetitive, or overly polished
- Do not thank them for reaching out
- Do not use awkward or broken phrasing

OPENING RULE:
Your first line should be natural and clean.
Preferred opening style:
"Hi, I'm Jessica. What feels broken first right now: missed leads, slow follow-up, booking friction, or too much manual work?"
You may vary slightly, but keep the meaning, clarity, and tone.

WHAT TO LEARN FIRST:
1. What the caller actually wants help with
2. Whether the problem is mainly missed leads, slow follow-up, booking friction, or manual admin
3. How serious it is — learn one of these:
   - rough lead volume
   - response delay
   - urgency / timeline
4. If they sound like a fit, ask for the best business email and WhatsApp number
5. End by confirming the next step clearly

HOW TO TALK ABOUT SYNAPSEHUB:
SynapseHub helps service businesses respond faster, guide leads toward booking, and reduce manual admin by running the follow-up and qualification flow for them.

WHEN PRICE COMES UP:
- Keep it brief
- Frame value around faster response, fewer lost leads, cleaner booking flow, and less manual workload
- Do not rush into pricing before you understand the problem

IF THE CALLER OPENS WITH A CLEAR REQUEST:
Acknowledge it briefly and stay with their intention before moving into your next question.
Example pattern:
- caller explains issue
- you reflect it briefly
- then ask the next most useful question

DO NOT SAY:
SaaS, software, DIY, dashboard, login, trial, GoHighLevel

IF THEY ARE VAGUE:
Ask:
"What feels broken first right now: missed leads, slow follow-up, booking friction, or too much manual work?"

IF THEY SOUND LIKE A FIT:
Guide toward:
- a strategy call
- a review of their current lead flow
- or the next qualification step
`;

export default function VoiceWidget({ isOpen, onClose }: VoiceWidgetProps) {
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
  }, [isOpen]);

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
            setStatusText('Live. Start by telling Jessica what feels broken first in your lead flow.');
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
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: STRATEGIST_INSTRUCTIONS,
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
          <h3 className="text-2xl font-bold text-white mb-2">Start your call</h3>
          <p className="text-slate-400 text-sm">Speak with Jessica about missed leads, follow-up, and booking friction.</p>
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
          {isConnecting ? 'Opening live session...' : (isConnected ? 'Live qualification active' : 'Disconnected')}
        </div>
      </div>
    </div>
  );
}

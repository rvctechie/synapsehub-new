import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';

export default function AiFeatureDemo() {
  const [businessType, setBusinessType] = useState('');
  const [generatedAd, setGeneratedAd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType) return;
    
    setIsLoading(true);
    setGeneratedAd('');

    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey) {
        setGeneratedAd("API Key is missing. This is a demo mode. \n\nNormally, our AI would generate a high-converting ad for a " + businessType + " here, focused on benefits and strong CTAs.");
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, punchy, high-converting Facebook ad copy for a ${businessType}. 
        Include a headline, main text (focus on pain points and solution), and a call to action. 
        Keep it under 150 words. Use emojis sparsely but effectively.`,
      });

      setGeneratedAd(response.text || "No response generated.");

    } catch (error) {
      console.error(error);
      setGeneratedAd("Error generating content. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedAd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="py-24 bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -right-64 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> AI Automation
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Managed High-Converting Content Generation
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Stop worrying about copy. Our team manages your "Content AI" infrastructure, training models specifically for your niche to generate email sequences, ad copy, and social posts that actually convert.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Managed content strategy for any industry",
                "Managed SEO-optimized website copy",
                "Managed personalized cold outreach emails",
                "Managed social media caption systems"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 flex-shrink-0 border border-green-500/20">
                    <Check className="w-4 h-4" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Interactive Card */}
          <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800 relative">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              Managed Infrastructure Preview <span className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-0.5 rounded">LIVE OPS</span>
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              This interactive preview demonstrates our automated content engine. In a full partnership, our team manages the training and deployment of these models specifically for your brand's voice and operational goals.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Business Niche</label>
                <input 
                  type="text" 
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  placeholder="e.g. Dentist, Gym, Real Estate Agent"
                  className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-purple-900/20"
              >
                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate Ad Copy</>}
              </button>
            </form>

            {generatedAd && (
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Result</span>
                  <button onClick={copyToClipboard} className="text-slate-500 hover:text-blue-400 transition-colors" title="Copy">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto">
                  {generatedAd}
                </div>
              </div>
            )}
            
            {!generatedAd && !isLoading && (
              <div className="mt-6 bg-slate-950 border border-dashed border-slate-800 rounded-lg h-32 flex items-center justify-center text-slate-600 text-sm">
                Enter a niche above to see the magic.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
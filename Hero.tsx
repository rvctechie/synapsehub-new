import React from 'react';
import { ChevronRight, MessageCircle, Phone } from 'lucide-react';

interface HeroProps {
  onOpenChat?: () => void;
  onOpenRoadmap?: () => void;
  onOpenVoice?: () => void;
}

export default function Hero({ onOpenChat, onOpenRoadmap, onOpenVoice }: HeroProps) {
  return (
    <section className="relative pt-40 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-950">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/40 to-slate-950"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/60 text-slate-300 text-xs md:text-sm font-medium mb-10 hover:border-slate-700 transition-colors cursor-pointer backdrop-blur-sm group">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-white">Now Available:</span> AI-Powered Managed Operations
          <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Your Operations. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x">Fully Managed.</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light">
          We build, manage, and optimize your entire business infrastructure — AI agents, automations, CRM, and communications — so you can focus on closing deals.
        </p>

        {/* CTA Area */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

          {/* Voice CTA — Clean, no fake photo */}
          <button 
            onClick={onOpenVoice}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all duration-300 flex items-center gap-3 group shadow-lg shadow-blue-600/25 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xs text-blue-200 font-medium uppercase tracking-wider">Talk to Our AI</span>
              <span className="block text-lg font-bold">Start Voice Demo</span>
            </div>
          </button>

          {/* Chat CTA */}
          <button 
            onClick={onOpenChat}
            className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 flex items-center gap-3 group hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
              <MessageCircle className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="text-left">
              <span className="block text-xs text-slate-500 font-medium uppercase tracking-wider">Chat with Jessica</span>
              <span className="block text-lg font-bold">AI Strategy Call</span>
            </div>
          </button>

          <button 
            onClick={onOpenRoadmap}
            className="px-6 py-4 rounded-xl text-slate-400 hover:text-white transition-all font-medium flex items-center gap-2 group"
          >
            View Growth Roadmap <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>No setup required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>PDPA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span>Results in 30 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}

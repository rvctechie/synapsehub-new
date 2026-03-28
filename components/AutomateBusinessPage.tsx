import React from 'react';
import { ArrowLeft, CheckCircle, BarChart, Users, MessageSquare, Zap } from 'lucide-react';

interface AutomateBusinessPageProps {
  onBack: () => void;
  onOpenChat: () => void;
}

export default function AutomateBusinessPage({ onBack, onOpenChat }: AutomateBusinessPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Automate Business. Scale Faster.
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            The Managed Operations Service to handle your leads, sales pipeline, and customer communication. 
            We replace 10+ fragmented systems with one unified, managed dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Managed Lead Acquisition</h3>
              <p className="text-slate-400 mb-6">
                We deploy and manage high-converting acquisition systems. Our team oversees every interaction, ensuring your lead pipeline is always full and optimized.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" /> Strategic Lead Scoring
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" /> Managed Follow-up Sequences
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" /> Managed Multi-channel Acquisition
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Managed Sales Operations</h3>
              <p className="text-slate-400 mb-6">
                We architect and manage your sales operations. From visual pipeline design to automated task execution, we ensure your deals move toward closing with zero friction.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5" /> Strategic Pipeline Design
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5" /> Managed Revenue Forecasting
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5" /> Automated Sales Task Management
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Managed Engagement Hub</h3>
              <p className="text-slate-400 mb-6">
                We unify and manage your entire communication ecosystem. Our team ensures every message across Email, SMS, and Social is handled with professional precision.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" /> Managed Unified Inbox
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" /> Managed AI Support Agents
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" /> Strategic Call Ops & Transcription
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Managed Workflow Automation</h3>
              <p className="text-slate-400 mb-6">
                We build and maintain complex, high-performance automations. Our technical team handles the logic and integrations so your business runs on autopilot.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5" /> Custom Workflow Architecture
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5" /> Managed Enterprise Integrations
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5" /> Strategic Logic & Optimization
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to scale your operations?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Join the fastest growing companies consolidating their infrastructure with our managed operations partnership.
            </p>
            <button 
              onClick={onOpenChat}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowLeft, CheckCircle, Activity, Server, Database, Globe, MessageSquare } from 'lucide-react';

interface StatusPageProps {
  onBack: () => void;
}

export default function StatusPage({ onBack }: StatusPageProps) {
  const systems = [
    { name: 'Website availability', status: 'Operational', icon: <Server className="w-5 h-5" /> },
    { name: 'Qualification flow', status: 'Operational', icon: <Activity className="w-5 h-5" /> },
    { name: 'Lead storage', status: 'Operational', icon: <Database className="w-5 h-5" /> },
    { name: 'Messaging channels', status: 'Operational', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Public site delivery', status: 'Operational', icon: <Globe className="w-5 h-5" /> }
  ];

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

        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 mb-12 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Service Status: Operational</h1>
            <p className="text-slate-400 text-lg">
              Core site and qualification systems are currently available.
            </p>
          </div>

          <div className="space-y-4 mb-12">
            <h2 className="text-xl font-bold text-white px-4 mb-6 uppercase tracking-widest text-sm">Status details</h2>
            {systems.map((system, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-slate-500">
                    {system.icon}
                  </div>
                  <span className="font-medium text-slate-200">{system.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-emerald-500 font-bold text-sm uppercase tracking-wider">{system.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Operational note</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-0">
              This page should reflect real service state. If you do not have live monitoring yet, keep status claims conservative and update them only when they can be verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

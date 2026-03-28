import React from 'react';
import { ArrowLeft, CheckCircle, Cpu, Globe, Lock, Share2 } from 'lucide-react';

interface IntegrationsPageProps {
  onBack: () => void;
}

export default function IntegrationsPage({ onBack }: IntegrationsPageProps) {
  const integrations = [
    {
      name: "Communication Infrastructure",
      description: "Twilio & Mailgun",
      details: "Our team handles the technical API heavy lifting for high-deliverability SMS and Email infrastructure, including A2P 10DLC registration and dedicated IP management.",
      icon: <Share2 className="w-6 h-6 text-blue-400" />
    },
    {
      name: "Financial Operations",
      description: "Stripe & Quickbooks",
      details: "Seamless integration of your payment gateways and accounting systems. We manage the data flow from checkout to balance sheet.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />
    },
    {
      name: "Marketing Intelligence",
      description: "Meta & Google Tracking",
      details: "Total Data Harmony. We deploy and manage tracking pixels, server-side API conversions, and attribution models managed by experts.",
      icon: <Globe className="w-6 h-6 text-purple-400" />
    },
    {
      name: "Enterprise Security",
      description: "SSO & Compliance",
      details: "Managed security layers ensuring your data remains private and compliant with global standards like GDPR and SOC2.",
      icon: <Lock className="w-6 h-6 text-red-400" />
    }
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

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            A Unified Architectural Ecosystem.
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Stop worrying about API keys and webhooks. Our team handles the technical integration of your entire tech stack, ensuring total data harmony across your managed infrastructure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {integrations.map((item, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-blue-400 text-sm font-bold mb-4 uppercase tracking-wider">{item.description}</p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">Custom API Development</h2>
                <p className="text-slate-400 leading-relaxed">
                  Need a custom bridge between proprietary systems? Our engineering team builds bespoke integrations to ensure your managed infrastructure remains the single source of truth for your business.
                </p>
              </div>
              <button 
                className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-colors whitespace-nowrap"
              >
                Inquire About Custom Ops
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

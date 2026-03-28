import React from 'react';
import { ArrowLeft, CheckCircle, ShieldCheck, Globe, Lock, Server, Users, TrendingUp } from 'lucide-react';

interface RoadmapPageProps {
  onBack: () => void;
  onOpenChat?: () => void;
}

export default function RoadmapPage({ onBack, onOpenChat }: RoadmapPageProps) {
  const phases = [
    {
      title: "Phase 1: Foundations & Compliance (Months 1-3)",
      badge: "PDPA COMPLIANT ARCHITECTURE",
      description: "Establishing a secure, legally compliant operational baseline.",
      items: [
        "PDPA Data Sovereignty Audit & Implementation",
        "WhatsApp Business API Enterprise Integration",
        "Legacy System Migration & Data Cleaning",
        "Unified Omni-Channel Communication Hub"
      ],
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />
    },
    {
      title: "Phase 2: Optimization & Automation (Months 4-9)",
      description: "Replacing manual labor with high-efficiency automated workflows.",
      items: [
        "Headcount Optimization & Workflow Automation",
        "Automated Lead Recovery & Nurture Systems",
        "Cross-Channel Customer Journey Mapping",
        "Real-Time Sales Intelligence Dashboarding"
      ],
      icon: <Server className="w-8 h-8 text-blue-400" />
    },
    {
      title: "Phase 3: Scale & Expansion (Months 10+)",
      description: "Infrastructure for regional dominance and high-volume growth.",
      items: [
        "Regional Market Expansion Infrastructure",
        "Advanced AI Agent Training & Fine-Tuning",
        "Enterprise API & Webhook Integrations",
        "Predictive Revenue Analytics & Forecasting"
      ],
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />
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

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Your Path to Operational Excellence <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">in the Asian Market.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              A fully managed, "Done-For-You" infrastructure rollout designed specifically for high-growth B2B enterprises in the region. We handle the complexity so you can handle the scale.
            </p>
          </div>

          <div className="space-y-8 mb-20 relative">
            {/* Vertical Line for Timeline Effect */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-800 hidden md:block"></div>

            {phases.map((phase, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl relative overflow-hidden ml-0 md:ml-20 hover:border-slate-600 transition-colors group">
                {/* Timeline Dot */}
                <div className="absolute left-[-4.5rem] top-10 w-4 h-4 rounded-full bg-slate-950 border-4 border-blue-500 hidden md:block z-10"></div>
                
                {phase.badge && (
                  <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-emerald-500/20 tracking-widest uppercase">
                    {phase.badge}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                    <p className="text-slate-400 mb-6 font-medium">{phase.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Managed Operations Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Why Managed Operations?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
                <Users className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Headcount Optimization</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Eliminate the need for a $4,000/mo Operations Manager. Our managed infrastructure replaces expensive manual overhead with automated precision.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
                <Globe className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Regional Compliance</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ensure 100% legal compliance in regional communication. We navigate PDPA and local data sovereignty laws so you don't have to.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
                <Lock className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  US-Grade Security (Wyoming LLC) combined with local management ensures your data is protected by the highest international standards.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/5"></div>
            <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to architect your future?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
              Our engineering team is ready to begin your Phase 1 implementation. Secure your market position today.
            </p>
            <button 
              onClick={onOpenChat}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25 relative z-10"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowLeft, CheckCircle, Calendar, Zap, TrendingUp } from 'lucide-react';

interface RoadmapPageProps {
  onBack: () => void;
}

export default function RoadmapPage({ onBack }: RoadmapPageProps) {
  const phases = [
    {
      title: "Foundations (Months 1-3)",
      description: "Infrastructure Audit, A2P Compliance, Channel Consolidation.",
      items: [
        "Full Infrastructure Audit & Gap Analysis",
        "A2P 10DLC Federal Regulatory Registration",
        "Omni-channel Communication Consolidation",
        "Legacy Data Migration & System Sunsetting"
      ],
      icon: <Calendar className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Optimization (Months 4-9)",
      description: "AI Agent Deployment, Multi-channel Nurturing, ROI Tracking.",
      items: [
        "Custom AI Support & Sales Agent Deployment",
        "Advanced Multi-channel Nurturing Architectures",
        "Real-time ROI & Attribution Tracking",
        "Managed A/B Testing & Conversion Optimization"
      ],
      icon: <Zap className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Scaling (Months 10+)",
      description: "Affiliate Infrastructure, Custom AI Fine-tuning, Brand Expansion.",
      items: [
        "Managed Affiliate & Partner Infrastructure",
        "Proprietary AI Model Fine-tuning",
        "Multi-brand Operational Expansion",
        "Advanced Predictive Analytics Integration"
      ],
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />
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
            Your 12-Month Path to Operational Excellence.
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            We don't just set up systems; we architect a long-term growth engine. Our strategic roadmap ensures your infrastructure evolves with your business, maintaining peak performance at every stage of scale.
          </p>

          <div className="space-y-12 mb-16">
            {phases.map((phase, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  {phase.icon}
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center">
                    {phase.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                    <p className="text-blue-400 font-medium">{phase.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your roadmap?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our engineering team is ready to begin your Phase 1 implementation. Let's architect your future.
            </p>
            <button 
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

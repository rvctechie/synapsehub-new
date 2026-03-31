import React from 'react';
import { ArrowRight, Paintbrush, Sparkles, Stethoscope } from 'lucide-react';

interface DemoProofSectionProps {
  onOpenDemo: (industry: string) => void;
}

export default function DemoProofSection({ onOpenDemo }: DemoProofSectionProps) {
  const demos = [
    {
      id: 'Dentist',
      title: 'Luxury Dental Clinic',
      icon: <Stethoscope className="w-7 h-7 text-blue-400" />,
      description: 'See how a premium front-desk experience can qualify patient inquiries and guide them naturally toward booking.',
      proof: 'Proof of calm intake, triage-style questioning, and appointment direction.',
      border: 'border-blue-500/30',
      glow: 'from-blue-900/40 to-cyan-900/40'
    },
    {
      id: 'Interior Design',
      title: 'High-End Interior Design',
      icon: <Paintbrush className="w-7 h-7 text-purple-400" />,
      description: 'Test a high-ticket consultation flow designed to filter serious buyers without sounding cold or robotic.',
      proof: 'Proof of premium qualification, tone control, and guided discovery.',
      border: 'border-purple-500/30',
      glow: 'from-purple-900/40 to-pink-900/40'
    },
    {
      id: 'MedSpa',
      title: 'Medical Aesthetics (MedSpa)',
      icon: <Sparkles className="w-7 h-7 text-emerald-400" />,
      description: 'Preview a consultation flow that handles common questions smoothly and moves interested prospects toward the next step.',
      proof: 'Proof of polished intake, objection handling, and booking-oriented flow.',
      border: 'border-emerald-500/30',
      glow: 'from-emerald-900/40 to-teal-900/40'
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-white mb-5 tracking-tight">The proof is in the experience</h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            Instead of asking you to trust generic claims, SynapseHub lets you experience how guided intake, qualification, and booking can feel across three different service businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => onOpenDemo(demo.id)}
              className={`text-left relative overflow-hidden rounded-2xl bg-slate-900 border ${demo.border} p-8 hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${demo.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 shadow-lg">
                  {demo.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{demo.title}</h3>
                <p className="text-slate-400 mb-5 leading-relaxed">
                  {demo.description}
                </p>
                <div className="text-sm text-slate-500 mb-7">
                  {demo.proof}
                </div>
                <div className="flex items-center text-white font-medium group-hover:text-blue-400 transition-colors">
                  Open live example <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

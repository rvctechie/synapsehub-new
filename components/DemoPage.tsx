import React from 'react';
import { Stethoscope, Paintbrush, Sparkles, ArrowRight } from 'lucide-react';

interface DemoPageProps {
  onSelectDemo: (industry: string) => void;
}

export default function DemoPage({ onSelectDemo }: DemoPageProps) {
  const industries = [
    {
      id: 'Dentist',
      name: 'Luxury Dental Clinic',
      icon: <Stethoscope className="w-8 h-8 text-blue-400" />,
      description: 'Experience a premium intake flow designed to guide new patient inquiries naturally toward booking.',
      gradient: 'from-blue-900/40 to-cyan-900/40',
      border: 'border-blue-500/30'
    },
    {
      id: 'Interior Design',
      name: 'High-End Interior Design',
      icon: <Paintbrush className="w-8 h-8 text-purple-400" />,
      description: 'See how a high-ticket consultation flow can qualify serious renovation prospects with a more polished first touch.',
      gradient: 'from-purple-900/40 to-pink-900/40',
      border: 'border-purple-500/30'
    },
    {
      id: 'MedSpa',
      name: 'Medical Aesthetics (MedSpa)',
      icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
      description: 'Preview a consultation intake experience built to handle common questions and move prospects toward the next step.',
      gradient: 'from-emerald-900/40 to-teal-900/40',
      border: 'border-emerald-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Showroom</span>
          </h1>
          <p className="text-xl text-slate-400">
            Explore how a polished intake and qualification experience can be adapted for different types of businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => onSelectDemo(industry.id)}
              className={`text-left relative overflow-hidden rounded-2xl bg-slate-900 border ${industry.border} p-8 hover:scale-105 transition-all duration-300 group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6 shadow-lg">
                  {industry.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{industry.name}</h3>
                <p className="text-slate-400 mb-8 line-clamp-3">
                  {industry.description}
                </p>
                <div className="flex items-center text-white font-medium group-hover:text-blue-400 transition-colors">
                  Open Demo Experience <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

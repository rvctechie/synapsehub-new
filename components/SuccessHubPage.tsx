import React from 'react';
import { ArrowLeft, TrendingUp, Clock, Target, BarChart, Zap, ArrowRight } from 'lucide-react';

interface SuccessHubPageProps {
  onBack: () => void;
}

export default function SuccessHubPage({ onBack }: SuccessHubPageProps) {
  const outcomes = [
    {
      initials: "ZM",
      company: "Digital Agency (B2B)",
      gradient: "from-blue-600 to-indigo-600",
      headline: "From Fragmentation to Harmony.",
      subheadline: "Consolidated 5 tools into 1 managed infrastructure.",
      results: [
        { label: "Hours Saved/Week", value: "20+", icon: <Clock className="w-5 h-5" /> },
        { label: "Tools Eliminated", value: "5", icon: <Zap className="w-5 h-5" /> },
        { label: "Operational ROI", value: "312%", icon: <TrendingUp className="w-5 h-5" /> }
      ],
      quote: "We were drowning in subscriptions and Zapier errors. SynapseHub's team audited our stack and rebuilt it into a single, silent engine. We saved 20 hours of manual labor in the first week."
    },
    {
      initials: "SD",
      company: "Professional Services Firm",
      gradient: "from-emerald-600 to-teal-600",
      headline: "Revenue Acceleration.",
      subheadline: "Deployed Managed AI Support Agents and Lead Recovery.",
      results: [
        { label: "Booked Appointments", value: "+30%", icon: <Target className="w-5 h-5" /> },
        { label: "Response Time", value: "< 2m", icon: <Clock className="w-5 h-5" /> },
        { label: "Revenue Increase", value: "$45k", icon: <BarChart className="w-5 h-5" /> }
      ],
      quote: "I didn't want another tool; I wanted a result. The managed AI agents started booking appointments while I slept. We saw a 30% increase in qualified calls within 30 days of deployment."
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
              Real Results. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Managed by Experts.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              We don't sell software; we sell operational outcomes. See how our managed infrastructure transforms chaos into revenue.
            </p>
          </div>

          <div className="space-y-16 mb-20">
            {outcomes.map((study, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-colors">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-10 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-8">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${study.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                          {study.initials}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{study.company}</h3>
                          <p className="text-slate-400 text-sm font-medium">Managed Operations Client</p>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                          {study.headline}
                        </h2>
                        <p className="text-blue-400 font-medium text-lg">
                          {study.subheadline}
                        </p>
                      </div>

                      <div className="bg-slate-950/50 rounded-2xl p-8 border border-slate-800 relative">
                        <p className="text-slate-300 italic leading-relaxed relative z-10">
                          "{study.quote}"
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-72 space-y-4 shrink-0">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Key Metrics</div>
                      {study.results.map((result, i) => (
                        <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-center gap-4 hover:border-blue-500/30 transition-colors group">
                          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-colors">
                            {result.icon}
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors">{result.value}</p>
                            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">{result.label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mb-12">
            <p className="text-xs text-slate-600 italic">Results based on actual client outcomes. Individual results may vary based on industry and implementation scope.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to be our next success story?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our engineering team is ready to audit your infrastructure and identify immediate ROI opportunities.
            </p>
            <button 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
            >
              Start Your Implementation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowLeft, TrendingUp, Clock, Target, Quote } from 'lucide-react';

interface SuccessHubPageProps {
  onBack: () => void;
}

export default function SuccessHubPage({ onBack }: SuccessHubPageProps) {
  const caseStudies = [
    {
      name: "Michael Chen",
      company: "Zenith Media",
      headline: "Consolidating 5 Fragmented Systems into One Managed Infrastructure",
      results: [
        { label: "Operational ROI", value: "312%", icon: <TrendingUp className="w-5 h-5" /> },
        { label: "Time Saved/Week", value: "25 Hours", icon: <Clock className="w-5 h-5" /> },
        { label: "Lead Conversion", value: "+45%", icon: <Target className="w-5 h-5" /> }
      ],
      quote: "The managed systems consolidated our entire business operations into one seamless flow. We moved from 5 fragmented systems to a single, professionally managed infrastructure.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      name: "David Miller",
      company: "ScaleUp Digital",
      headline: "Strategic Deployment for Rapid Market Expansion",
      results: [
        { label: "Market Entry", value: "14 Days", icon: <TrendingUp className="w-5 h-5" /> },
        { label: "Tech Overhead", value: "-60%", icon: <Clock className="w-5 h-5" /> },
        { label: "System Uptime", value: "99.99%", icon: <Target className="w-5 h-5" /> }
      ],
      quote: "The most strategic operations partner for high-growth companies. The results were immediate, and the strategic deployment by the SynapseHub team saved us months of technical trial and error.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
            Real Results. Managed by Experts.
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            We measure our success by the operational efficiency and ROI we deliver to our partners. Explore how high-growth companies are scaling faster with SynapseHub's managed infrastructure.
          </p>

          <div className="space-y-16 mb-16">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <img src={study.image} alt={study.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/20" />
                        <div>
                          <h3 className="text-xl font-bold text-white">{study.name}</h3>
                          <p className="text-slate-500 text-sm">{study.company}</p>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
                        {study.headline}
                      </h2>
                      <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 mb-8 italic text-slate-300 relative">
                        <Quote className="absolute -top-3 -left-3 w-8 h-8 text-slate-800 fill-current opacity-50" />
                        "{study.quote}"
                      </div>
                    </div>
                    <div className="w-full md:w-64 space-y-4">
                      {study.results.map((result, i) => (
                        <div key={i} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
                          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                            {result.icon}
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-white">{result.value}</p>
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

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to be our next success story?</h2>
            <p className="text-slate-400 mb-8">
              Let's architect your managed operations infrastructure and start scaling.
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

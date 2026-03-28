import React from 'react';
import { ArrowLeft, MessageSquare, Zap, Shield, Headphones, Mail, Calendar } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

export default function SupportPage({ onBack }: SupportPageProps) {
  const supportFeatures = [
    {
      title: "Managed Task Requests",
      description: "Need a new funnel built or an automation adjusted? Submit a request, and our operations team handles the execution within 24-48 hours.",
      icon: <Zap className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Strategic Syncs",
      description: "Regular consultations with your dedicated Operations Success Manager to review performance and map out future infrastructure improvements.",
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Proactive Monitoring",
      description: "We don't wait for things to break. Our team monitors your systems 24/7, ensuring peak performance and deliverability across all channels.",
      icon: <Shield className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Concierge Onboarding",
      description: "White-glove implementation of your brand. We handle the data migration, system sunsetting, and team training so you don't have to.",
      icon: <Headphones className="w-6 h-6 text-red-400" />
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
            Your Technical Operations Team, On-Demand.
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Forget DIY tutorials and troubleshooting forums. With SynapseHub, you have a dedicated team of engineers and operations experts ready to handle any technical task your business requires.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {supportFeatures.map((feature, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-blue-900/20">
            <h2 className="text-3xl font-bold text-white mb-4">Need a task handled?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Our operations team is standing by. Reach out directly or schedule a strategic sync.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@synapsehub.net?subject=Task%20Request"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Request a Task
              </a>
              <a 
                href="mailto:support@synapsehub.net?subject=Strategic%20Sync%20Request"
                className="px-8 py-4 bg-blue-500/20 text-white border border-white/20 font-bold rounded-xl hover:bg-blue-500/30 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Strategic Sync
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

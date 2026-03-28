import React from 'react';
import { ArrowLeft, Lock, Shield, Server, Eye } from 'lucide-react';

interface SecurityPageProps {
  onBack: () => void;
}

export default function SecurityPage({ onBack }: SecurityPageProps) {
  const securityPillars = [
    {
      title: "Data Encryption",
      description: "All partner data is encrypted using AES-256 at rest and TLS 1.3 in transit. Your business intelligence is shielded by industry-leading cryptographic standards.",
      icon: <Lock className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Infrastructure Isolation",
      description: "We architect isolated environments for each partner to prevent cross-contamination of data. Your managed infrastructure is a private fortress.",
      icon: <Server className="w-6 h-6 text-purple-400" />
    },
    {
      title: "Continuous Monitoring",
      description: "Our operations team performs 24/7 proactive monitoring of all system endpoints to detect and neutralize threats before they impact your business.",
      icon: <Eye className="w-6 h-6 text-emerald-400" />
    },
    {
      title: "Compliance Management",
      description: "We handle the technical heavy lifting of maintaining compliance with A2P 10DLC, GDPR, and SOC2 standards across your entire stack.",
      icon: <Shield className="w-6 h-6 text-red-400" />
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
            Enterprise-Grade Security. Managed for You.
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Security isn't a feature; it's the foundation of our managed operations. We deploy and oversee advanced security protocols so you can scale with total confidence in your data integrity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityPillars.map((pillar, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Zero-Trust Architecture</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-0">
              Our engineering team follows a strict zero-trust philosophy. Every request within your managed infrastructure is verified, authorized, and encrypted. We don't just build systems; we build secure legacies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowLeft, Globe, CheckCircle, Shield } from 'lucide-react';

interface GdprPageProps {
  onBack: () => void;
}

export default function GdprPage({ onBack }: GdprPageProps) {
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
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">GDPR Compliance</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-slate-400 leading-relaxed">
            <p className="text-lg">
              As a global Managed Operations Service, SynapseHub is committed to the highest standards of data protection and privacy, including full compliance with the General Data Protection Regulation (GDPR).
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Our Role as Data Processor</h2>
              <p>
                In our partnership, you (the Partner) act as the Data Controller, and SynapseHub acts as the Data Processor. We process personal data strictly according to your instructions and the operational requirements of your managed infrastructure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Managed Compliance Protocols</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Right to Erasure</strong>
                    Our team manages "Right to be Forgotten" requests on your behalf, ensuring data is purged across all integrated systems in your managed stack.
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Data Portability</strong>
                    We facilitate secure data exports for your clients, maintaining the integrity and privacy of the information throughout the process.
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Privacy by Design</strong>
                    Our engineering team architects every automation and data flow with privacy as a core requirement, not an afterthought.
                  </div>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Data Processing Agreements (DPA)</h2>
              <p>
                All SynapseHub partnerships include a comprehensive Data Processing Agreement that outlines our commitment to GDPR standards and the technical measures we take to protect your data.
              </p>
            </section>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex items-center gap-6">
              <Shield className="w-12 h-12 text-blue-400 shrink-0" />
              <p className="text-sm m-0">
                For specific GDPR-related inquiries or to request a copy of our DPA, please contact your dedicated Operations Success Manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

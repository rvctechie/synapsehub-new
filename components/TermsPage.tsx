import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
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
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Terms of Service</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-slate-400 leading-relaxed">
            <p className="text-lg">
              Welcome to SynapseHub. By engaging our services, you are entering into a Managed Operations Partnership. These terms define the parameters of our professional relationship and the management of your business infrastructure.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">1. Managed Operations Partnership</h2>
              <p>
                SynapseHub is a Managed Operations Service (MOS), not a software-as-a-service (SaaS) provider. We provide professional technical labor, strategic architecture, and ongoing management of your business systems. You are partnering with an engineering team that executes on your behalf.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">2. Implementation & Onboarding Fees</h2>
              <p>
                All partnership tiers require a one-time Implementation Fee. This fee covers the intensive technical labor required to architect your custom infrastructure, perform data migrations, ensure federal regulatory compliance (A2P 10DLC), and sunset legacy systems. These fees are non-refundable as they represent the immediate deployment of engineering resources.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">3. Service Delivery & Tasks</h2>
              <p>
                As part of your managed service, you may request technical tasks through your Concierge Support channel. Our team handles the execution of these tasks (e.g., building new funnels, adjusting automations, fine-tuning AI agents) within the scope of your selected partnership tier.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">4. Infrastructure Ownership</h2>
              <p>
                While SynapseHub manages the infrastructure, you retain full ownership of your business data, client lists, and brand assets. We act as the technical architects and operators of your growth engine.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">5. No DIY / No Self-Service Support</h2>
              <p>
                SynapseHub is a "Done-For-You" service. We do not provide DIY tools or self-service troubleshooting. All technical modifications and system optimizations are handled exclusively by the SynapseHub operations team to ensure architectural integrity and performance.
              </p>
            </section>

            <div className="pt-8 border-t border-slate-800 text-sm italic">
              Last Updated: February 24, 2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function PrivacyPage({ onBack }: PrivacyPageProps) {
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
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-slate-400 leading-relaxed">
            <p className="text-lg">
              At SynapseHub, we take your privacy and the security of your data with the utmost seriousness. As a Managed Operations Service, we act as a custodian of your business infrastructure and the data that flows through it.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">A2P 10DLC Compliance & Mobile Messaging</h2>
              <div className="bg-slate-900 border-l-4 border-blue-500 p-6 rounded-r-xl text-slate-200 font-medium">
                "No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties."
              </div>
              <p>
                We manage all A2P 10DLC federal regulatory registrations for our partners to ensure full compliance with mobile carrier standards. Your messaging data is used strictly for the operational purposes defined in your partnership.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Data Management & Security</h2>
              <p>
                As your Managed Operations partner, we implement enterprise-grade security protocols to protect your business data. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for all data at rest and in transit.</li>
                <li>Strict access controls restricted to authorized SynapseHub engineering staff.</li>
                <li>Regular security audits of our managed infrastructure.</li>
                <li>Secure data migration and sunsetting protocols for legacy systems.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Information Collection</h2>
              <p>
                We only collect information necessary to architect and manage your business operations. This includes contact information, operational goals, and technical stack details required for implementation.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Third-Party Integrations</h2>
              <p>
                While we integrate with third-party systems like Stripe, Twilio, and Meta, we do not sell or lease your data to these or any other entities. Data sharing is limited strictly to the technical requirements of your managed infrastructure.
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

import React from 'react';
import { ArrowLeft, MessageSquare, CreditCard, BarChart3, ShieldCheck, Server, Globe } from 'lucide-react';

interface IntegrationsPageProps {
  onBack: () => void;
}

export default function IntegrationsPage({ onBack }: IntegrationsPageProps) {
  const layers = [
    {
      title: "Communication Layer",
      description: "Enterprise-grade messaging infrastructure managed by our engineers.",
      items: [
        {
          name: "Official WhatsApp Business API",
          detail: "Full technical management of verification, template approval, and API-level messaging logic.",
          icon: <MessageSquare className="w-6 h-6 text-emerald-400" />
        },
        {
          name: "Managed Twilio & Mailgun Infrastructure",
          detail: "Enterprise-grade deliverability optimized for the Asian and US markets. We handle IP warming and sender reputation.",
          icon: <Server className="w-6 h-6 text-blue-400" />
        }
      ]
    },
    {
      title: "Regional Financial Layer",
      description: "Seamless multi-currency revenue collection and accounting.",
      items: [
        {
          name: "HitPay & Stripe Singapore Integration",
          detail: "Seamless setup of PayNow, GrabPay, and multi-currency revenue collection logic.",
          icon: <CreditCard className="w-6 h-6 text-purple-400" />
        },
        {
          name: "QuickBooks & Xero Sync",
          detail: "Automated reconciliation of invoices and payments directly into your accounting software.",
          icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
        }
      ]
    },
    {
      title: "Growth & Intelligence Layer",
      description: "Precision tracking and attribution for every dollar spent.",
      items: [
        {
          name: "Meta & Google API Management",
          detail: "Technical management of tracking pixels and server-side conversions (CAPI) for 100% data accuracy.",
          icon: <BarChart3 className="w-6 h-6 text-rose-400" />
        },
        {
          name: "Global CDN & Hosting",
          detail: "We deploy your assets on edge networks ensuring <100ms load times globally.",
          icon: <Globe className="w-6 h-6 text-indigo-400" />
        }
      ]
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
              The Unified Infrastructure Ecosystem.
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
              We architect and manage the technical bridges between the world’s most powerful tools and your business. No plugins, no duct tape—just pure, engineered connectivity.
            </p>
          </div>

          <div className="space-y-12 mb-20">
            {layers.map((layer, index) => (
              <div key={index}>
                <div className="mb-6 border-l-4 border-blue-500 pl-4">
                  <h2 className="text-2xl font-bold text-white">{layer.title}</h2>
                  <p className="text-slate-400">{layer.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {layer.items.map((item, i) => (
                    <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-slate-600 transition-colors flex gap-4">
                      <div className="w-12 h-12 bg-slate-950 rounded-lg flex items-center justify-center border border-slate-800 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* MOS Promise Section */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Zero Technical Overhead.</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Our engineers handle all API documentation, technical vetting, and deployment for every integration. You simply request the capability, and we architect the connection.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 text-sm font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Managed Deployment Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

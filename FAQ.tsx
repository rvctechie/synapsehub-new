import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is SynapseHub?",
    answer: "SynapseHub is a Managed Operations Service (MOS) that handles the technical heavy lifting of your marketing and sales infrastructure. We don't just give you technical systems; our team builds, manages, and optimizes your entire growth engine for you."
  },
  {
    question: "How is this different from a standard CRM like GoHighLevel?",
    answer: "Standard CRMs are 'Do-It-Yourself' systems — you get the tools but have to figure out the strategy, setup, and maintenance yourself. SynapseHub is 'Done-For-You.' We architect your pipelines, build your funnels, train your AI agents, and manage your automations. You focus on closing deals while we handle the operational complexity."
  },
  {
    question: "Is there a setup fee?",
    answer: "Yes. Each tier includes a one-time Implementation & Onboarding Fee. This covers the custom architecture of your systems, data migration, and the strategic setup of your managed workflows to ensure immediate ROI."
  },
  {
    question: "Who manages the AI and automations?",
    answer: "Our in-house technical team handles everything. We train your AI support agents, monitor your automation performance, and make strategic adjustments to your workflows as your business scales."
  },
  {
    question: "Can I still access the infrastructure myself?",
    answer: "Absolutely. You have full access to your Real-Time Operations Portal to monitor leads, view analytics, and communicate with clients. We manage the 'back-end' so your 'front-end' experience is seamless."
  },
  {
    question: "What kind of support is included?",
    answer: "We provide proactive management rather than just reactive support. Depending on your tier, you'll have access to our strategic oversight team, priority technical assistance, and regular performance optimization calls."
  },
  {
    question: "How long does onboarding take?",
    answer: "Most clients are fully operational within 7-14 days. Our concierge onboarding process includes system setup, data migration, AI agent training, and team walkthrough. Enterprise partnerships may take 2-4 weeks for full deployment."
  },
  {
    question: "Is my data secure and PDPA compliant?",
    answer: "Yes. We maintain US-grade security standards (Wyoming LLC) combined with full PDPA compliance for the Asian market. All data is encrypted at rest and in transit, with regular security audits and compliance reviews."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. Our managed partnerships are month-to-month after the initial setup period. We believe in earning your business every month through results, not contracts. Annual plans receive a 20% discount."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about SynapseHub.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-800 rounded-lg bg-slate-900 overflow-hidden hover:border-slate-700 transition-colors">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-slate-200">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-500 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 ml-4" />
                )}
              </button>

              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-slate-400 text-sm leading-relaxed pb-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

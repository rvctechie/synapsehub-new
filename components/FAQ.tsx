import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What does SynapseHub actually do?',
    answer: 'SynapseHub helps service businesses respond to leads faster, recover missed opportunities, automate booking flow, and reduce manual admin. We handle the setup and operational work instead of leaving you to patch it together yourself.'
  },
  {
    question: 'Who is this best for?',
    answer: 'It is best for service businesses that already have leads coming in but are losing revenue through missed calls, slow reply times, inconsistent follow-up, or messy internal workflow.'
  },
  {
    question: 'Why is there a setup fee?',
    answer: 'The setup fee covers implementation work: system setup, workflow design, integrations, configuration, and rollout. The more complex your business is, the more setup work is required up front.'
  },
  {
    question: 'Do you manage the AI and automation for us?',
    answer: 'Yes. SynapseHub is a managed service. We set up and maintain the lead response, appointment, follow-up, and automation layer so you are not left handling every moving part yourself.'
  },
  {
    question: 'Can we still see what is happening?',
    answer: 'Yes. You should still have visibility into leads, appointments, and reporting. The difference is that SynapseHub handles the operational setup and maintenance behind the scenes.'
  },
  {
    question: 'What happens after I qualify on the site?',
    answer: 'If the business looks like a fit, the next step is a strategy call or technical review. That is where SynapseHub confirms the leak, recommends the right starting tier, and outlines implementation.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">The basics, in plain English.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-slate-200">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
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

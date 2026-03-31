import React from 'react';
import { Radio, Workflow, ShieldCheck, Clock, Layers, TabletSmartphone, LineChart, Bot } from 'lucide-react';

const features = [
  {
    icon: <Radio className="w-6 h-6 text-white" />,
    title: 'Unified Lead Inbox',
    description: 'Bring inbound messages, calls, and follow-up into one managed workflow so leads stop slipping through disconnected channels.',
    color: 'bg-blue-600'
  },
  {
    icon: <Workflow className="w-6 h-6 text-white" />,
    title: 'Missed Lead Recovery',
    description: 'Instant follow-up sequences respond when your team misses a call or delays a reply, helping you recover revenue before it goes cold.',
    color: 'bg-rose-600'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: 'Review & Trust Systems',
    description: 'Automate review requests and reputation follow-up so your brand looks stronger where buyers are already checking.',
    color: 'bg-yellow-600'
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: 'Appointment Flow Automation',
    description: 'Build booking, reminders, and no-show reduction into a cleaner managed flow that helps your calendar fill more consistently.',
    color: 'bg-emerald-600'
  },
  {
    icon: <Layers className="w-6 h-6 text-white" />,
    title: 'Landing Pages & Funnels',
    description: 'Deploy lead capture pages and follow-up sequences that match the way your business actually sells, not generic templates.',
    color: 'bg-purple-600'
  },
  {
    icon: <TabletSmartphone className="w-6 h-6 text-white" />,
    title: 'Client Visibility',
    description: 'See leads, appointments, and pipeline activity in one place while SynapseHub handles the setup and operational maintenance.',
    color: 'bg-indigo-600'
  },
  {
    icon: <LineChart className="w-6 h-6 text-white" />,
    title: 'Pipeline Reporting',
    description: 'Track where leads are coming from, where they stall, and what should be fixed first so growth decisions get clearer.',
    color: 'bg-cyan-600'
  },
  {
    icon: <Bot className="w-6 h-6 text-white" />,
    title: 'Guided Qualification & Booking',
    description: 'Handle common questions, qualify serious buyers, and move them toward the next step without making the experience feel mechanical.',
    color: 'bg-pink-600'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-bold tracking-wide uppercase text-sm mb-2">What we actually improve</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Built to fix lead loss, follow-up delay, and admin drag</h3>
          <p className="text-lg text-slate-400">
            SynapseHub is for businesses that want more booked appointments and cleaner operations without stitching everything together themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-slate-800/50 mt-auto">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Managed delivery included
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

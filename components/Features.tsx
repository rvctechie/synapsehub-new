import React from 'react';
import { Radio, Workflow, ShieldCheck, Clock, Layers, TabletSmartphone, LineChart, Bot } from 'lucide-react';

const features = [
  {
    icon: <Radio className="w-6 h-6 text-white" />,
    title: "Managed Communication Hub",
    description: "We consolidate and manage your Facebook, Instagram, Google Chat, SMS, and Emails into one single, high-efficiency conversation stream.",
    color: "bg-blue-600"
  },
  {
    icon: <Workflow className="w-6 h-6 text-white" />,
    title: "Automated Lead Recovery",
    description: "Our managed systems automatically engage leads who call when you're busy, ensuring no opportunity is lost to a competitor.",
    color: "bg-rose-600"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Managed Brand Reputation",
    description: "We oversee your Google Review strategy, automating requests and managing responses to boost your local ranking and trust.",
    color: "bg-yellow-600"
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "Managed Appointment Systems",
    description: "We build and maintain custom booking systems with managed reminder sequences that reduce no-shows by up to 80%.",
    color: "bg-emerald-600"
  },
  {
    icon: <Layers className="w-6 h-6 text-white" />,
    title: "Strategic Funnel Management",
    description: "Professional design and technical management of high-converting landing pages, course portals, and client areas.",
    color: "bg-purple-600"
  },
  {
    icon: <TabletSmartphone className="w-6 h-6 text-white" />,
    title: "Real-Time Operations Portal",
    description: "Access your managed business infrastructure from anywhere. Monitor leads, appointments, and invoices on the go.",
    color: "bg-indigo-600"
  },
  {
    icon: <LineChart className="w-6 h-6 text-white" />,
    title: "Managed Sales Intelligence",
    description: "We architect visual sales pipelines and provide deep-dive analytics so you know exactly where your growth is coming from.",
    color: "bg-cyan-600"
  },
  {
    icon: <Bot className="w-6 h-6 text-white" />,
    title: "Managed AI Support Agents",
    description: "We train and oversee custom AI agents that handle FAQs and book appointments for you 24/7 with human-like precision.",
    color: "bg-pink-600"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-500 font-bold tracking-wide uppercase text-sm mb-2">The Managed Advantage</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Operational Excellence, Delivered</h3>
          <p className="text-lg text-slate-400">
             We don't just provide technical systems. We provide the managed infrastructure and technical expertise to scale your business.
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
                  Full Technical Management Included
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import React from 'react';
import { Radio, Workflow, ShieldCheck, Clock, Layers, TabletSmartphone, LineChart, Bot } from 'lucide-react';

const features = [
  {
    icon: <Radio className="w-6 h-6 text-white" />,
    title: "Unified Communication Hub",
    description: "Facebook, Instagram, Google Chat, SMS, and Email — all consolidated into one high-efficiency conversation stream.",
    color: "bg-blue-600",
    tag: "Multi-Channel"
  },
  {
    icon: <Workflow className="w-6 h-6 text-white" />,
    title: "Automated Lead Recovery",
    description: "Instantly engage leads who call when you're busy. No opportunity lost to a competitor, ever.",
    color: "bg-rose-600",
    tag: "AI-Powered"
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Reputation Management",
    description: "Automated Google Review requests and managed responses to boost your local ranking and trust score.",
    color: "bg-yellow-600",
    tag: "Automated"
  },
  {
    icon: <Clock className="w-6 h-6 text-white" />,
    title: "Smart Appointment Systems",
    description: "Custom booking systems with managed reminder sequences that reduce no-shows by up to 80%.",
    color: "bg-emerald-600",
    tag: "Zero No-Shows"
  },
  {
    icon: <Layers className="w-6 h-6 text-white" />,
    title: "Funnel & Landing Pages",
    description: "High-converting landing pages, course portals, and client areas — designed and maintained for you.",
    color: "bg-purple-600",
    tag: "Done-For-You"
  },
  {
    icon: <TabletSmartphone className="w-6 h-6 text-white" />,
    title: "Real-Time Operations Portal",
    description: "Monitor leads, appointments, invoices, and team performance from anywhere, on any device.",
    color: "bg-indigo-600",
    tag: "Live Dashboard"
  },
  {
    icon: <LineChart className="w-6 h-6 text-white" />,
    title: "Sales Intelligence",
    description: "Visual sales pipelines and deep-dive analytics so you know exactly where your growth is coming from.",
    color: "bg-cyan-600",
    tag: "Data-Driven"
  },
  {
    icon: <Bot className="w-6 h-6 text-white" />,
    title: "AI Support Agents",
    description: "Custom-trained AI agents that handle FAQs and book appointments 24/7 with human-like precision.",
    color: "bg-pink-600",
    tag: "24/7 Active"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-blue-500 font-bold tracking-wide uppercase text-sm mb-2">Platform Capabilities</p>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Scale</h3>
          <p className="text-lg text-slate-400">
             One platform. Every tool your business needs. Fully managed by our operations team.
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
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider px-2 py-1 bg-blue-400/10 rounded-full border border-blue-400/20">
                  {feature.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

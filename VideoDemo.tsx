import React from 'react';
import { Play, ArrowRight, Clock, Zap, Shield } from 'lucide-react';

interface VideoDemoProps {
  onOpenChat?: () => void;
}

export default function VideoDemo({ onOpenChat }: VideoDemoProps) {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">From Chaos to Clarity in 3 Steps</h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              We don't hand you another tool to figure out. Our team builds, deploys, and manages your entire operations infrastructure.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  icon: <Clock className="w-5 h-5 text-blue-400" />,
                  title: "Strategic Audit",
                  desc: "We map your current systems, identify bottlenecks, and design your custom infrastructure blueprint."
                },
                {
                  step: "02",
                  icon: <Zap className="w-5 h-5 text-purple-400" />,
                  title: "Managed Deployment",
                  desc: "Our engineering team builds and deploys your AI agents, automations, and communication systems."
                },
                {
                  step: "03",
                  icon: <Shield className="w-5 h-5 text-emerald-400" />,
                  title: "Ongoing Optimization",
                  desc: "We monitor, optimize, and scale your infrastructure as your business grows. You focus on revenue."
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shrink-0 group-hover:border-blue-500/50 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onOpenChat}
              className="mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25 flex items-center gap-2 group"
            >
              Start Your Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-2xl">
              <div className="space-y-4">
                {[
                  { label: "Lead Response Time", before: "4+ hours", after: "< 2 min", improvement: "99%" },
                  { label: "Missed Call Recovery", before: "0%", after: "94%", improvement: "94%" },
                  { label: "Admin Hours / Week", before: "25+ hrs", after: "3 hrs", improvement: "88%" },
                  { label: "Booking Conversion", before: "12%", after: "34%", improvement: "183%" },
                ].map((metric, i) => (
                  <div key={i} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-slate-300">{metric.label}</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">+{metric.improvement}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-red-400/70 line-through">{metric.before}</span>
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                      <span className="text-sm font-bold text-white">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">Average results across managed clients after 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    initials: "MC",
    name: "Michael C.",
    role: "Managing Director, Digital Agency",
    content: "We consolidated 5 fragmented tools into one managed infrastructure. The operational overhead dropped immediately — we're saving over 20 hours a week on admin alone.",
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    initials: "SJ",
    name: "Sarah J.",
    role: "CEO, Growth Consultancy",
    content: "The managed operations model is what sold us. We don't touch the backend — SynapseHub's team handles the technical execution while we focus on closing deals.",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    initials: "DM",
    name: "David M.",
    role: "Founder, B2B Services",
    content: "Results were immediate. The AI agents started booking qualified appointments within the first week. We saw a 30% increase in booked calls within 30 days.",
    gradient: "from-emerald-600 to-teal-600"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Client Results</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Growth-Focused Companies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Real feedback from businesses using our managed operations infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-slate-700 transition-all relative group">
              <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-800 fill-current" />
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed text-lg">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-slate-600 italic">Results may vary. Testimonials reflect individual client experiences.</p>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Founder, Zenith Media',
    content: 'We were leaking inbound demand because follow-up was inconsistent. SynapseHub helped us centralize lead response and cut the delay between inquiry and first contact.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Sarah Johnson',
    role: 'CEO, Growth Partners',
    content: 'The value was not just automation. It was getting manual admin and booking friction off our team so they could focus on revenue-generating work again.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'David Miller',
    role: 'Director, ScaleUp Digital',
    content: 'Instead of adding another disconnected platform, we got a managed rollout focused on response time, cleaner pipeline flow, and fewer missed opportunities.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What buyers need to believe</h2>
          <p className="text-slate-400">
            The offer gets stronger when visitors can picture the operational win, not just the technology behind it.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-slate-700 transition-all relative">
              <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-800 fill-current" />
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed text-lg">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-800" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

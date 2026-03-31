import React from 'react';
import { Magnet, MessageCircle, CreditCard, Zap, Repeat } from 'lucide-react';

export default function AiEmployees() {
  return (
    <section className="py-32 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
            Replace fragmented follow-up with one managed client journey.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
                { 
                    icon: <Zap className="w-6 h-6 text-yellow-400" />,
                    title: 'Faster first response', 
                    text: 'Respond quickly when a lead comes in so fewer opportunities go cold while your team is busy.' 
                },
                { 
                    icon: <Repeat className="w-6 h-6 text-blue-400" />,
                    title: 'Cleaner conversation flow', 
                    text: 'Keep inbound messages and follow-up organized so prospects do not get lost between channels.' 
                },
                { 
                    icon: <CreditCard className="w-6 h-6 text-emerald-400" />,
                    title: 'Smoother path to payment', 
                    text: 'Guide qualified buyers from inquiry to booking, payment, and onboarding with less friction.' 
                }
            ].map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-8 rounded-xl border border-slate-800 hover:border-slate-600 transition-all flex flex-col group">
                    <div className="mb-4 bg-slate-900 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-800 group-hover:scale-110 transition-transform">
                        {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                        {item.text}
                    </p>
                </div>
            ))}
          </div>
        </div>

        <div className="mt-32 pt-20 border-t border-slate-800/50">
           <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                The client journey, managed end to end
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                From first inquiry to payment and follow-up, SynapseHub is designed to make the buying journey feel faster, clearer, and more consistent.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-16 left-[30%] right-[30%] h-0.5 border-t-2 border-dashed border-slate-700 z-0"></div>
              <div className="hidden md:block absolute top-[60px] left-[32%] w-3 h-3 border-t-2 border-r-2 border-slate-700 rotate-45 bg-slate-900 z-10"></div>
              <div className="hidden md:block absolute top-[60px] right-[32%] w-3 h-3 border-t-2 border-r-2 border-slate-700 rotate-45 bg-slate-900 z-10"></div>

              <div className="relative z-10 bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-20 h-20 mx-auto rounded-full bg-blue-900/20 border border-blue-500/30 flex items-center justify-center mb-6 text-blue-400">
                    <Magnet className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">1. Capture attention</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-4">
                   Bring in leads through landing pages, inbound routing, and clear conversion paths that make it easy to take the next step.
                 </p>
                 <ul className="text-xs text-slate-500 space-y-2 text-left bg-slate-900/50 p-4 rounded-lg">
                    <li>• Landing pages and intake flows</li>
                    <li>• Lead capture and routing setup</li>
                    <li>• Hosting and implementation support</li>
                 </ul>
              </div>

              <div className="relative z-10 bg-slate-950 p-8 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-900/10 text-center hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-20 h-20 mx-auto rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400">
                    <MessageCircle className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">2. Qualify and guide</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-4">
                   Keep response time fast and the conversation natural so serious buyers are guided toward booking instead of left waiting.
                 </p>
                 <ul className="text-xs text-slate-500 space-y-2 text-left bg-slate-900/50 p-4 rounded-lg">
                    <li>• Qualification and follow-up flow</li>
                    <li>• Multi-channel conversation handling</li>
                    <li>• Consistent buyer journey management</li>
                 </ul>
              </div>

              <div className="relative z-10 bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-20 h-20 mx-auto rounded-full bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center mb-6 text-emerald-400">
                    <CreditCard className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">3. Convert and onboard</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-4">
                   Move qualified buyers toward booking, payment, and onboarding with fewer manual gaps and less operational drag.
                 </p>
                 <ul className="text-xs text-slate-500 space-y-2 text-left bg-slate-900/50 p-4 rounded-lg">
                    <li>• Booking and payment flow</li>
                    <li>• Follow-up and onboarding handoff</li>
                    <li>• Reporting and operational visibility</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

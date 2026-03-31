import React, { useState } from 'react';
import { Check, Zap } from 'lucide-react';

interface PricingProps {
  onOpenChat?: () => void;
}

export default function Pricing({ onOpenChat }: PricingProps) {
  const [annual, setAnnual] = useState(false);

  const tiers = [
    {
      name: 'Lead Recovery',
      price: annual ? 230 : 297,
      setupFee: 997,
      pitch: 'Best when your biggest problem is missed calls, delayed reply times, and leads going cold.',
      deliverables: [
        'Missed-call text-back flow',
        'Lead capture page setup',
        'Basic follow-up automation'
      ],
      roi: 'Ideal for smaller service businesses that need to stop losing easy revenue first.',
      highlight: false,
      iconColor: 'text-slate-600 group-hover:text-yellow-400'
    },
    {
      name: 'Booking & Follow-Up',
      price: annual ? 390 : 497,
      setupFee: 1997,
      pitch: 'Best when you need leads qualified faster, appointments booked more consistently, and admin work reduced.',
      deliverables: [
        'AI appointment qualification',
        'Booking and reminder flows',
        'Referral and internal process support'
      ],
      roi: 'Best fit for businesses where manual follow-up is slowing growth and wasting staff time.',
      highlight: true,
      iconColor: 'text-blue-400'
    },
    {
      name: 'Managed Rollout',
      price: annual ? 690 : 897,
      setupFee: 4997,
      pitch: 'Best when your business has legacy systems, migration work, compliance needs, or higher operational complexity.',
      deliverables: [
        'Migration and implementation planning',
        'Advanced workflow and compliance setup',
        'Deeper reporting and managed rollout'
      ],
      roi: 'Designed for operators who need a more complete managed buildout instead of isolated fixes.',
      highlight: false,
      iconColor: 'text-slate-600 group-hover:text-purple-400'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 relative">
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Simple pricing for managed execution</h2>
          <p className="text-slate-400 mb-6">
            Choose based on the size of the leak you need fixed first. Most businesses should start with the smallest tier that solves the current problem.
          </p>
          
          <div className="flex items-center justify-center gap-4 bg-slate-900/50 backdrop-blur w-fit mx-auto p-1.5 rounded-full border border-slate-800">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!annual ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${annual ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Yearly <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">SAVE 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative group border rounded-2xl p-8 transition-all duration-300 flex flex-col ${
                tier.highlight 
                ? 'border-blue-500/50 bg-slate-900 shadow-2xl shadow-blue-900/10 scale-105 z-10 ring-1 ring-blue-500/20' 
                : 'border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:shadow-xl'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg uppercase">
                  Most practical starting point
                </div>
              )}
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <Zap className={`w-5 h-5 transition-colors ${tier.iconColor} ${tier.highlight ? 'fill-blue-400' : ''}`} />
              </div>
              
              <p className="text-slate-400 text-xs mb-6 leading-relaxed italic">
                {tier.pitch}
              </p>

              <div className="mb-2 flex items-baseline gap-1">
                <span className={`${tier.highlight ? 'text-5xl' : 'text-4xl'} font-bold text-white tracking-tight`}>${tier.price}</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              
              <div className="mb-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  + ${tier.setupFee} one-time implementation
                </span>
              </div>

              <button 
                onClick={onOpenChat}
                className={`w-full py-3 font-bold rounded-lg transition-all mb-8 shadow-lg ${
                tier.highlight 
                ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/25' 
                : 'border border-slate-700 text-white hover:bg-slate-800'
              }`}>
                Get Qualified
              </button>

              <div className="space-y-4 flex-1">
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${tier.highlight ? 'text-blue-400' : 'text-slate-500'}`}>
                  Included:
                </p>
                <ul className="space-y-3">
                  {tier.deliverables.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm list-none">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-blue-400' : 'text-slate-500'}`} /> 
                      <span className={tier.highlight ? 'text-slate-200 font-medium' : 'text-slate-300'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/50">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-bold text-white block mb-1 uppercase tracking-tighter">Who this is for:</span>
                  {tier.roi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

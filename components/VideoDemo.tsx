import React from 'react';
import { Play } from 'lucide-react';

export default function VideoDemo() {
  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See CompanyFlow in Action</h2>
          <p className="text-xl text-slate-400">See how automation saves 10+ hours a week.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black border border-slate-700 bg-slate-800 aspect-video group cursor-pointer">
           {/* Placeholder for video embed */}
           <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/20">
                 <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-blue-600 ml-1 fill-blue-600" />
                 </div>
              </div>
           </div>
           <img 
             src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80" 
             alt="Dashboard Preview" 
             className="w-full h-full object-cover opacity-60"
           />
           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
              <div className="bg-black/80 backdrop-blur px-3 py-1 rounded text-xs font-medium text-white border border-white/10">02:14</div>
           </div>
        </div>
      </div>
    </section>
  );
}
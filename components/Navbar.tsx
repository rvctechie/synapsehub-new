import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            {/* SynapseHub Logo */}
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-3d-spin">
               <defs>
                 <linearGradient id="logoGradientNav" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#3b82f6" />
                   <stop offset="100%" stopColor="#8b5cf6" />
                 </linearGradient>
               </defs>
               <path d="M50 50 L50 15" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 50 L80.3 32.5" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 50 L80.3 67.5" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 50 L50 85" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 50 L19.7 67.5" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 50 L19.7 32.5" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round"/>

               <path d="M50 15 L80.3 32.5 L80.3 67.5 L50 85 L19.7 67.5 L19.7 32.5 Z" stroke="url(#logoGradientNav)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>

               <circle cx="50" cy="50" r="8" fill="url(#logoGradientNav)" stroke="none" />
               <circle cx="50" cy="15" r="5" fill="#020617" stroke="url(#logoGradientNav)" strokeWidth="4" />
               <circle cx="80.3" cy="32.5" r="5" fill="#020617" stroke="url(#logoGradientNav)" strokeWidth="4" />
               <circle cx="80.3" cy="67.5" r="5" fill="#020617" stroke="url(#logoGradientNav)" strokeWidth="4" />
               <circle cx="50" cy="85" r="5" fill="#020617" stroke="url(#logoGradientNav)" strokeWidth="4" />
               <circle cx="19.7" cy="67.5" r="5" fill="#020617" stroke="url(#logoGradientNav)" strokeWidth="4" />
               <circle cx="19.7" cy="32.5" r="5" fill="#020617" stroke="url(#logoGradientNav)" strokeWidth="4" />
            </svg>
            <span className="text-2xl font-bold text-white tracking-tight">Synapse<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Hub</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('automate')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Managed Solutions</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Partnerships</button>
            <button onClick={() => onNavigate('home')} className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Infrastructure Preview</button>
            <button className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Partner Portal</button>
          </div>

          <button className="md:hidden text-slate-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-slate-800 shadow-xl p-4 flex flex-col gap-4">
          <button onClick={() => { onNavigate('automate'); setIsMobileMenuOpen(false); }} className="text-base font-bold text-slate-300 py-2 text-left">Managed Solutions</button>
          <button onClick={() => { onNavigate('pricing'); setIsMobileMenuOpen(false); }} className="text-base font-bold text-slate-300 py-2 text-left">Partnerships</button>
          <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-base font-bold text-slate-300 py-2 text-left">Infrastructure Preview</button>
          <hr className="border-slate-800" />
          <button className="text-base font-bold text-slate-300 py-2 text-left">Partner Portal</button>
        </div>
      )}
    </nav>
  );
}
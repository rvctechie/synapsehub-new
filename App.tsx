import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AiFeatureDemo from './components/AiFeatureDemo';
import AiEmployees from './components/AiEmployees';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import VoiceWidget from './components/VoiceWidget';
import DashboardPreview from './components/DashboardPreview';
import AutomateBusinessPage from './components/AutomateBusinessPage';
import RoadmapPage from './components/RoadmapPage';
import IntegrationsPage from './components/IntegrationsPage';
import SupportPage from './components/SupportPage';
import SuccessHubPage from './components/SuccessHubPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import SecurityPage from './components/SecurityPage';
import GdprPage from './components/GdprPage';
import StatusPage from './components/StatusPage';
import GenericPage from './components/GenericPage';
import DemoPage from './components/DemoPage';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDemo, setSelectedDemo] = useState<string | undefined>(undefined);
  const [userStatus, setUserStatus] = useState<'Prospect' | 'ActivePartner'>(() => {
    try {
      return (localStorage.getItem('userStatus') as 'ActivePartner') || 'Prospect';
    } catch (e) {
      console.warn("localStorage not available", e);
      return 'Prospect';
    }
  });
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    // Check URL params for payment success
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('status') === 'paid') {
        setUserStatus('ActivePartner');
        try {
          localStorage.setItem('userStatus', 'ActivePartner');
        } catch (e) {
          console.warn("localStorage setItem failed", e);
        }
        setShowSuccessOverlay(true);
        
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname);

        // Hide overlay after 5 seconds and open chat
        setTimeout(() => {
          setShowSuccessOverlay(false);
          setIsChatOpen(true);
        }, 5000);
      }
    } catch (e) {
      console.error("Error processing URL params", e);
    }
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    if (page !== 'demo') {
      setSelectedDemo(undefined);
    }
  };

  const handleAuthorize = () => {
    // Simulate payment flow for demo purposes
    // In production, this would redirect to Stripe/GHL
    setUserStatus('ActivePartner');
    try {
      localStorage.setItem('userStatus', 'ActivePartner');
    } catch (e) {
      console.warn("localStorage setItem failed", e);
    }
    setShowSuccessOverlay(true);
    setTimeout(() => {
      setShowSuccessOverlay(false);
      setIsChatOpen(true);
      navigateTo('success');
    }, 5000);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero 
              onOpenChat={() => setIsChatOpen(true)} 
              onOpenVoice={() => setIsVoiceOpen(true)}
              onOpenRoadmap={() => navigateTo('roadmap')}
            />
            
            <DashboardPreview />
            
            {/* Social Proof Strip - Professional SVG Logos */}
            <div className="bg-slate-950 border-b border-slate-900 pb-16 pt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs font-bold text-slate-500 mb-12 uppercase tracking-[0.2em]">Strategic Infrastructure Partners & Trusted Entities</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 hover:opacity-100 transition-all duration-700">
                   {/* VERTEX - Modern Bold Sans */}
                   <div className="text-white font-sans font-black text-2xl tracking-tighter hover:scale-105 transition-transform duration-300 cursor-default">VERTEX</div>
                   
                   {/* SOLARA - Elegant Thin Sans */}
                   <div className="text-white font-sans font-thin text-3xl tracking-[0.2em] hover:scale-105 transition-transform duration-300 cursor-default">SOLARA</div>
                   
                   {/* NEXUS OPS - Technical Monospace */}
                   <div className="text-white font-mono font-bold text-xl tracking-tight hover:scale-105 transition-transform duration-300 cursor-default">NEXUS_OPS</div>
                   
                   {/* QUANTUM - Sleek Geometric */}
                   <div className="text-white font-sans font-bold text-2xl tracking-[0.15em] hover:scale-105 transition-transform duration-300 cursor-default">QUANTUM</div>
                   
                   {/* EQUITY GROUP - Authoritative Serif */}
                   <div className="text-white font-serif font-bold text-xl tracking-wide hover:scale-105 transition-transform duration-300 cursor-default">EQUITY GROUP</div>
                </div>
              </div>
            </div>

            <Features />

            <AiFeatureDemo />

            <AiEmployees />
            
            <Testimonials />
            
            <Pricing onOpenChat={() => setIsChatOpen(true)} />

            <FAQ />
            
            {/* Call to Action - Professional Gradient */}
            <section className="py-32 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full z-0"></div>

              <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
                 <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white tracking-tight">Ready to scale your operations?</h2>
                 <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                   Join the fastest growing companies consolidating their infrastructure with our managed operations partnership.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => setIsVoiceOpen(true)}
                      className="relative pl-3 pr-10 py-3 bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 hover:border-blue-500/50 rounded-2xl font-medium transition-all duration-300 flex items-center gap-5 group hover:bg-slate-800 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-1"
                    >
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                                alt="Ops Lead"
                                className="w-20 h-20 rounded-xl border-2 border-slate-600 group-hover:border-blue-400 transition-colors object-cover shadow-2xl" 
                            />
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 border-4 border-slate-900 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.6)]"></span>
                        </div>
                        <div className="text-left flex flex-col justify-center">
                            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest leading-none mb-2">Managed Operations</span>
                            <span className="leading-none text-2xl group-hover:text-blue-200 transition-colors font-bold tracking-tight">AI Voice Support</span>
                            <span className="text-slate-400 text-sm mt-1 group-hover:text-slate-300">Direct Access</span>
                        </div>
                    </button>
                 </div>
              </div>
            </section>
          </main>
        );
      case 'automate':
        return <AutomateBusinessPage onBack={() => navigateTo('home')} onOpenChat={() => setIsChatOpen(true)} />;
      case 'features':
        return (
          <div className="pt-20">
             <Features />
             <AiFeatureDemo />
          </div>
        );
      case 'pricing':
        return (
          <div className="pt-20">
            <Pricing onOpenChat={() => setIsChatOpen(true)} />
          </div>
        );
      case 'roadmap':
        return <RoadmapPage onBack={() => navigateTo('home')} onOpenChat={() => setIsChatOpen(true)} />;
      case 'integrations':
        return <IntegrationsPage onBack={() => navigateTo('home')} />;
      case 'support':
        return <SupportPage onBack={() => navigateTo('home')} />;
      case 'success':
        return <SuccessHubPage onBack={() => navigateTo('home')} />;
      case 'privacy':
        return <PrivacyPage onBack={() => navigateTo('home')} />;
      case 'terms':
        return <TermsPage onBack={() => navigateTo('home')} />;
      case 'security':
        return <SecurityPage onBack={() => navigateTo('home')} />;
      case 'gdpr':
        return <GdprPage onBack={() => navigateTo('home')} />;
      case 'status':
        return <StatusPage onBack={() => navigateTo('home')} />;
      case 'demo':
        return <DemoPage onSelectDemo={(industry) => { setSelectedDemo(industry); setIsChatOpen(true); }} />;
      default:
        return (
          <GenericPage 
            title={currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ')} 
            onBack={() => navigateTo('home')} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30">
      <Navbar onNavigate={navigateTo} />
      
      {renderContent()}

      <Footer onNavigate={navigateTo} />
      <ChatWidget 
        isOpen={isChatOpen} 
        onToggle={setIsChatOpen} 
        userStatus={userStatus}
        demoIndustry={selectedDemo}
      />
      <VoiceWidget
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-700">
           <div className="text-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full animate-pulse"></div>
              <div className="relative z-10 flex flex-col items-center">
                 <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(59,130,246,0.5)] animate-bounce">
                    <CheckCircle className="w-12 h-12 text-white" />
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Authorization Confirmed</h2>
                 <p className="text-xl text-blue-200 font-light tracking-wide uppercase">
                    Implementation Authorized. <br/> Your Engineering Team is now Online.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

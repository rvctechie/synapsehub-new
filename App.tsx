import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AiFeatureDemo from './components/AiFeatureDemo';
import AiEmployees from './components/AiEmployees';
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
import LeadCaptureSection from './components/LeadCaptureSection';
import BookingSection from './components/BookingSection';
import DemoProofSection from './components/DemoProofSection';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDemo, setSelectedDemo] = useState<string | undefined>(undefined);
  const [userStatus, setUserStatus] = useState<'Prospect' | 'ActivePartner'>(() => {
    try {
      return (localStorage.getItem('userStatus') as 'ActivePartner') || 'Prospect';
    } catch (e) {
      console.warn('localStorage not available', e);
      return 'Prospect';
    }
  });
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('status') === 'paid') {
        setUserStatus('ActivePartner');
        try {
          localStorage.setItem('userStatus', 'ActivePartner');
        } catch (e) {
          console.warn('localStorage setItem failed', e);
        }
        setShowSuccessOverlay(true);
        window.history.replaceState({}, '', window.location.pathname);
        setTimeout(() => {
          setShowSuccessOverlay(false);
          setIsChatOpen(true);
        }, 5000);
      }
    } catch (e) {
      console.error('Error processing URL params', e);
    }
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    if (page !== 'demo') {
      setSelectedDemo(undefined);
    }
  };

  const openDemo = (industry: string) => {
    setSelectedDemo(industry);
    setIsVoiceOpen(true);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero
              onOpenChat={() => setIsChatOpen(true)}
              onOpenVoice={() => { setSelectedDemo(undefined); setIsVoiceOpen(true); }}
              onOpenRoadmap={() => navigateTo('roadmap')}
            />

            <DashboardPreview />

            <div className="bg-slate-950 border-b border-slate-900 pb-16 pt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs font-bold text-slate-500 mb-12 uppercase tracking-[0.2em]">Built for premium service businesses that want a cleaner path from inquiry to client</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 hover:opacity-100 transition-all duration-700">
                   <div className="text-white font-sans font-black text-2xl tracking-tighter hover:scale-105 transition-transform duration-300 cursor-default">VERTEX</div>
                   <div className="text-white font-sans font-thin text-3xl tracking-[0.2em] hover:scale-105 transition-transform duration-300 cursor-default">SOLARA</div>
                   <div className="text-white font-mono font-bold text-xl tracking-tight hover:scale-105 transition-transform duration-300 cursor-default">NEXUS_OPS</div>
                   <div className="text-white font-sans font-bold text-2xl tracking-[0.15em] hover:scale-105 transition-transform duration-300 cursor-default">QUANTUM</div>
                   <div className="text-white font-serif font-bold text-xl tracking-wide hover:scale-105 transition-transform duration-300 cursor-default">EQUITY GROUP</div>
                </div>
              </div>
            </div>

            <Features />
            <AiFeatureDemo />
            <AiEmployees />
            <DemoProofSection onOpenDemo={openDemo} />
            <Pricing onOpenChat={() => setIsChatOpen(true)} />
            <LeadCaptureSection onOpenChat={() => setIsChatOpen(true)} onOpenVoice={() => { setSelectedDemo(undefined); setIsVoiceOpen(true); }} />
            <BookingSection onOpenChat={() => setIsChatOpen(true)} onOpenVoice={() => { setSelectedDemo(undefined); setIsVoiceOpen(true); }} />
            <FAQ />
            
            <section className="py-28 relative overflow-hidden border-t border-slate-900">
              <div className="absolute inset-0 bg-blue-900/20 z-0"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full z-0"></div>

              <div className="max-w-4xl mx-auto px-6 relative z-20 text-center">
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Ready to see if the fit is real?</h2>
                 <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                   Start with the fastest qualification path and see whether SynapseHub is the right next move.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="px-8 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all font-medium shadow-lg shadow-blue-900/30"
                    >
                      Qualify in Chat
                    </button>
                    <button
                      onClick={() => { setSelectedDemo(undefined); setIsVoiceOpen(true); }}
                      className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all font-medium"
                    >
                      Start Guided Call
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
        return <DemoPage onSelectDemo={(industry) => { setSelectedDemo(industry); setIsVoiceOpen(true); }} />;
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
        demoIndustry={selectedDemo}
      />

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

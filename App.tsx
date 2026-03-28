import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AiFeatureDemo from './components/AiFeatureDemo';
import AiEmployees from './components/AiEmployees';
import Testimonials from './components/Testimonials';
import VideoDemo from './components/VideoDemo';
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
    // Check URL params for payment success (from real payment provider callback)
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
        window.history.replaceState({}, '', window.location.pathname);
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

            {/* Integration Partners — Real tools we integrate with */}
            <div className="bg-slate-950 border-b border-slate-900 pb-16 pt-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-xs font-bold text-slate-500 mb-12 uppercase tracking-[0.2em]">Powered By Industry-Leading Integrations</p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 hover:opacity-80 transition-all duration-700">
                   <div className="text-white font-sans font-bold text-xl tracking-tight cursor-default">WhatsApp API</div>
                   <div className="text-white font-sans font-bold text-xl tracking-tight cursor-default">Stripe</div>
                   <div className="text-white font-sans font-bold text-xl tracking-tight cursor-default">Google AI</div>
                   <div className="text-white font-sans font-bold text-xl tracking-tight cursor-default">Twilio</div>
                   <div className="text-white font-sans font-bold text-xl tracking-tight cursor-default">HitPay</div>
                </div>
              </div>
            </div>

            <Features />

            <VideoDemo onOpenChat={() => setIsChatOpen(true)} />

            <AiFeatureDemo />

            <AiEmployees />

            <Testimonials />

            <Pricing onOpenChat={() => setIsChatOpen(true)} />

            <FAQ />

            {/* Call to Action */}
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
                      onClick={() => setIsChatOpen(true)}
                      className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 hover:-translate-y-0.5"
                    >
                      Book Strategy Call
                    </button>
                    <button 
                      onClick={() => setIsVoiceOpen(true)}
                      className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all hover:-translate-y-0.5"
                    >
                      Try Voice Demo
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
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Welcome Aboard</h2>
                 <p className="text-xl text-blue-200 font-light tracking-wide uppercase">
                    Your managed infrastructure is being deployed. <br/> Your Operations Team is now online.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

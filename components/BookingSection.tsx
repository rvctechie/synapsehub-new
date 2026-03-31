import React from 'react';
import { CalendarCheck2, MessageSquareText, PhoneCall } from 'lucide-react';

interface BookingSectionProps {
  onOpenChat?: () => void;
  onOpenVoice?: () => void;
}

const bookingUrl = import.meta.env.VITE_BOOKING_URL || '';
const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || '';

export default function BookingSection({ onOpenChat, onOpenVoice }: BookingSectionProps) {
  const cards = [
    bookingUrl ? {
      key: 'booking',
      icon: <CalendarCheck2 className="w-6 h-6" />,
      iconWrap: 'bg-blue-600/20 text-blue-400',
      title: 'Book a strategy call',
      description: 'Best for buyers who already know they need help and want to move straight into a scheduled review.',
      content: (
        <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors">
          Open booking page
        </a>
      )
    } : null,
    {
      key: 'voice',
      icon: <PhoneCall className="w-6 h-6" />,
      iconWrap: 'bg-emerald-600/20 text-emerald-400',
      title: 'Start a guided call',
      description: 'Best for visitors who want quick diagnosis and a more natural intake conversation before booking.',
      content: (
        <button onClick={onOpenVoice} className="inline-flex w-full justify-center px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors">
          Start call
        </button>
      )
    },
    {
      key: 'messaging',
      icon: <MessageSquareText className="w-6 h-6" />,
      iconWrap: 'bg-purple-600/20 text-purple-400',
      title: 'Continue in messaging',
      description: 'Best for buyers who prefer to qualify step by step in chat before they commit to a call.',
      content: (
        <>
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors mb-3">
              Open WhatsApp
            </a>
          ) : null}
          <button onClick={onOpenChat} className="inline-flex w-full justify-center px-5 py-3 rounded-xl border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors">
            Open site chat
          </button>
        </>
      )
    }
  ].filter(Boolean) as Array<{ key: string; icon: React.ReactNode; iconWrap: string; title: string; description: string; content: React.ReactNode }>;

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Choose the next step that fits how you buy</h2>
          <p className="text-slate-400 text-lg">
            Some buyers want to book immediately. Others want a quick conversation first. Give both paths.
          </p>
        </div>

        <div className={`grid gap-6 ${cards.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'}`}>
          {cards.map((card) => (
            <div key={card.key} className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <div className={`w-12 h-12 rounded-xl ${card.iconWrap} flex items-center justify-center mb-5`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
              <p className="text-slate-400 mb-6">{card.description}</p>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

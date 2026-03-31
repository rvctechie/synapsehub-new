import React from 'react';
import { CalendarCheck2, MessageSquareText, PhoneCall } from 'lucide-react';

interface BookingSectionProps {
  onOpenChat?: () => void;
  onOpenVoice?: () => void;
}

const bookingUrl = import.meta.env.VITE_BOOKING_URL || '';
const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL || '';

export default function BookingSection({ onOpenChat, onOpenVoice }: BookingSectionProps) {
  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Choose the next step that fits how you buy</h2>
          <p className="text-slate-400 text-lg">
            Some buyers want to book immediately. Others want a quick conversation first. Give both paths.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-5">
              <CalendarCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Book a strategy call</h3>
            <p className="text-slate-400 mb-6">
              Best for buyers who already know they need help and want to move straight into a scheduled review.
            </p>
            {bookingUrl ? (
              <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors">
                Open booking page
              </a>
            ) : (
              <div className="text-sm text-amber-400 border border-amber-500/20 bg-amber-500/10 rounded-xl px-4 py-3">
                Add <code>VITE_BOOKING_URL</code> to enable live booking.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Start a guided call</h3>
            <p className="text-slate-400 mb-6">
              Best for visitors who want quick diagnosis and a more natural intake conversation before booking.
            </p>
            <button onClick={onOpenVoice} className="inline-flex w-full justify-center px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors">
              Start call
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-5">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Continue in messaging</h3>
            <p className="text-slate-400 mb-6">
              Best for buyers who prefer to qualify step by step in chat before they commit to a call.
            </p>
            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex w-full justify-center px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-colors mb-3">
                Open WhatsApp
              </a>
            ) : null}
            <button onClick={onOpenChat} className="inline-flex w-full justify-center px-5 py-3 rounded-xl border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-colors">
              Open site chat
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

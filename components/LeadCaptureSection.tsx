import React, { useMemo, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { hasSupabaseConfig, saveLeadToSupabase } from '../src-supabase';
import { callSaveLead, hasEdgeFunctionsConfig } from '../edge-api';

interface LeadCaptureSectionProps {
  onOpenChat?: () => void;
  onOpenVoice?: () => void;
}

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  problem: string;
  volume: string;
  timeline: string;
};

const initialForm: FormState = {
  name: '',
  business: '',
  email: '',
  phone: '',
  problem: '',
  volume: '',
  timeline: '',
};

const isEmail = (value: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);

export default function LeadCaptureSection({ onOpenChat, onOpenVoice }: LeadCaptureSectionProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => {
    return form.name && form.business && isEmail(form.email) && form.problem && form.timeline;
  }, [form]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!canSubmit) {
      setError('Please complete the required fields first.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        source: 'synapsehub-site-form',
        submittedAt: new Date().toISOString(),
        ...form,
      };

      let saved = false;

      if (hasEdgeFunctionsConfig) {
        try {
          const result = await callSaveLead(payload);
          if (result?.ok) saved = true;
          else setError(result?.error || 'Could not save lead through edge function.');
        } catch (e) {
          setError('Edge function lead save failed.');
        }
      }

      if (!saved && hasSupabaseConfig) {
        const result = await saveLeadToSupabase(payload);
        if (!result.ok) {
          setError(result.error || 'Could not save lead to Supabase.');
        } else {
          saved = true;
        }
      }

      if (!saved) {
        try {
          const existing = JSON.parse(localStorage.getItem('synapsehub_leads') || '[]');
          existing.push(payload);
          localStorage.setItem('synapsehub_leads', JSON.stringify(existing));
          saved = true;
        } catch (e) {}
      }

      if (!saved) {
        throw new Error('Could not store lead.');
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      setError('Could not save your request. Please use chat or voice instead.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-6">
              <CheckCircle2 className="w-4 h-4" /> Ready for serious buyers
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
              Get qualified for the right SynapseHub starting point
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              If you already know the business problem, submit the form and give SynapseHub the context needed for a strategy call or technical review.
            </p>

            <div className="space-y-4 text-slate-300">
              {[
                'Best for businesses already getting leads but leaking revenue in follow-up',
                'Useful if you want the team to recommend the right starting tier',
                'Faster path for serious operators than wandering through a generic contact page'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 border border-emerald-500/20 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={onOpenChat}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors"
              >
                Qualify in Chat
              </button>
              <button
                onClick={onOpenVoice}
                className="px-6 py-3 border border-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
              >
                Start Voice Strategy Call
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Request captured</h3>
                <p className="text-slate-400 mb-6">
                  {hasEdgeFunctionsConfig || hasSupabaseConfig
                    ? 'Your request has been sent to the lead pipeline.'
                    : 'Your request was saved locally in this build. Add Supabase and edge-function configuration before production launch.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Name *</label>
                    <input value={form.name} onChange={e => updateField('name', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Business *</label>
                    <input value={form.business} onChange={e => updateField('business', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Business email *</label>
                    <input value={form.email} onChange={e => updateField('email', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">WhatsApp / phone</label>
                    <input value={form.phone} onChange={e => updateField('phone', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Main problem *</label>
                  <select value={form.problem} onChange={e => updateField('problem', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500">
                    <option value="">Select one</option>
                    <option value="missed leads">Missed leads / missed calls</option>
                    <option value="slow follow-up">Slow follow-up</option>
                    <option value="booking issues">Poor appointment booking</option>
                    <option value="manual admin">Too much manual admin</option>
                    <option value="messy systems">Messy systems / migration</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Lead volume</label>
                    <select value={form.volume} onChange={e => updateField('volume', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500">
                      <option value="">Select one</option>
                      <option value="under 20">Under 20 per month</option>
                      <option value="20-100">20-100 per month</option>
                      <option value="100+">100+ per month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Timeline *</label>
                    <select value={form.timeline} onChange={e => updateField('timeline', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white outline-none focus:border-blue-500">
                      <option value="">Select one</option>
                      <option value="asap">ASAP</option>
                      <option value="30 days">Within 30 days</option>
                      <option value="later">Researching / later</option>
                    </select>
                  </div>
                </div>

                {error && <div className="text-sm text-red-400">{error}</div>}

                <button
                  type="submit"
                  disabled={submitting || !canSubmit}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving request...</> : 'Submit for strategy review'}
                </button>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {hasEdgeFunctionsConfig
                    ? 'Edge functions are configured for lead intake.'
                    : hasSupabaseConfig
                      ? 'Supabase is configured for direct lead storage.'
                      : 'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before launch.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

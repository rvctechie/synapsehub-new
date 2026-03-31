import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type LeadPayload = {
  source: string;
  submittedAt: string;
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  problem?: string;
  volume?: string;
  timeline?: string;
  agentRole?: string;
  notes?: string;
  transcript?: unknown;
  leadProfile?: unknown;
};

export async function saveLeadToSupabase(payload: LeadPayload) {
  if (!supabase) {
    return { ok: false, error: 'Missing Supabase environment variables.' };
  }

  const { error } = await supabase.from('leads').insert({
    source: payload.source,
    submitted_at: payload.submittedAt,
    name: payload.name ?? null,
    business: payload.business ?? null,
    email: payload.email ?? null,
    phone: payload.phone ?? null,
    problem: payload.problem ?? null,
    volume: payload.volume ?? null,
    timeline: payload.timeline ?? null,
    agent_role: payload.agentRole ?? null,
    notes: payload.notes ?? null,
    transcript: payload.transcript ?? null,
    lead_profile: payload.leadProfile ?? null,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

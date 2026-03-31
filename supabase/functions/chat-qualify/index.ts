import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      messages = [],
      leadProfile = null,
      saveLead = false,
      leadPayload = null,
      systemPrompt = 'You are a commercially sharp qualification assistant. Keep replies short, human, direct, and ask one question at a time.'
    } = body;

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: messages,
        generationConfig: {
          temperature: 0.25,
        },
      }),
    });

    const result = await geminiResponse.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || 'Give me one second.';

    let saved = false;
    let saveError: string | null = null;

    if (saveLead && leadPayload) {
      const { error } = await supabase.from('leads').insert({
        source: leadPayload.source ?? 'synapsehub-edge-chat',
        submitted_at: leadPayload.submittedAt ?? new Date().toISOString(),
        name: leadPayload.name ?? null,
        business: leadPayload.business ?? null,
        email: leadPayload.email ?? null,
        phone: leadPayload.phone ?? null,
        problem: leadPayload.problem ?? null,
        volume: leadPayload.volume ?? null,
        timeline: leadPayload.timeline ?? null,
        agent_role: leadPayload.agentRole ?? null,
        notes: leadPayload.notes ?? null,
        transcript: leadPayload.transcript ?? null,
        lead_profile: leadPayload.leadProfile ?? leadProfile ?? null,
      });

      if (error) saveError = error.message;
      else saved = true;
    }

    return new Response(JSON.stringify({ text, saved, saveError }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

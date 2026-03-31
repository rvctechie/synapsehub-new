const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const functionsBase = supabaseUrl ? `${supabaseUrl}/functions/v1` : null;

const buildHeaders = () => ({
  'Content-Type': 'application/json',
  ...(supabaseAnonKey ? { apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}` } : {}),
});

export const hasEdgeFunctionsConfig = Boolean(functionsBase && supabaseAnonKey);

export async function callSaveLead(payload: unknown) {
  if (!functionsBase) throw new Error('Missing Supabase URL');

  const res = await fetch(`${functionsBase}/save-lead`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  return res.json();
}

export async function callChatQualify(payload: unknown) {
  if (!functionsBase) throw new Error('Missing Supabase URL');

  const res = await fetch(`${functionsBase}/chat-qualify`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  return res.json();
}

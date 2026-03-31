# SynapseHub Supabase Setup

Use this to connect the site to a real lead pipeline.

## 1. Install dependencies

```bash
npm install
```

## 2. Add environment variables

Create `.env.local` in the project root:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_GEMINI_API_KEY=YOUR_GEMINI_KEY
```

## 3. Create the leads table

Run this SQL in Supabase:

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text,
  submitted_at timestamptz,
  name text,
  business text,
  email text,
  phone text,
  problem text,
  volume text,
  timeline text,
  agent_role text,
  notes text,
  transcript jsonb,
  lead_profile jsonb
);
```

## 4. Allow inserts

For a quick first pass, add a permissive insert policy for anonymous users.
Tighten this before serious scale.

```sql
alter table public.leads enable row level security;

create policy "allow_anon_insert_leads"
on public.leads
for insert
to anon
with check (true);
```

## 5. Important production note

This repo still sends AI requests from the frontend.
That means:
- Gemini key exposure risk still exists
- Supabase anon insert is acceptable for initial testing, but not ideal long-term

## Recommended next production hardening

1. Move Gemini requests server-side
2. Add a server-side lead intake endpoint
3. Add spam protection / rate limiting
4. Add booking link or calendar handoff after successful qualification
5. Replace placeholder proof/testimonials with real customer proof

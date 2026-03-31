# SynapseHub Engineering Improvement Plan

## What was fixed immediately

### Removed frontend env injection in Vite
Previously, `vite.config.ts` injected `GEMINI_API_KEY` into the client bundle using `define`.
That is unsafe for a public marketing site.

Current state:
- that bundle injection has been removed
- client code should no longer rely on hidden compile-time injection through Vite config

## Remaining engineering target

The correct long-term architecture is:

1. Browser UI
- chat input
- voice UI
- lead form

2. Server-side endpoint / edge function
- receives messages or voice summaries
- calls Gemini securely using server-side secrets
- returns response to client
- saves qualified leads to Supabase

3. Supabase
- stores leads and event data

## Why this matters

Without server-side mediation:
- keys are exposed or easier to scrape
- abuse is harder to control
- rate limiting is weaker
- auditing is weaker
- lead capture logic becomes fragmented

## Recommended implementation paths

### Option A: Supabase Edge Functions
Best if you want to stay close to Supabase.

Starter functions have now been scaffolded for:
- `chat-qualify`
- `save-lead`
- optional future `voice-summary`

See `EDGE_FUNCTIONS_SETUP.md`.

### Option B: Small Node backend
Best if you want more control or already have a VPS app server.

Create endpoints such as:
- `POST /api/chat`
- `POST /api/lead`
- `POST /api/voice-summary`

## Practical rollout order

1. Move chat generation server-side
2. Move lead save server-side
3. Replace direct frontend Gemini usage
4. Add abuse protection
5. Add request logging
6. Add voice summary save path

## Minimum secure launch path

If you need to launch before full re-architecture:
- keep form + chat lead capture to Supabase
- remove client-side secret injection
- do not claim strong backend hardening yet
- keep traffic controlled until the server-side path exists

# SynapseHub

SynapseHub is a Vite + React marketing and qualification site designed to feel premium and human on the surface while using automated qualification and lead routing underneath.

## Current goal

Turn the site into a monetizable lead intake system for service businesses.

## What has been improved

- clearer homepage positioning
- stronger offer and pricing language
- humanized chat / voice / messaging labels
- on-site lead capture form
- Supabase lead intake support
- booking and messaging CTA section
- reduced overclaiming in visible copy

## Current known limitations

Before calling this production-ready, address these:

1. Gemini calls still run from the frontend unless you move them behind a server-side or edge-function path
2. Voice flow does not yet persist structured leads to Supabase
3. Public proof/testimonials still need to be replaced with real proof
4. Build/deploy verification must be completed in the target environment
5. Abuse protection / rate limiting is not yet implemented

## Environment variables

Create `.env.local` with the values you actually use:

```bash
VITE_GEMINI_API_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BOOKING_URL=...
VITE_WHATSAPP_URL=...
```

## Supabase

See `SUPABASE_SETUP.md` for table and policy setup.

## Launch checklist

- [ ] `npm install`
- [ ] confirm `.env.local` is present
- [ ] confirm `leads` table exists in Supabase
- [ ] confirm RLS/policy allows insert for the intended client path
- [ ] test form submission
- [ ] test chat qualification and lead save
- [ ] test booking link
- [ ] test WhatsApp link
- [ ] replace placeholder proof with real proof
- [ ] verify all public claims are true
- [ ] run production build
- [ ] deploy and test live domain flow end to end
- [ ] follow `DEPLOY_TEST_CHECKLIST.md`

## Local run

```bash
npm install
npm run dev
```

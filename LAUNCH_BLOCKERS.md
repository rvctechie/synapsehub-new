# SynapseHub Launch Blockers

This file is the honest list of what still blocks a confident production launch.

## Highest priority blockers

### 1. Frontend Gemini exposure
Current state:
- Gemini calls still run in the frontend.
- direct Vite bundle injection was removed, but the architecture is still client-side.

Why this matters:
- key exposure risk
- harder to control abuse
- harder to manage rate limits centrally

Recommended fix:
- move model calls behind a server-side endpoint or edge function

### 2. Voice flow does not persist leads yet
Current state:
- chat and form can save lead data
- voice does not yet save structured lead records to Supabase

Why this matters:
- a high-intent path can leak qualified prospects

Recommended fix:
- create a voice-summary save path or final handoff capture

### 3. Proof layer still depends on demos only
Current state:
- this is acceptable for now
- but real proof will eventually outperform demos alone

Why this matters:
- at higher traffic or price points, buyers want more trust signals

Recommended fix later:
- add real examples, screenshots, or verified outcomes

### 4. Build/deploy verification not yet confirmed here
Current state:
- repo was edited directly
- full successful build/deploy was not verified in this environment

Why this matters:
- code quality is not deployment confirmation

Recommended fix:
- run install, build, and live flow validation in the real target environment

### 5. Anti-spam / abuse protection missing
Current state:
- no visible rate limiting, CAPTCHA, honeypot, or abuse control

Why this matters:
- public forms and AI endpoints will attract junk traffic

Recommended fix:
- add spam protection before meaningful paid traffic

## Medium priority cleanup

- remove unused `Testimonials.tsx` if no longer needed
- rename `AiFeatureDemo.tsx` file if you want codebase naming to match public positioning
- review old pages for lingering AI-heavy wording

## Minimum launch standard

Before calling the site live and monetizable, verify:
- form saves to Supabase
- chat saves leads to Supabase
- booking link works
- WhatsApp link works
- demos feel polished
- all public claims are true
- production env variables are set

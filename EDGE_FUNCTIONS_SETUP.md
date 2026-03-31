# Supabase Edge Functions Setup

This project now includes a starter server-side path for:
- `chat-qualify`
- `save-lead`

## Functions included

### 1. chat-qualify
Purpose:
- call Gemini from server-side
- optionally save qualified leads to Supabase

Path:
- `supabase/functions/chat-qualify/index.ts`

### 2. save-lead
Purpose:
- save lead payloads server-side to Supabase

Path:
- `supabase/functions/save-lead/index.ts`

## Required secrets in Supabase Edge Functions

Set these in Supabase secrets:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_KEY=...
```

## Deploy example

```bash
supabase functions deploy chat-qualify
supabase functions deploy save-lead
```

## Intended next frontend integration

### Form
- replace direct client insert with a call to `save-lead`

### Chat
- replace direct Gemini browser call with a call to `chat-qualify`

## Why this is better

- Gemini key stays server-side
- lead save logic is centralized
- easier to add abuse protection and logging

## Important note

These are starter functions, not final hardened production infrastructure.
Still recommended:
- rate limiting
- auth rules as needed
- request validation
- spam protection
- logging/monitoring

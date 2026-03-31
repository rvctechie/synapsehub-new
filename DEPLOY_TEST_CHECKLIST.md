# Deploy Test Checklist

Use this after deployment to validate the real live flow.

## 1. Environment

Confirm these are set in deployment:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_BOOKING_URL`
- `VITE_WHATSAPP_URL`

If still using any browser fallback during testing:
- `VITE_GEMINI_API_KEY`

For Supabase Edge Functions secrets:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`

## 2. Functions deployed

Confirm these are deployed:
- `chat-qualify`
- `save-lead`

## 3. Homepage checks

- homepage loads without console errors
- hero CTA opens chat
- voice CTA opens voice modal
- demo proof cards open the right demo flow
- booking section shows correct URLs

## 4. Lead form checks

Test form submission with a real-looking payload.

Expected:
- success state appears
- row is inserted into `leads`
- `source = synapsehub-site-form`

## 5. Chat checks

Test a realistic conversation:
- describe a lead problem
- give email
- give phone

Expected:
- reply quality is natural
- lead is saved to `leads`
- `source = synapsehub-chat-widget`
- transcript and lead profile fields are present

## 6. Booking link checks

- click booking CTA
- confirm correct page opens

## 7. WhatsApp link checks

- click WhatsApp CTA
- confirm it opens the intended thread / message draft

## 8. Trust checks

- no fake proof remains
- demos feel polished
- public claims are true
- wording does not overclaim capabilities you do not verify live

## 9. Engineering checks

- browser devtools do not expose Gemini via Vite-injected secret config
- edge functions return expected responses
- Supabase receives expected inserts

## 10. Final decision

Only call the site launch-ready if:
- form works
- chat works
- booking works
- WhatsApp works
- no major console/runtime errors
- all trust/copy claims remain true

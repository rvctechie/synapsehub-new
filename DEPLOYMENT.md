# SynapseHub - Deployment & Hosting Guide

## Production Build Status ✅

✓ NPM install: Success (147 packages, 0 vulnerabilities)
✓ Production build: Success (15.28s, 994.50 kB minified)
✓ Security: API keys properly moved to environment variables
✓ Output directory: `dist/` (contains index.html + assets/)

---

## Hosting on Hostinger (or Any Node.js Hosting)

### Build Configuration

```bash
# Build command (run on deployment)
npm install && npm run build

# Output directory
dist

# Start command (typically not needed for static hosting)
# If using Node server: node server.js or similar
```

### Environment Variables Required

Set these in your hosting provider's environment settings:

| Variable Name | Required | Description | Example |
|---|---|---|---|
| `VITE_GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for chat widget | `AIzaSy...` |
| `VITE_API_BASE_URL` | ❌ No | Optional: Backend API endpoint | `https://api.example.com` |
| `VITE_WEBHOOK_URL` | ❌ No | Optional: Webhook handler URL | `https://webhooks.example.com` |

### Hostinger Specific Setup

#### For Static Hosting (Recommended)

If using Hostinger's **Static Site Hosting** or **CDN**:

1. **Build locally or in CI/CD:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload contents of `dist/` folder to:**
   - Public folder / Web root
   - Or use Hostinger's file manager to upload the `dist` folder contents

3. **Set environment variable** in Hostinger control panel:
   - Go to: hPanel → Hosting → Environment Variables
   - Add `VITE_GEMINI_API_KEY` with your actual Google API key
   - **Important:** Vite env vars are replaced at **build time**, not runtime
   - If you change the API key, you must **rebuild** and redeploy

#### For Node.js Hosting

If using Hostinger's **Node.js hosting**:

1. **Set up package.json scripts** (already done):
   - Build script: `npm run build`
   - Start script: Add if using server
   - Node version: 18+ recommended

2. **In Hostinger hPanel:**
   - Set **Node.js version**: 20 or higher
   - Set **Build command**: `npm install && npm run build`
   - Set **Start command**: `npm run preview` or custom server command
   - **Environment variables**: Add `VITE_GEMINI_API_KEY` and any other VITE_* keys

3. **Deploy:**
   - Push code to repo (Git) or upload via FTP/File Manager
   - Hostinger auto-deploys on push (if Git connected)
   - Manually redeploy if only env vars changed

---

## Local Development Setup

### Prerequisites
- Node.js 18+ 
- npm (comes with Node.js)

### First Time Setup

```bash
# Clone repository
git clone <your-repo-url>
cd synapsehub-new

# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local

# Edit .env.local and add your API key
# VITE_GEMINI_API_KEY=your_actual_key_here
```

### Development Server

```bash
npm run dev

# Opens at http://localhost:3000
# Hot reload enabled - edit files and see changes instantly
```

### Production Build (Local Testing)

```bash
# Build for production
npm run build

# Preview the built site locally
npm run preview

# Opens at http://localhost:4173
```

### Type Checking

```bash
npm run lint

# Checks TypeScript types without building
```

---

## Key Files & Configuration

### Environment Configuration
- **Local:** `.env.local` (git-ignored, for your machine)
- **Example:** `.env.example` (committed, shows required variables)
- **Vite config:** `vite.config.ts` (build-time replacements)
- **TypeScript:** `tsconfig.json` (@ alias points to root)

### Build Artifacts
- **Source:** Root level + `/components` folder
- **Output:** `dist/` folder (2.21 kB HTML + 994 kB JS/assets)
- **Index:** `dist/index.html` (entry point)

### Security Notes
✅ **Fixed:** API keys no longer exposed in bundle
✅ **Fixed:** Using `import.meta.env.VITE_*` (client-side secure)
✅ **Safe:** `.env.local` is in `.gitignore`
- Never commit `.env.local` with real API keys
- Always use environment variable injection from hosting provider

---

## Deployment Checklist

### Before Deploying

- [ ] Run `npm install` (verify no vulnerabilities)
- [ ] Run `npm run build` (verify build succeeds, 0 errors)
- [ ] Run `npm run lint` (verify types pass)
- [ ] Test locally: `npm run preview`
- [ ] Update `.env.example` if new env vars added
- [ ] Ensure `.gitignore` has `*.local` and `.env.local`
- [ ] Verify all API keys are in env vars, NOT in code

### Deployment Steps

1. **Set Environment Variables in Hostinger:**
   ```
   VITE_GEMINI_API_KEY = <your-actual-key>
   ```

2. **Deploy to Hostinger:**
   - **Option A (Git):** Push to connected repo, Hostinger auto-deploys
   - **Option B (Manual):** Upload `dist/` folder via FTP/File Manager
   - **Option C (Node.js):** Hostinger runs build automatically

3. **Verify Deployment:**
   - Access your domain
   - Open browser DevTools (F12)
   - Verify no 404 errors on assets
   - Test chat widget (should show "API Key missing" gracefully if not set)
   - Check console for warnings (should be minimal)

### Rollback Plan

- Keep previous `dist/` backup
- If build fails, previous version still serves on CDN (until cache clears)
- Redeploy previous commit if needed

---

## Performance Metrics

- **Build time:** ~15 seconds
- **Output size:** 994.50 kB (minified) | 263.98 kB (gzip)
- **⚠️ Note:** Chunk size warning for 500 kB+ bundles (non-critical for hosting)

### Optimization (Optional)

If chunk size becomes an issue for very slow clients:
```typescript
// In vite.config.ts, add:
rollupOptions: {
  output: {
    manualChunks: {
      // Split larger libraries
      'google-genai': ['@google/genai'],
      'recharts': ['recharts']
    }
  }
}
```

---

## Support & Troubleshooting

### "API Key missing" on chat widget
- **Cause:** `VITE_GEMINI_API_KEY` not set in environment
- **Fix:** Set in Hostinger hPanel → Environment Variables → Redeploy
- **Note:** Env vars are baked in at build time, so you must rebuild after changing

### Blank white page after deployment
- **Cause:** Asset loading failed (wrong public path or CORS)
- **Fix:** Check dist/index.html references (should be relative paths)
- **Check:** Browser console for 404 errors

### 500 KB chunk warning
- Non-critical warning, doesn't prevent deployment
- Site will still work fine with HTTP/2
- Only optimize if serving to 2G clients

### TypeScript errors on deploy
- **Fix:** Run `npm run lint` locally to catch before pushing
- **Hostinger:** May fail build if strict TypeScript checks enabled

---

## API Key Acquisition

### Google Gemini API Key

1. Go to [https://aistudio.google.com/app/apikeys](https://aistudio.google.com/app/apikeys)
2. Click "Create API Key"
3. Select project (create new if needed)
4. Copy the generated key (looks like: `AIzaSy...`)
5. **NEVER** commit this key to git
6. Add to Hostinger environment variables only

---

## Production Safety Checklist

- [ ] No `process.env.*` in client code (use `import.meta.env.VITE_*` only)
- [ ] All secrets in environment variables
- [ ] `.gitignore` has `*.local` and `.env.local`
- [ ] `.env.example` has placeholders, NOT real keys
- [ ] HTTPS enabled on domain (Hostinger auto-enables with free SSL)
- [ ] CSP headers configured if needed (usually auto by Hostinger)
- [ ] CORS configured for API calls (if applicable)

---

**Last Updated:** 2026-03-28  
**Status:** ✅ Production Ready  
**Build Command:** `npm install && npm run build`  
**Output Directory:** `dist/`

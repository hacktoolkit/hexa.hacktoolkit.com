# Hexa ⟡ Testing Guide

This guide explains how to test the AI provider system and verify that Transformers.js is working correctly.

## Quick Start

```bash
npm run dev
# Open http://localhost:3000
# Open browser console (F12 or Cmd+Option+I)
```

---

## Testing AI Providers

### Current Status

**Default Provider:** Mock Mode 🎭
- Instant responses
- No setup required
- Pre-coded examples

---

## How to Test Transformers.js Integration

### Step 1: Check Default Provider (Mock Mode)

1. Open http://localhost:3000
2. Look at bottom-right of chat input
3. Should say: **"🎭 Mock Mode (Press ⌘+K for AI)"**
4. Type: "Write a Python function to reverse a linked list"
5. Check browser console - you should see:
   ```
   💬 [AI API] Generating response with provider: mock
   🎭 [AI API] Routing to Mock API...
   ✅ [AI API] Mock response received
   ```

### Step 2: Switch to Transformers.js

1. Press `⌘+K` (Mac) or `Ctrl+K` (Windows/Linux)
2. Settings modal opens
3. Click on **"Transformers"** provider button
4. Watch the browser console for:
   ```
   🤖 Initializing Transformers.js model...
   ```

**What Happens Next:**
- Model download begins (~250MB)
- This can take 2-5 minutes on first load
- Status indicator updates:
  - `🔄 Loading model...` (during download)
  - `🤖 AI Ready` (when complete)

### Step 3: Verify Model Download

Open **Browser DevTools → Network Tab**:
- Look for downloads from `huggingface.co`
- Model files (`.onnx`, `.json`) downloading
- Total size: ~250MB

**Console logs to watch for:**
```
🤖 Initializing Transformers.js model...
✅ Model initialized successfully
```

### Step 4: Test AI Generation

1. Wait for status: **"🤖 AI Ready"**
2. Type: "Write a fibonacci function"
3. Press Enter or ⌘+Enter
4. Check console logs:
   ```
   💬 [AI API] Generating response with provider: transformers
   📝 [AI API] User message: "Write a fibonacci function"
   🤖 [AI API] Routing to Transformers.js...
   ✅ [AI API] Transformers.js response received
   ```

---

## Common Issues & Solutions

### Issue: "Model not loaded" forever

**Cause:** Still on mock mode, need to manually switch to transformers

**Solution:**
1. Press ⌘+K
2. Click "Transformers" provider
3. Wait for download

### Issue: Model download fails

**Causes:**
- Network issues
- Browser doesn't support WebAssembly
- Insufficient disk space

**Solutions:**
1. Check internet connection
2. Try Chrome/Edge (best WebAssembly support)
3. Free up ~500MB disk space
4. Check console for specific errors

### Issue: Status says "Loading" but nothing happens

**Debugging:**
1. Open DevTools → Network tab
2. Filter by `huggingface.co`
3. Check if files are downloading
4. If stuck, refresh page and try again

### Issue: AI generates weird/incomplete code

**This is normal for the CodeT5-small model:**
- It's a smaller model (~250MB)
- Not as powerful as GPT-4 or Claude
- Best for simple code snippets
- For production, use Backend API with GPT-4

---

## Verifying Each Provider

### Test Mock Provider

```javascript
// In browser console:
1. Note current provider (should show 🎭)
2. Send message: "hello"
3. Should get instant response with sample code
```

**Console output:**
```
💬 [AI API] Generating response with provider: mock
🎭 [AI API] Routing to Mock API...
✅ [AI API] Mock response received
```

### Test Transformers.js Provider

```javascript
// In browser console after switching to transformers:
1. Switch to transformers (⌘+K → click Transformers)
2. Wait for "🤖 AI Ready"
3. Send message: "fibonacci"
4. Should take ~2-5 seconds to generate
```

**Console output:**
```
💬 [AI API] Generating response with provider: transformers
🤖 [AI API] Routing to Transformers.js...
✅ [AI API] Transformers.js response received
```

### Test Backend Provider (Not Yet Configured)

```javascript
// Clicking "Backend" without configuration:
1. Switch to backend (⌘+K → click Backend)
2. Send message
3. Should fail and fall back to mock
```

**Console output:**
```
💬 [AI API] Generating response with provider: backend
❌ [AI API] Error with backend provider: Backend URL not configured
⚠️ [AI API] Falling back to mock provider
```

---

## Performance Benchmarks

| Provider | First Response | Subsequent | Model Size | Quality |
|----------|---------------|------------|------------|---------|
| Mock | <100ms | <100ms | 0 | Pre-coded |
| Transformers | 2-5 sec | 2-5 sec | 250MB | Good |
| Backend (GPT-4) | 1-3 sec | 1-3 sec | N/A | Excellent |

---

## Debugging Tips

### Enable Verbose Logging

All AI operations log to console with prefixes:
- `💬 [AI API]` - Main API calls
- `🤖 [AI API]` - Transformers.js routing
- `🎭 [AI API]` - Mock API routing
- `✅ [AI API]` - Success messages
- `❌ [AI API]` - Errors

### Check Network Activity

1. Open DevTools → Network
2. Filter by: `huggingface.co`
3. Look for model downloads
4. Check status codes (200 = success)

### Verify Provider Status

The status indicator in the chat input updates every second:
- **Mock:** `🎭 Mock Mode (Press ⌘+K for AI)`
- **Transformers (loading):** `🔄 Loading model...`
- **Transformers (ready):** `🤖 AI Ready`
- **Transformers (not loaded):** `⏳ Click ⌘+K to enable AI`

---

## Expected Behavior

### On Page Load
1. Page loads with Mock mode active
2. Status shows: `🎭 Mock Mode (Press ⌘+K for AI)`
3. Can immediately chat and get responses
4. All responses use mock data

### After Switching to Transformers
1. Click Transformers in Settings (⌘+K)
2. Status changes to: `🔄 Loading model...`
3. Network tab shows downloads from huggingface.co
4. After 2-5 minutes: `🤖 AI Ready`
5. Subsequent messages use real AI model

### Persistence
- Provider choice is NOT persisted (resets to mock on refresh)
- Model is cached by browser (no re-download needed)
- To persist provider, add to localStorage

---

## For Developers

### Adding Custom Logging

```typescript
// In lib/aiApi.ts
console.log('🔍 [DEBUG] Your message here')
```

### Testing Provider Switching

```typescript
// In browser console:
import { switchProvider } from '/lib/aiApi'

// Switch to transformers
await switchProvider('transformers')

// Switch back to mock
await switchProvider('mock')
```

### Checking Model Status

```typescript
// In browser console:
import { getAIStatus } from '/lib/aiApi'

console.log(getAIStatus())
// Returns: { provider: 'mock', status: 'ready', ready: true }
```

---

## Success Checklist

- [ ] Page loads in mock mode
- [ ] Can send messages and get instant responses
- [ ] ⌘+K opens settings modal
- [ ] Can switch to Transformers provider
- [ ] Console shows "Initializing Transformers.js model..."
- [ ] Network tab shows downloads from huggingface.co
- [ ] Status changes from "Loading" to "AI Ready"
- [ ] Can send message and get AI-generated code
- [ ] Console shows "Routing to Transformers.js..."
- [ ] AI-generated code appears in editor

---

## Additional Features

Potential enhancements:
1. Implement provider persistence (localStorage)
2. Add progress bar for model download
3. Set up backend API
4. Add model selection UI (CodeT5-small vs CodeLlama)

For issues, check:
- Browser console for errors
- Network tab for failed downloads
- Backend API documentation for setup

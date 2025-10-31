# Schengen Visa Assistant

This folder contains a ready-to-deploy AI assistant project for your website.

## Deployment Steps (Summary)
1. Upload this folder to a GitHub repository named `schengen-visa-assistant`.
2. Go to [Vercel.com](https://vercel.com), import the repository, and set environment variables:
   - `OPENAI_API_KEY`
   - `BRAND_NAME = Schengen Visa Assistant`
   - `DATA_SOURCE_URLS` with your website URLs
   - Optional Twilio settings for WhatsApp leads.
3. Deploy and get your app URL (e.g. `https://schengen-visa-assistant.vercel.app`).
4. On GoDaddy, add this snippet before `</body>` in your site footer:
```html
<script>
  window.SVA_API_BASE = "https://schengen-visa-assistant.vercel.app";
  window.SVA_BRAND = "Schengen Visa Assistant";
</script>
<script src="https://schengen-visa-assistant.vercel.app/widget.js" async></script>
```
5. Publish and test. You should see a chat bubble on your site.

---
© Schengen Visa Consultancy Ltd.

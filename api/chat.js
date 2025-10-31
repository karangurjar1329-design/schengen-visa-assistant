// api/chat.js
// Simplified chat handler placeholder for deployment testing
export default async function handler(req, res) {
  return new Response(JSON.stringify({ reply: "Hello! I am your Schengen Visa Assistant." }), {
    headers: { "Content-Type": "application/json" }
  });
}

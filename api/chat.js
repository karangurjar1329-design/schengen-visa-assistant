export default async function handler(req, res) {
  res.status(200).json({
    message: "✅ API is working!",
    reply: "Hello! I am your Schengen Visa Assistant."
  });
}

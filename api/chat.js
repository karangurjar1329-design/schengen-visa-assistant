// api/chat.js
export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  if (req.method && req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const messages = body.messages || [
      { role: "user", content: "Hello" }
    ];

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7
      })
    });

    const data = await openaiResponse.json();

    if (data.error) {
      console.error("OpenAI error:", data.error);
      return new Response(JSON.stringify({ reply: "⚠️ " + data.error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I didn’t understand that.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ reply: "⚠️ Error connecting to OpenAI." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

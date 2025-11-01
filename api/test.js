// api/test.js
export const config = {
  runtime: "edge",
};

export default async function handler() {
  const hasKey = !!process.env.OPENAI_API_KEY;
  return new Response(
    JSON.stringify({
      hasKey,
      keyStart: process.env.OPENAI_API_KEY?.slice(0, 7) || null
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

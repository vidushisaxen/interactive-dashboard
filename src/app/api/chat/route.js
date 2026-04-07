const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const SYSTEM_PROMPT = `You are Quantro Assistant, a concise in-app finance dashboard helper.
Your job is to help users understand the current dashboard screen, navigation, metrics, stocks, pools, transfers, deposits, withdrawals, and requests.
Be minimal, practical, and accurate.
Do not invent live market values or private account details.
If the user asks for information not present in the app, say so clearly and offer the next best help.`;

function buildConversation(history = [], pathname, message) {
  const trimmedHistory = history
    .filter(
      (entry) =>
        entry &&
        (entry.role === "user" || entry.role === "assistant") &&
        typeof entry.content === "string" &&
        entry.content.trim()
    )
    .slice(-8);

  const contents = trimmedHistory.map((entry) => ({
    role: entry.role === "assistant" ? "model" : "user",
    parts: [{ text: entry.content.trim() }],
  }));

  contents.push({
    role: "user",
    parts: [
      {
        text: `Current app route: ${pathname || "/"}\nUser message: ${message}`,
      },
    ],
  });

  return contents;
}

function extractReply(payload) {
  return payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("\n")
    .trim();
}

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY. Add it to your environment before using the assistant." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const message = body?.message?.trim();
    const pathname = typeof body?.pathname === "string" ? body.pathname : "/";
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return Response.json({ error: "Message is required." }, { status: 400 });
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }],
        },
        contents: buildConversation(history, pathname, message),
        generationConfig: {
          temperature: 0.5,
          topP: 0.9,
          maxOutputTokens: 350,
        },
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = payload?.error?.message || "Gemini request failed.";
      return Response.json({ error: errorMessage }, { status: response.status });
    }

    const reply = extractReply(payload);

    if (!reply) {
      return Response.json(
        { error: "Gemini returned an empty response." },
        { status: 502 }
      );
    }

    return Response.json({ reply });
  } catch {
    return Response.json(
      { error: "The assistant is temporarily unavailable." },
      { status: 500 }
    );
  }
}

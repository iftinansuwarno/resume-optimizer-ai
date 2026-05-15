import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    // Kita tembak langsung ke API v1 (BUKAN v1beta)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are an ATS expert. Suggest 3 improvements for this resume based on the job description. 
            Resume: ${resumeText}
            JD: ${jobDescription}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: data.error.code || 500 });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ analysis: aiText });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
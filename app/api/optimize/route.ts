import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) return NextResponse.json({ error: "API Key is missing" }, { status: 500 });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze this resume for this job description and give 3-5 ATS optimization tips.
            Resume: ${resumeText}
            JD: ${jobDescription}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      // Jika error, kita kirim pesan error aslinya agar kita tahu masalahnya di mana
      return NextResponse.json({ error: `Google API Error: ${data.error.message}` }, { status: 500 });
    }

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "AI did not return any suggestions. Try shorter text." }, { status: 500 });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ analysis: aiText });

  } catch (error: any) {
    return NextResponse.json({ error: `System Error: ${error.message}` }, { status: 500 });
  }
}
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeText, jobDescription } = await req.json();
    
    // Ambil API Key dari Environment Variable
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing in Vercel settings" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are an expert career coach and ATS specialist. 
      Analyze the following resume against the job description.
      Provide 3-5 specific, actionable suggestions to improve the resume for this role.
      
      Resume: ${resumeText}
      Job Description: ${jobDescription}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ analysis: text });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process AI" }, { status: 500 });
  }
}
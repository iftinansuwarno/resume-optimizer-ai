import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { resume, jd } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a professional Career Coach and Senior Recruiter with expertise in ATS (Applicant Tracking Systems). 
      I will provide you with a Resume and a Job Description (JD).
      
      Your tasks:
      1. Identify key skill gaps between the Resume and the JD.
      2. Rewrite 3-5 high-impact bullet points for the work experience section that align with the JD's requirements.
      3. Use strong action verbs (e.g., 'Spearheaded', 'Optimized', 'Engineered') and quantifiable metrics where possible.
      4. Ensure the tone is professional, concise, and optimized for both human recruiters and ATS algorithms.

      Resume: ${resume}
      Job Description: ${jd}
      
      Provide the response in English with clear headings and professional formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
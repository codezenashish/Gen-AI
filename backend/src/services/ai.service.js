import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const interviewReportSchema = z.object({
  technicalQuestions: z
    .array(
      z.object({
        question: z.string().describe("A technical question relevant to the job description and the candidate's resume."),
        intention: z.string().describe("The intention behind asking this question."),
        answer: z.string().describe("A detailed answer to the technical question."),
      })
    )
    .describe("An array of technical questions designed to evaluate hard skills."),
  behavioralQuestions: z
    .array(
      z.object({
        question: z.string().describe("A behavioral question designed to evaluate soft skills."),
        intention: z.string().describe("The intention behind asking this question."),
        answer: z.string().describe("A detailed answer showcasing interpersonal skills."),
      })
    )
    .describe("An array of behavioral questions designed to evaluate soft skills."),
  skillGaps: z.array(
    z.object({
      skill: z.string().describe("A specific skill gap."),
      severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap."),
      preparationPlan: z.array(
        z.object({
          day: z.number().describe("The day number in the preparation plan."),
          focusArea: z.string().describe("The specific skill to focus on."),
          tasks: z.array(z.string()).describe("A list of specific tasks."),
        })
      ),
    })
  ),
});

async function generateInterviewReport(resume, jobDescription, description) {
  if (!resume || typeof resume !== "string") {
    throw new Error("Resume must be a non-empty string");
  }
  if (!jobDescription || typeof jobDescription !== "string") {
    throw new Error("Job description must be a non-empty string");
  }
  if (!description || typeof description !== "string") {
    throw new Error("Candidate description must be a non-empty string");
  }

  const prompt = `Based on the following candidate resume, job description, and candidate description, generate a comprehensive interview report that includes technical questions, behavioral questions, and identified skill gaps with a preparation plan.

**CANDIDATE RESUME:**
${resume}

**JOB DESCRIPTION:**
${jobDescription}

**CANDIDATE DESCRIPTION:**
${description}

Provide a detailed and actionable interview report.`;

  try {
    const jsonSchema = zodToJsonSchema(interviewReportSchema);
    delete jsonSchema.$schema; 

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema, 
      },
    });

    const responseText = response.text; 
    const parsedReport = JSON.parse(responseText);

    return parsedReport;
  } catch (error) {
    console.error("Error generating interview report:", error);
    throw new Error(`Failed to generate interview report: ${error.message}`);
  }
}

export default generateInterviewReport;
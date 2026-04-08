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
        question: z
          .string()
          .describe(
            "A technical question relevant to the job description and the candidate's resume."
          ),
        intention: z
          .string()
          .describe(
            "The intention behind asking this question, such as assessing specific skills or knowledge areas."
          ),
        answer: z
          .string()
          .describe(
            "A detailed answer to the technical question, demonstrating the candidate's knowledge and experience."
          ),
      })
    )
    .describe(
      "An array of technical questions designed to evaluate the candidate's hard skills and technical expertise."
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "A behavioral question designed to evaluate the candidate's soft skills, cultural fit, and past experiences."
          ),
        intention: z
          .string()
          .describe(
            "The intention behind asking this question, such as understanding the candidate's problem-solving approach or teamwork abilities."
          ),
        answer: z
          .string()
          .describe(
            "A detailed answer to the behavioral question, showcasing the candidate's interpersonal skills and relevant experiences."
          ),
      })
    )
    .describe(
      "An array of behavioral questions designed to evaluate the candidate's soft skills, cultural fit, and past experiences."
    ),
  skillGaps: z.array(
    z.object({
      skill: z
        .string()
        .describe(
          "A specific skill or knowledge area where the candidate may have gaps based on their resume and the job description."
        ),
      severity: z
        .enum(["low", "medium", "high"])
        .describe(
          "The severity of the skill gap, indicating how critical it is for the candidate to address this gap in order to be successful in the role."
        ),
      preparationPlan: z.array(
        z.object({
          day: z
            .number()
            .describe(
              "The day number in the preparation plan, starting from 1."
            ),
          focusArea: z
            .string()
            .describe(
              "The specific skill or knowledge area to focus on during this day of preparation."
            ),
          tasks: z
            .array(z.string())
            .describe(
              "A list of specific tasks or activities the candidate should complete on this day to improve their skills in the focus area."
            ),
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
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
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

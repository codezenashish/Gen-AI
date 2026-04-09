import asyncHandler from "../utils/asyncHandler.js";
import { PDFParse } from "pdf-parse";
import fs from "fs";
import generateInterviewReport from "../services/ai.service.js";
import { InterviewReport } from "../models/interviewReport.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const generateInterviewReportController = asyncHandler(async (req, res) => {
  const resumeLocalPath = req.file?.path;
  if (!resumeLocalPath) {
    throw new ApiError(400, "Resume file is required");
  }

  const { selfDescription, jobDescription } = req.body;
  if (!selfDescription || !jobDescription) {
    if (fs.existsSync(resumeLocalPath)) fs.unlinkSync(resumeLocalPath);
    throw new ApiError(
      400,
      "Self Description and Job Description are required"
    );
  }

  let resumeText = "";
  try {
    const dataBuffer = fs.readFileSync(resumeLocalPath);
    const parser = new PDFParse({ data: dataBuffer });
    const pdfData = await parser.getText();
    resumeText = pdfData.text;

    const aiResponse = await generateInterviewReport(
      resumeText,
      jobDescription,
      selfDescription
    );

    console.log("Raw AI Response:", JSON.stringify(aiResponse, null, 2));

    const mappedResponse = {
      // technical_questions (snake) ya technicalQuestions (camel) dono check karo
      technicalQuestions: (
        aiResponse.technical_questions ||
        aiResponse.technicalQuestions ||
        []
      ).map((q) => ({
        // Gemini agar string bhej raha hai toh string lo, warna object se question nikalo
        questions: typeof q === "string" ? q : q.question || q.questions,
        intention: q.intention || "Assess technical depth",
      })),

      // skill_gaps (snake) ya skillGaps (camel) check karo
      skillsGap: (aiResponse.skill_gaps || aiResponse.skillGaps || []).map(
        (gap) => ({
          missingSkill:
            typeof gap === "string" ? gap : gap.skill || gap.missingSkill,
          importance: gap.severity
            ? gap.severity.charAt(0).toUpperCase() + gap.severity.slice(1)
            : "Medium",
        })
      ),

      // preparation_plan (snake) ya preparationPlan (camel) check karo
      preparationPlan: (
        aiResponse.preparation_plan ||
        aiResponse.preparationPlan ||
        []
      ).map((plan, index) => {
        // Agar Gemini ne simple string array bheja hai (jaisa aapke terminal log mein tha)
        if (typeof plan === "string") {
          return {
            day: index + 1,
            focus: "General Improvement",
            task: plan,
          };
        }
        // Agar Gemini ne object bheja hai
        return {
          day: plan.day || index + 1,
          focus: plan.focusArea || plan.focus || "Focus Area",
          task: Array.isArray(plan.tasks)
            ? plan.tasks.join(", ")
            : plan.task || "",
        };
      }),
    };

    const interviewReport = await InterviewReport.create({
      user: req.user?._id,
      jobDescription,
      selfDescription,
      resume: resumeText,
      ...mappedResponse,
    });

    fs.unlinkSync(resumeLocalPath);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          interviewReport,
          "Interview report generated successfully"
        )
      );
  } catch (error) {
    if (fs.existsSync(resumeLocalPath)) fs.unlinkSync(resumeLocalPath);
    throw new ApiError(
      500,
      error?.message || "Internal Server Error during processing"
    );
  }
});

export { generateInterviewReportController };

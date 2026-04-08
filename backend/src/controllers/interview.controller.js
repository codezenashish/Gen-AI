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

    const interviewReport = await InterviewReport.create({
      user: req.user?._id,
      jobDescription,
      selfDescription,
      resume: resumeText,
      ...aiResponse,
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

import mongoose, { Schema } from "mongoose";

const technicalQuestionSchema = new Schema({
  questions: {
    type: String,
    required: [true, "technical question is required"],
  },
  intention: {
    type: String,
    required: [true, "answer is required"],
  },
  _id: false,
});

const skillsGapSchema = new Schema({
  missingSkill: { type: String },
  importance: { type: String, enum: ["High", "Medium", "Low"] },
  _id: false,
});

const preparationPlanSchema = new Schema({
  day: {
    type: Number,
    required: [true, "day is required"],
  },
  focus: {
    type: String,
    required: [true, "focus is required"],
  },
  task: {
    type: String,
    required: [true, "task is required"],
  },
  _id: false,
});

const interviewReportSchema = new Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },
    resume: { type: String },
    selfDescription: { type: String },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],
    skillsGap: [skillsGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

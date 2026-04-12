import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { generateInterviewReportController } from "../controllers/interview.controller.js";
const interviewRouter = Router();

interviewRouter
  .route("/")
  .post(verifyJWT, upload.single("resume"), generateInterviewReportController);

export default interviewRouter;

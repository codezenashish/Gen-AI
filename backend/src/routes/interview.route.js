import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { generateInterviewReportController } from "../controllers/interview.controller";
const interviewRouter = Router();

interviewRouter.route("/").post(verifyJWT,upload.single("resume"), generateInterviewReportController);

export default interviewRouter;

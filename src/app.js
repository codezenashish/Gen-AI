import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/auth.routes.js";
const app = express();

const REQUEST_BODY_SIZE_LIMIT = "10kb";
const STATIC_FILE_DIR = "public";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json({ limit: REQUEST_BODY_SIZE_LIMIT }));
app.use(express.urlencoded({ limit: REQUEST_BODY_SIZE_LIMIT }));
app.use(express.static(STATIC_FILE_DIR));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

export default app;



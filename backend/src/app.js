import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

// Import Routes
import userRouter from "./routes/user.routes.js";
import leadRouter from "./routes/lead.routes.js";
import blogRouter from "./routes/blog.routes.js";
import careerRouter from "./routes/career.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

const app = express();

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, or same-origin)
            if (!origin) return callback(null, true);
            const allowedOrigins = [
                process.env.CORS_ORIGIN,
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:3000",
            ].filter(Boolean);

            if (allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
                return callback(null, true);
            }
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Base health check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Route Declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/careers", careerRouter);
app.use("/api/v1/analytics", analyticsRouter);

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            success: false,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    return res.status(500).json({
        statusCode: 500,
        success: false,
        message: err.message || "Internal Server Error",
        errors: [],
    });
});

export { app };

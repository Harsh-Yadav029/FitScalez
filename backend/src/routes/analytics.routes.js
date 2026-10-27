import { Router } from "express";
import { recordPageView, getAnalyticsStats } from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public telemetry endpoint called by clients
router.route("/track").post(recordPageView);

// Admin-only stats endpoint
router.route("/stats").get(verifyJWT, getAnalyticsStats);

export default router;

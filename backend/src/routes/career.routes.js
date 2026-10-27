import { Router } from "express";
import {
    getAllJobs,
    getJobById,
    createJob,
    applyForJob,
    getAllApplications,
    updateApplicationStatus,
} from "../controllers/career.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.route("/jobs").get(getAllJobs);
router.route("/jobs/:id").get(getJobById);
router.route("/apply").post(upload.single("resume"), applyForJob);

// Protected admin routes
router.route("/jobs").post(verifyJWT, createJob);
router.route("/applications").get(verifyJWT, getAllApplications);
router.route("/applications/:id/status").patch(verifyJWT, updateApplicationStatus);

export default router;

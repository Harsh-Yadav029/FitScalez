import { Router } from "express";
import {
    createLead,
    getAllLeads,
    getLeadById,
    updateLeadStatus,
    deleteLead,
} from "../controllers/lead.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route for visitors submitting contact / lead forms (supports / and /send)
router.route("/").post(createLead);
router.route("/send").post(createLead);

// Protected routes for admin management
router.route("/").get(verifyJWT, getAllLeads);
router.route("/all").get(verifyJWT, getAllLeads);
router.route("/:id").get(verifyJWT, getLeadById);
router.route("/:id/status").patch(verifyJWT, updateLeadStatus);
router.route("/:id").delete(verifyJWT, deleteLead);

export default router;

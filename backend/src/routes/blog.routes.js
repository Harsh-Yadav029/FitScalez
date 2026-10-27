import { Router } from "express";
import {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getAllBlogs);
router.route("/:slug").get(getBlogBySlug);

// Protected admin routes
router.route("/").post(verifyJWT, createBlog);
router.route("/:id").put(verifyJWT, updateBlog);
router.route("/:id").delete(verifyJWT, deleteBlog);

export default router;

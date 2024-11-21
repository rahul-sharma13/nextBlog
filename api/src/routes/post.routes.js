import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createPost, getAllPosts, getUserPosts } from "../controllers/post.controllers.js";

const router = express.Router();

// verifying the token through middleware, if user not signed in then cant post
router.route("/post").post(verifyToken, createPost);
router.route("/get").get(getAllPosts);
router.route("/post").get(getUserPosts);

export default router;
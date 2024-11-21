import express from "express";
import { userLogin, userSignUp } from "../controllers/auth.controllers.js";

const router = express.Router();

router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);

export default router;
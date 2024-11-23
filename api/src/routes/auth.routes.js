import express from "express";
import { getUserInfo, userLogin, userSignUp } from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/signup").post(userSignUp);
router.route("/login").post(userLogin);
router.route("/protected-route").get(verifyToken, getUserInfo);

export default router;

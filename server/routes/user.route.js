import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { signupValidation } from "../middlewares/validation.middleware.js";

const router = Router()

router.route("/sign-up")
    .post(signupValidation, authController)

export default router
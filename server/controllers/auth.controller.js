import User from "../models/auth.model.js"
import jwt from "jsonwebtoken"
import { generateTokenAndCookie } from "../utils/generateTokenAndCookie.js"
import { sendWelcomeEmail } from "../lib/mail.js"

export const authController = async (req, res) => {
    try {
        const user = await User.create(req.body)

        generateTokenAndCookie(res, user._id)
        
        await sendWelcomeEmail(user.email, user.firstName)

        user.password = undefined

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.log("Error creating user", error.message);
        res.status(500).json({ message: "Error creating user" }) 
    }
}
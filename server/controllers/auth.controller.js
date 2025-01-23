import User from "../models/auth.model.js"

export const authController = async (req, res) => {
    try {
        const user = await (await User.create(req.body))

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
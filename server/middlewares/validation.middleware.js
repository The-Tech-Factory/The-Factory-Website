import { body, validationResult } from 'express-validator';
import User from '../models/auth.model.js';


const withErrorMessage = (validations) => {
    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMsg = errors.array().map((err) => err.msg);
                return res.status(400).json({ message: errorMsg });
            }
            next(); 
        }
    ];
};


export const signupValidation = withErrorMessage([

    body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .trim()
        .escape(),
 
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .trim()
        .escape(),
    
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("A valid email address is required")
        .trim()
        .escape()
        .custom(async (value) => {
            const userExist = await User.findOne({ email: value });
            if (userExist) {
                throw new Error("User already exists with this email");
            }
        }),

    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required")
        .matches(/^(\+234|0)[7-9]\d{8}$/)
        .withMessage("Invalid phone number. It must start with +234 or 0 and be followed by 10 digits"),

    body("referralSource")
        .notEmpty()
        .withMessage("Referral source is required")
        .trim()
        .escape(),

    body("enrolledProgram")
        .notEmpty()
        .withMessage("Selected program is required")
        .trim()
        .escape(),
    
    body("stateOfResidence")
        .notEmpty()
        .withMessage("State of residence is required")
        .trim()
        .escape(),
    
    body("gender")
        .notEmpty()
        .withMessage("Gender is required")
        .isIn(["Male", "Female"])
        .withMessage("Gender must be either 'Male' or 'Female'"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
]);


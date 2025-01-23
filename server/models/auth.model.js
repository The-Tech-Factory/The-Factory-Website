import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            lowercase: true,
            required: [true, "First name is required."]
        },
        lastName: {
            type: String,
            lowercase: true,
            required: [true, "Last name is required."]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required."],
            lowercase: true,
            index: true
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required."],
            index: true
        },
        referralSource: {
            type: String,
            lowercase: true,
            required: true
        },
        enrolledProgram: {
            type: String,
            lowercase: true,
            required: [true, "Selected program is required."]
        },
        stateOfResidence: {
            type: String,
            lowercase: true,
            required: [true, "State is required."]
        },
        gender: {
            type: String,
            required: [true, "Gender is required."],
            enum: ["Male", "Female"]
        },
        role: {
            type: String,
            enum: ["student", "instructor", "admin"],
            default: "student"
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            select: false,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);

export default User;

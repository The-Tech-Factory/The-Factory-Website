import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Database connected: ${conn.connection.host}`);

    } catch (error) {
        console.log("Error connecting to Database", error.message);
        process.exit(1)
    }
}
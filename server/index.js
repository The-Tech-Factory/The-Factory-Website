import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"

// Local Imports
import authRoute from "./routes/user.route.js"
import { connectDB } from "./lib/db.js"

dotenv.config()
const app = express()


app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/auth/", authRoute)

app.get("/", (req, res) => {
    res.send("Server running successfully.")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB()
})
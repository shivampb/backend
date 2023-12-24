import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
    orgin: process.env.CORS_ORIGIN,
    credentials: true
}))

//middlewares
app.use(express.json({ limits: "20kb" }))
app.use(express.urlencoded({ extended: true, limits: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//Roters
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register
export default app;
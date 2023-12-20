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


export default app;
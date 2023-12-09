import dotenv from "dotenv";

import dbcon from "./db/Db.js"


dotenv.config({ path: '.env' })
dbcon();

/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.log("Express app didn't reponse to database", error);
            throw err
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listing on ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("DB ERROR", (error))
        throw err
    }
})()
*/
import dotenv from "dotenv";
import app from './app.js';
import dbcon from "./db/Db.js"

dotenv.config({ path: './.env' })

dbcon()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`app listing pn ${process.env.PORT}`);
        })
    })


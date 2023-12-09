import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbcon = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`MongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Mongo DB connection FAILED:", error);
        process.exit(1);
    }
};

export default dbcon;

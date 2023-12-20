import { v2 as cloudinary } from "cloudinary";
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const uploadCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) return null

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: "auto"
        })

        // Files has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        //removes saved temporary file as the upload operation got failed
    }
}

export default uploadCloudinary;
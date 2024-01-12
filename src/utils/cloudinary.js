import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use fs/promises for promise-based file operations



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const uploadCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) {
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File is uploaded on Cloudinary:", response.url);

        return response;
    } catch (error) {
        // Handle the upload failure
        console.error("Error uploading file to Cloudinary:", error);

        // Remove the saved temporary file as the upload operation failed
        await fs.unlink(localFilePath);
        console.log("Temporary file removed:", localFilePath);

        throw error; // Re-throw the error for further handling, if needed
    }
};

export default uploadCloudinary;

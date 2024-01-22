import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use fs/promises for promise-based file operations


cloudinary.config({
    cloud_name: 'dts7dm26a',
    api_key: '388286357187584',
    api_secret: "g1mx_tdwB9FF3sf0U03N_NtzjUk"
});

const uploadOnCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) {
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        // console.log("File is uploaded on Cloudinary:", response.url);
        fs.unlink(localFilePath);
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

export  {uploadOnCloudinary};

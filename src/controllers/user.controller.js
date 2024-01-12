import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import User from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (request, response) => {
    const { fullname, username, email, password } = request.body;

    // Validation for empty fields
    if ([email, fullname, password, username].some((field) => !field || field.trim() === "")) {
        throw new ApiErrors(400, "All fields are required");
    }

    // Check if user already exists using email or username
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new ApiErrors(409, "User with username or email already exists");
    }

    // Store avatar and cover image in Cloudinary
    const avatarLocalPath = request.files?.avatar[0]?.path;
    const coverImageLocalPath = request.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiErrors(400, "Avatar file required");
    }

    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiErrors(400, "Avatar file required");
    }

    // Create user object in the database
    const newUser = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    // Don't show password and tokens
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiErrors(500, "Something went wrong while registering the user");
    }

    return response.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };

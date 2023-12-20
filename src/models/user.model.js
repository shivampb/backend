import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,

    },
    fullname: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    avatar: {
        type: String, // cloud base
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.OjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [truew, "paassword is required"],
    },
    refreshToken: {
        type: String,
    }

},
    {
        timestamps: true
    })

userSchema.pre("save", async function (next) {
    if (!this.isMofified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (EnterPassword) {
    return bcrypt.compare(EnterPassword, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFESH_TOKEN_EXPIRY
        })
}

const User = mongoose.model("User", userSchema);

export default User;
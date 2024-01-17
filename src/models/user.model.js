import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Video } from "./video.model.js"

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String, // cloudinary url
            required : true,
        },
        coverImage : {
            type : String, 
        },
        watchHistory : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        password : {
            type : String,
            required : [true, "Password is required"]
        },
        refreshToken : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

userSchema.pre("save", async function(next){ 
    // encrypting the password before saving if we have first created the password or updated the password!
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User',userSchema)
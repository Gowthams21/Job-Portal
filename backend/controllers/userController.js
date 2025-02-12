import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import User from '../models/userSchema.js';
import {sendToken} from '../utils/jwtTokens.js';
import ErrorHandler from '../middlewares/error.js';




export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !phone || !role || !password) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const isEmail = await User.findOne({ email });

    if (isEmail) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    const user = await User.create({ name, email, phone, role, password });
    sendToken(user, 200, res, "User Registered successfully");
});

export const login=catchAsyncError(async(req,res,next)=>{
    const {email, password,role } = req.body;

    if(!email || !password || !role) {
        return next(new ErrorHandler("All fields are required", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        new ErrorHandler("Invalid Email or Password", 400);
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password", 400));
    }
    if(user.role !== role){
        return next(new ErrorHandler("Invalid Role", 400));
    }
    sendToken(user, 200, res, "User Loggedd in successfully");
})


export const logout = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return next(new ErrorHandler("No token found. User is already logged out.", 400));
    }
    res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({ success: true, message: "User Logged Out Successfully" });
});


export const getUser= catchAsyncError(async (req, res,next)=>{
    const user = req.user;
    res.status(200).json({ success: true, user });
})
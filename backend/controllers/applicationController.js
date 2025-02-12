import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import { Job } from "../models/jobSchema.js";
export const employerGetAllApplications=catchAsyncError(async(req,res,next) =>{
    const {role}=req.user;
    if(role==="Job Seeker"){
        return next(new ErrorHandler("Unauthorized Access", 400));
    }

    const {_id} = req.user;
    const applications = await Application.find({ 'employerID.user': _id });
    res.status(200).json({ success: true, data: applications });
});

export const jobseekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Admin") {
        return next(new ErrorHandler("Unauthorized Access - No Admin", 403));
    }

    const { _id } = req.user;
    const applications = await Application.find({ 'applicantID.user': _id });
    res.status(200).json({ success: true, data: applications });
});


export const jobseekerDeleteApplication =catchAsyncError(async(req,res,next) =>{
    const { role } = req.user;
    if(role==="Admin"){
        return next(new ErrorHandler("Unauthorized Access - Admin", 403));
    }
    
    const { id } = req.params;   
    const application = await Application.findByIdAndDelete(id);
    if(!application){
        return next(new ErrorHandler("Oops,Application not found", 404));
    }
    await application.deleteOne();
    res.status(200).json({ success: true,message:"Application Deleted Sucessfully"});
});

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Admin") {
        return next(new ErrorHandler("Unauthorized Access - You're Admin", 403));
    }
    let resumeData = null;
    if (req.files && req.files.resume) {
        const { resume } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
        if (!allowedFormats.includes(resume.mimetype)) {
            return next(new ErrorHandler("Invalid file format. Only PNG, JPEG, WEBP, and JPG are allowed", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
            resume.tempFilePath,
        );
        console.log(cloudinaryResponse);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error: ", cloudinaryResponse.error || "Unknown Cloudinary Error");
            return next(new ErrorHandler("Failed to upload resume", 500));
        }

        resumeData = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job Seeker"
    };

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
        return next(new ErrorHandler("Job Not Found", 404));
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
        return next(new ErrorHandler("Job Not Found", 404));
    }

    const employerID = {
        user: jobDetails.postedBy,
        role: "Admin"
    };

    if (!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID) {
        return next(new ErrorHandler("Fill All Fields", 400));
    }

    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        resume: resumeData,
        applicantID,
        employerID,
    });

    res.status(200).json({
        success: true,
        message: "Application submitted successfully",
        data: application,
    });
});

//
import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';

import { Job } from '../models/jobSchema.js';

export const getAllJobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find(); 
    res.status(200).json({ success: true, jobs });
});


export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Only admin can post job", 400));
    }
    const { title, description, category, country, city, location, salary, jobPostedOn } = req.body;
    if (!title || !description || !category || !country || !city || !location || !salary) {
        return next(new ErrorHandler("All fields are required", 400));
    }
    const postedBy = req.user._id;
    const job = await Job.create({ title, description, category, country, city, location, salary, jobPostedOn, postedBy });
    res.status(200).json({ success: true, message: "Job Posted Successfully", job });
});

export const getmyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if(role === "Job Seeker") {
        return next(new ErrorHandler("Only admin can post job",400));
    }
    const myjobs=await Job.find({postedBy: req.user._id});
    res.status(200).json({ success: true, myjobs });
});


export const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if(role === "Job Seeker") {
        return next(new ErrorHandler("Only admin can update job",400));
    }
    const {id}=req.params;
    let job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("oops, Job not found",400));
    }
    job=await Job.findByIdAndUpdate(id,req.body,{new:true,
        runValidators:true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Job updated successfully",
        job,
    })
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if(role === "Job Seeker") {
        return next(new ErrorHandler("Only admin can delete job",400));
    }
    const { id}=req.params;
    let job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("oops, Job not found",400));
    }
    await Job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted successfully",
    })
}
);


export const getSinglejob = catchAsyncError(async (req, res, next)=>{
    const { id } = req.params;
    
    try{
        const job=await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not found",404));
        }
        res.status(200).json({ success: true, job });
    } catch(error){
        return next(new ErrorHandler(error.message,500));
    }
})
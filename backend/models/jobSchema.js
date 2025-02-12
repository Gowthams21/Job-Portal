import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        minlength:10,
        maxlength:1000
    },
    category:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    },
    jobPostedOn:{
        type: Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId
    },
});

export const Job = mongoose.model("Job", jobSchema);
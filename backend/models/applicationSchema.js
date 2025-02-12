import mongoose from "mongoose";
import validator from "validator";



const applicationSchema=new mongoose.Schema({
    name: {
        type: String,
        ref: "User",
        required: true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Invalid email address"]
    },
    phone: {
        type: Number,
        required: true
    },
    coverLetter:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    resume:{
        public_id:{
            type: String,
            required: false
        },
        url:{
            type: String,
            required: false
        }
    },
    applicantID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type: String,
            enum: ["Admin"],
            required: true
        }
    }
     
});

export const Application = mongoose.model("Application", applicationSchema);
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: [validator.isEmail, "Invalid email format"]
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select: true
    },
    role:{
        type: String,
        enum: ["Job Seeker", "Admin"],
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// COMPARE

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};



//GENERATING A JWT TOKEN - AUTH

userSchema.methods.getJWTToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE});
};
export default mongoose.model("User", userSchema);


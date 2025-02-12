import mongoose from 'mongoose';


const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "Job_Project"
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(`Error connecting to MongoDB: ${err}`);
    })
}


export default dbConnection;
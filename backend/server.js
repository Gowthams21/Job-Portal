import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser';
import app from './app.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});

app.use(cors({
    origin: ["http://localhost:5173"], // Correct frontend URL
    credentials: true
}));

app.options('*', cors());

  
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import {getAllJobs,postJob,getmyJobs,deleteJob, updateJob, getSinglejob} from '../controllers/jobController.js';
import {isAuthorized} from '../middlewares/auth.js'
const router= express.Router();

router.get("/getall",getAllJobs);
router.post("/post",isAuthorized,postJob);
router.get("/getmyjob",isAuthorized,getmyJobs);
router.put("/update/:id",isAuthorized,updateJob);
router.delete("/delete/:id",isAuthorized,deleteJob);
router.delete("/:id",isAuthorized,getSinglejob);


export default router;
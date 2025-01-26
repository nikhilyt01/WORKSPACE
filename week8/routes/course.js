//const router=express.Router
const {Router}= require("express");
const courserouter = Router();
const {courseModel} =require("../db");
const {purchaseModel } =require("../db");
const {usermiddleware}=require("../middlewares/user")


///api/v1/course
courserouter.post("/purchases",usermiddleware,async function(req,res){
    const userId = req.userid;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })
    
    res.json({
        msg:"you have successfully bought the course"
    })
})
courserouter.get("/preview",async function(req,res){
    const courses= await courseModel.find({}) //empty means it gives all courses
    res.json({
        courses
    })
})


module.exports={
    courserouter:courserouter
}
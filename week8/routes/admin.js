const { Router } = require("express");
const adminrouter =Router();

const {adminModel, courseModel} =require("../db");
const jwt= require("jsonwebtoken");
const { JWT_ADMINPASS } =require("../config");
const {adminmiddleware}=require("../middlewares/admin");
const course = require("./course");
require('dotenv').config();

adminrouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname} = req.body;//to add zod 
    //to add :hash pass so plaintext is not stored in db 
    
    
    await adminModel.create({
         email:email,
         password:password,
         firstname:firstname,
         lastname:lastname
    })
   
     res.json({
        msg:"signup succeced"
     })
        
})
adminrouter.post("/signin",async function(req,res){
    const {email,password} = req.body;
    const admin= await adminModel.findOne({
        email:email,
        password:password
    })
    if(admin){
        //console.log(JWT_ADMINPASS)
        const token=jwt.sign({
            id:admin._id 
        },JWT_ADMINPASS)
        res.json({
            token:token
        })
    }
    //also do cookies logic
    
    else{
        res.status(403).json({
            msg:"incorrect creds"
        })
    }
})
adminrouter.post("/course",adminmiddleware,async function(req,res){
    const adminid=req.userid
    const {title,description,imageURL,price}=req.body;
    const course = await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageURL:imageURL,
        creatorId:adminid
    })
    res.json({
        msg:"course created",
        courseId:course._id
    })

})
//api/v1/admin
adminrouter.put("/course",adminmiddleware,async function(req,res){
    const adminId = req.userid;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
     console.log({courseId,adminId}) 
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })
    if(course.modifiedCount > 0){
        res.json({
            message: "Course updated",
            courseId: course._id
        })

    }
    else{
        res.status(400).json({
            msg:"course not found & no changes done"
        })
    }

    
})
// koi particular creator ka kitna material  hai
adminrouter.get("/course/bulk",adminmiddleware,async function(req,res){
    const adminid= req.userid;
    const courses = await courseModel.find({  // it will find all course not 1
        creatorId:adminid
    });
    res.json({
        courses:courses
    })

    
})
module.exports={
    adminrouter:adminrouter
}
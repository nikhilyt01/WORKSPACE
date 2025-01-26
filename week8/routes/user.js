const{Router}=require("express");
const userrouter=Router();
const {userModel} = require("../db");
const jwt= require("jsonwebtoken");
const { JWT_USERPASS } =require("../config");
const {usermiddleware}=require("../middlewares/user");
const {purchaseModel } =require("../db");
const {courseModel} =require("../db");


//api/v1/user
userrouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname} = req.body;//to add zod 
    //to add :hash pass so plaintext is not stored in db 
    
    
    await userModel.create({
         email:email,
         password:password,
         firstname:firstname,
         lastname:lastname
    })
   
     res.json({
        msg:"signup succeced"
     })
        
   
})
userrouter.post("/signin",async function(req,res){
    const {email,password} = req.body;
    const user=await userModel.findOne({  // if .find --> [] 
        email:email,
        password:password
    })
    if(user){
        const token=jwt.sign({
            id:user._id
        },JWT_USERPASS)
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
userrouter.get("/purchases",usermiddleware,async function(req,res){
    const userId = req.userid;
    
    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })   
   
})

module.exports={
    userrouter:userrouter
}

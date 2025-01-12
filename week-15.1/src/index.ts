import express from "express";
import mongoose from "mongoose" ; 
import jwt from "jsonwebtoken"
import { usermodel } from "./db";
import { contentmodel } from "./db";
import { JWT_SCERET } from "./config";
import { userMiddleware } from "./middleware";



const app=express()
app.use(express.json());

app.post("/api/v1/signup",async (req,res) => {
    //todo zod /// hash pasword
    const username = req.body.username;
    const password = req.body.password;
   try{
     await usermodel.create({
        username:username,
        password:password
     })
     res.json({
        msg:"you are singedup"
     })
    }catch(e) {
        res.status(411).json({
            msg:"user aldreay exists"
        })
    }

})

app.post("/api/v1/signin",async (req,res) => {
    const username =req.body.username;
    const password = req.body.password;
    const existinguser= await usermodel.findOne({
        username,
        password
    })
    if(existinguser){
        const token=jwt.sign({
            id:existinguser._id
        },JWT_SCERET)

        res.json({
            token
        })
    }
    else{
        res.status(403).json({msg:"wrong credential"})
    }
  

})

app.post("/api/v1/brain/share",(req,res) => {

})

app.post("/api/v1/content",userMiddleware,async (req,res) => {
    const link=req.body.link;
    const type=req.body.type;
    await contentmodel.create({
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })
    res.json({
        msg:"content added"
    })
})

app.get("/api/v1/content",userMiddleware,async (req,res) => {
    //@ts-ignore
    const userId=req.userId;
    const content= await contentmodel.find({
        userId:userId
    }).populate("userId","username")
    res.json({content})


})
app.get("/api/v1/brain/:sharelink",(req,res)=>{

})

app.listen(3000);

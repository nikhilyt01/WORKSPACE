import express from "express";
import mongoose from "mongoose" ; 
import jwt from "jsonwebtoken"
import { usermodel } from "./db";
import { contentmodel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { linkmodel } from "./db";
import {random} from "./utils"
import { userInfo } from "os";


declare global {
    namespace Express {
        interface Request {
            userId?:string;
        }
    }
}

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
        },JWT_SECRET)

        res.json({
            token
        })
    }
    else{
        res.status(403).json({msg:"wrong credential"})
    }
  

})

app.post("/api/v1/content",userMiddleware,async (req,res) => {
    const link=req.body.link;
    const type=req.body.type;
    await contentmodel.create({
        link,
        type,
        userId:req.userId,
        tags:[]
    })
    res.json({
        msg:"content added"
    })
})

app.get("/api/v1/content",userMiddleware,async (req,res) => {
    const userId=req.userId;
    const content= await contentmodel.find({
        userId:userId
    }).populate("userId","username")
    res.json({content})


})
app.delete("/api/v1/content",userMiddleware,async (req,res) => {
     await contentmodel.deleteMany({
        userId:req.userId
     })
     res.json({ msg:"contents deleted"})
 
})

app.post("/api/v1/brain/share",userMiddleware,async(req,res) => {
    const Share= req.body.share; // true or false
    if(Share){
      
      const existinguser= await linkmodel.findOne({
        userId:req.userId
      })
      if(existinguser){
        res.json({
            hash:existinguser.hash
        }) 
        
        return ;
      }
      const hash= random(10);
      await linkmodel.create({
        userId:req.userId,
        hash:hash
      })
      res.json({ hash})
    }
   

})

app.get("/api/v1/brain/:sharelink",userMiddleware, async (req,res)=>{
    const hash =req.params.sharelink;
    const link= await linkmodel.findOne({
        hash
    })
    if(!link){
        res.json({msg:"incorrect input"})
        return;
    }
    const content = await contentmodel.find({
        userId:link.userId
    })
    const user= await usermodel.findOne({
        _id:link.userId
    })
    if(!user) {
        res.status(411).json({
            msg:"user not found"
        })
        return ;
    }
    res.json({
       username:user.username,
       content:content
 })


})

app.listen(3000);

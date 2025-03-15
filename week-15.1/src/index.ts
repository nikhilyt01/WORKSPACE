import express from "express";
import mongoose from "mongoose" ; 
import jwt from "jsonwebtoken"
import { usermodel } from "./db";
import { contentmodel } from "./db";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { linkmodel } from "./db";
import {random} from "./utils"
import cors from "cors"
import {z} from "zod"
import bcrypt from 'bcrypt';
import {Request,Response} from "express";
import { mongooconnect } from "./db";


declare global {
    namespace Express {
        interface Request {
            userId?:string;
        }
    }
}

const requiredbody= z.object({
    username : z.string().min(1,{message:"username required"}),
   
    password: z.string().min(8,{message:"password must be of 8 character "}),
  
    
})
type signuprequest= z.infer<typeof requiredbody >
type fun = Promise<any>

const app=express()
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup",async (req,res) => {
    //todo zod /// hash pasword
    const {username,password} :signuprequest =req.body;
    const parseddatawithsuccess=  requiredbody.safeParse(req.body);
    if(!parseddatawithsuccess.success){
        res.json({
            message:"incorrect input",
            error:parseddatawithsuccess.error.errors
        })
        return;
    }

    
   try{
    
    const hashedpass = await bcrypt.hash(password,5);  //
     await usermodel.create({
        username:username,
        password:hashedpass
     })
     res.json({
        message:"you are singedup"
     })
    }catch(e) {
        res.status(411).json({
            message:"user aldreay exists"
        })
       
    }

})

app.post("/api/v1/signin",async (req,res):fun => {
   
  
    const {username,password} :signuprequest =req.body;
    try{
    const existinguser= await usermodel.findOne({
        username,
        
    })
    if(!existinguser){
       return res.status(403).json({message:"plzz signup first"})
       
    }
    
    const ismatch= await bcrypt.compare(password,existinguser.password!);  // ! means not nulli.e password exist
    if(!ismatch){
        res.json({
            message:"wrong credential"
        })
    }
    if(existinguser){
        const token=jwt.sign({
            id:existinguser._id
        },JWT_SECRET,{expiresIn:"7h"})

      return  res.json({
          message:"Signin successful",
            token
        })
    }
}catch(e:any){
    return res.json({message:"some error occured",error:e.message})
}
  

})

app.post("/api/v1/content",userMiddleware,async (req,res):fun => {
    const link=req.body.link;
    const type=req.body.type;
    const title=req.body.title;
    const tags =req.body.type
    if(!link || !title || !type) {
        return res.json({message:"input field required :link ,title, type"})
  

    }
    // if ( !Array.isArray(tags) || tags.some(tag => {typeof tag!=="string"})   ){         // when we use tags as array
    //     return res.json({message:"tags must be array of string"})
    
    //    }
    await contentmodel.create({
        link,
        type,
        title,
        userId:req.userId,
        tags:[]
    })
    res.json({
        msg:"content added"
    })
})

app.get("/api/v1/content",userMiddleware,async (req,res):fun => {
    const userId=req.userId;

    try{
    const content= await contentmodel.find({
        userId:userId
    }).populate("userId","username")          // populate is property of mongoose for relation to jisko refernece hai usko de or khali username
    res.json({content})
    }catch(e:any){
        res.json({message:"internal error occured",error:e.message})
    }

})
app.get("/api/v1/content/:contents",userMiddleware,async (req:Request,res:Response):fun =>{
    const filter =req.params.contents;
    const userId=req.userId;

    // console.log("filter received",filter);
    const Filtermap: Record<string, string | string[] > = {
        "Youtube":"youtube",
        'Tweets': 'twitter',
        'Documents': 'Document',
        'Website': 'Links',
        'Links': ['Links', 'Website'],
    }
    const type = filter == "all" ? "" :Filtermap[filter] ;
    try{
        let query: Record <string,unknown > ;
        if(!type && filter!="all"){
            return res.json({message:"invalid filter type"})
        }
        if(type){
            //  console.log("mapped type is:",type)
            query=Array.isArray(type) ? {type : {$in:type},userId} : {type,userId}


        }
        else{
            query ={userId}

        }
        // console.log("D.B query is ",query)

       const content= await contentmodel.find(query)
        res.json({message:"content loaded ",content})
    }catch(e){
        return res.json({message:"some thing went wrong ",error:e})
    }


})
app.delete("/api/v1/content",userMiddleware,async (req:Request,res:Response):fun => {
    const {contentId} =req.body;
    if(!contentId){
        res.json({message:"content id is required"})
    }

    try{
      const result=await contentmodel.deleteOne({
         userId:req.userId,
         _id : contentId
      })
      if(!result.deletedCount){                         // deletedCount tells how many content deleted so if 0
        return res.json({message:"content not found or unauthorised"})
      }
     return  res.json({ message:"contents deleted"})
    }catch(e:any){
        res.json({message:"internal error occured",error:e.message})
    }
 
})

app.post("/api/v1/brain/share",userMiddleware,async(req:Request,res:Response):fun => {
    const Share= req.body.share; // true or false
    try{
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
}catch(e){
    return res.json({message:"some error occured",error:e})
}
   

})

app.get("/api/v1/brain/:sharelink", async (req:Request,res:Response):fun =>{
    const hash =req.params.sharelink;
    const link= await linkmodel.findOne({
        hash
    })
    try{
    if(!link){
        res.status(404).json({message:"share link error"})
        return;
    }
    const content = await contentmodel.find({
        userId:link.userId
    })                                         //.populate("userId","username") can also be done as userId refs to user table
    const user= await usermodel.findOne({
        _id:link.userId
    })
    if(!user) {  //usually donon't happen just done to assure T.S
        res.status(411).json({
            message:"user not found"
        })
        return ;
    }
    res.json({
       username:user.username,
       content:content
 })
    } catch(e){
        return res.json({message:"some error occured",error:e})
    }

})

const startserver = async() =>{
    try{
    await mongooconnect();
    app.listen(3000,()=>{console.log("server is running")})
    }catch(e){
        console.error("failed to start server",e)
    }
}
startserver();


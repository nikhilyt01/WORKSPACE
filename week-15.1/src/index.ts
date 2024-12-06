import express from "express";
import mongoose from "mongoose" ; 
import jwt from "jsonwebtoken"
import { usermodel } from "./db";

const app=express()
app.use(express.json());

app.post("/api/v1/signup",async (req,res) => {
    //todo zod
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

app.post("api/v1/signin",(req,res) => {

})

app.post("api/v1/brain/share",(req,res) => {

})

app.post("api/v1/content",(req,res) => {

})

app.get("api/v1/content",(req,res) => {

})

app.listen(3000);

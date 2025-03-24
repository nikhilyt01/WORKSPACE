import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET}  from "@repo/backend-common/config"
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types";

const app = express();

app.post("/signup",(req,res) => {

     const data = CreateUserSchema.safeParse(req.body);
     if(!data.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }

})

app.post("/signin",(req,res)=>{
     const  userId=1;
     const token = jwt.sign({userId},JWT_SECRET)
})

app.post("/room",middleware,(req,res)=>{
     //some db call
     res.json({
          roomId:123
     })

})

app.listen(3001);

import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET}  from "@repo/backend-common/config"
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client";
const app = express();

app.post("/signup",async (req,res) => {

     const parseddata = CreateUserSchema.safeParse(req.body);
     if(!parseddata.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }
     try{
     await prismaClient.user.create({
          data:{
               email:parseddata.data.username,
               password:parseddata.data.password,
               name:parseddata.data.name

          }
          
     }  )
     res.json({message:"123"})
}catch(e){
     res.status(411).json({
          message:"username already exits"
     })
}

})

app.post("/signin",(req,res)=>{
     const data = CreateUserSchema.safeParse(req.body);
     if(!data.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }

     const  userId=1;
     const token = jwt.sign({userId},JWT_SECRET)

     res.json({token})
})

app.post("/room",middleware,(req,res)=>{
     const data = CreateUserSchema.safeParse(req.body);
     if(!data.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }
     //some db call
     res.json({
          roomId:123
     })

})

app.listen(3001);
 
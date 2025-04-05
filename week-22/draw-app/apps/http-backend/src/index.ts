import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET}  from "@repo/backend-common/config"
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client";
const app = express();
app.use(express.json());

declare global {
     namespace Express{
          interface Request{
               userId?: string
          }
     }
}

app.post("/signup",async (req,res) => {

     const parseddata = CreateUserSchema.safeParse(req.body);
     if(!parseddata.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }
     try{
          //todo hash pass using bcrypt
     const user = await prismaClient.user.create({
          data:{
               email:parseddata.data.username,
               password:parseddata.data.password,
               name:parseddata.data.name

          }
          
     }  )
     res.json({userId:user.id})
}catch(e){
     res.status(411).json({
          message:"username already exits"
     })
}

})

app.post("/signin",async (req,res)=>{
     const data = SigninSchema.safeParse(req.body);
     if(!data.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }
 // todo cmmr hased pass using bcrypt only
 const user = await prismaClient.user.findFirst({
     where:{
          email:data.data.username,
          password:data.data.password
     }
 })

 if(!user){
     res.json({
          message:"Not Authorized !"
     })
     return;
 }
     const  userId=1;
     const token = jwt.sign({
          userId:user?.id
     },JWT_SECRET)

     res.json({token})
})

app.post("/room",middleware,async(req,res)=>{
     const data = CreateRoomSchema.safeParse(req.body);
     if(!data.success){
         res.json({
               message : "Incorrect Inputs"
          })
          return ;
     }
     //some db call
     const userId=req.userId;
     if(!userId){  
          return;
     }
try{
     const room=await prismaClient.room.create({
          data:{                                     //Type '{ slug: string; adminId: string | undefined; }' is not assignable to type'(Without<RoomCreateInput ...
               slug:data.data.name,
               adminId:userId 
          }
     })

     res.json({
          roomId:room.id
     })
}catch(e){
     res.status(411).json({              // error hoga only when slug is deplicate bcoz we have set it to unique
          message:"Room alredy exists with same name"
     })
}

})

app.get("/room/:roomId",async (req,res)=>{              // to load last 50 chats of room 
     const roomId=Number(req.params.roomId);
     const message=await prismaClient.chat.findFirst({
          where:{
               roomId:roomId
          },
          orderBy:{
               id:"desc"
          },
          take:50
     })
     res.json({
          message
     })
})

app.get("/room/:slug",async (req,res)=>{
     const slug=req.params.slug;
     const room=await prismaClient.room.findFirst({
          where:{
               slug
          }
     })
     res.json({
          room
     })
})

app.listen(3001);
 
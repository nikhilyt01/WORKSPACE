import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET}  from "@repo/backend-common/config"
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client";
import cors from "cors";
import { Request,Response,NextFunction } from "express";
import bcrypt from "bcrypt"

const app = express();
app.use(express.json());
app.use(cors())

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
             const hashedPass=await bcrypt.hash(parseddata.data.password,5);
     const user = await prismaClient.user.create({
          data:{
               email:parseddata.data.username,
               password:hashedPass,
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
         res.status(404).json({                  //specifying status code helps in differn. Toast notificn.
               message : "Incorrect Inputs",
               error:data.error.errors
          })
          return ;
     }

 // todo cmmr hased pass using bcrypt only
 try{
 const user = await prismaClient.user.findFirst({
     where:{
          email:data.data.username
          //password:data.data.password
     }
 })


 if(!user){
     res.status(401).json({                    //status code for error Toast
          message:"Plzz Signup First"
     })
     return;
 }
 const ismatch= await bcrypt.compare(data.data.password,user.password!);
 if(!ismatch){
     res.status(401).json({message:"Wrong credential"})
     return;
 }
     // this part is for if user exists
     const token = jwt.sign({
          userId:user?.id,
     },JWT_SECRET,{ expiresIn: '8h' })

     res.json({token,message:"SignIn successful"})    // added message field for dynamic handling to show in toast

 }catch(e){
     res.json({message:"something went wrong either db or else"})
 }

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
          message:"Room created successfully",
          room:room                          // whole room details to show on frontend
     })
}catch(e){
     res.status(411).json({              // error hoga only when slug is deplicate bcoz we have set it to unique
          message:"Room alredy exists with same name"
     })
}

})

app.delete("/room/:id",middleware,async(req:Request,res:Response):Promise<void> =>{
     const id=Number(req.params.id);
     const userId=req.userId;
     try{
          const room= await prismaClient.room.findUnique({
               where:{id:id},
          });
          if(!room){
                res.status(404).json({message:"Room not Found"});
                return;
          }

          if(room.adminId !== userId){   // agar user admin nhi h room ka
                res.json({message:"UnAuthorized"})
          }

          await prismaClient.room.delete({
               where:{id:id},
          })
          res.status(200).json({message:"Room Deleted"});

     }catch(e){
          console.error("Error deleting room:", e);
          res.status(500).json({ message: "Internal server error" });
     }
     
     

})

app.get("/user",middleware,async(req:Request,res:Response):Promise<void> =>{   // endpoint to Fetch user's all Room
     const userid=req.userId;
try{
     const room= await prismaClient.room.findMany({
          where:{adminId:userid},
          orderBy:{
               createdat:"desc"
          }
     })
     if(!room){
          res.json({message:"No Rooms Found"})
     }
     res.status(200).json({room})
}catch(e){
     console.error("Error fetching rooms:", e);
    res.status(500).json({ message: "Internal server error" });

}

})


app.get("/chats/:roomId",async (req,res)=>{              // to load last 50 chats of room 
     try{
          const roomId=Number(req.params.roomId);
          const message=await prismaClient.chat.findMany({
               where:{
                    roomId:roomId
               },
               orderBy:{
                    id:"desc"
               },
               take:100
          })
          res.json({
               message
          })

     }catch(e){
          res.json({message:[]})
     }
    
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

app.get("/rooms/:id",middleware, async (req: Request, res: Response) => {     //  this was not working probaably due to prisma schema 
     const id = Number(req.params.id);
     const userId=req.userId;
   
     try {
       const roomexists = await prismaClient.room.findUnique({
         where: { id,adminId:userId },
       });
   
       if (!roomexists) {
        // console.log("No room found with ID", id);
       } else {
        // console.log("Room found:", roomexists);
       }
   
       res.status(200).json({ room: roomexists });  // it will either return room:null ya fir room:details  we require null also
     } catch (e) {
       console.error("Error validating room", e);
       res.status(500).json({ message: "Failed to validate room" });
     }
   });
   
app.get("/test-room/:id",middleware,async (req, res) => {
       const userId=req.userId;
   try{
       if(isNaN(Number(req.params.id)) || !userId ){
          res.status(404).json({message:"Invalid roomId or failed to authenticate"});
          return;
       }
                                                              // raw query return [] even if not found so it was messing things up
     const room = await prismaClient.$queryRaw`                 
       SELECT * FROM "Room" WHERE id = ${Number(req.params.id)}
      AND "adminId"=${userId}`;
      if(!room){
          res.status(404).json({error:"Room Not Found"})
      }
      res.status(200).json({room});
     }catch(e){
          res.status(500).json({error:"Internal D.B error!"})
     }
   });

app.delete("/delchats/:roomId",middleware,async(req,res)=>{
     const roomId=Number(req.params.roomId);
     const userId=req.userId;

     try{
         const clear= await prismaClient.chat.deleteMany({
          where:{
               roomId,
               userId
          }
         })
         res.json({message:"Cleared all "})
     }catch{
           res.status(400).json({message:"failed to clear"})
     }
})
   

app.listen(3001);

import express from "express";
import { Request,response } from "express";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types";
import jwt from "jsonwebtoken";;
import {JWT_SECRET} from "@repo/back-common/config";
import bcrypt from "bcrypt";
import {prismaClient} from "@repo/db/client"
import { middleware } from "./middleware";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

declare global{
    namespace Express{
        interface Request{
            userId ?:string
        }
    }
}

app.post("/signup",async(req,res)=>{
    const ParsedData = CreateUserSchema.safeParse(req.body);
    if(!ParsedData.success){
        res.status(401).json({
            message:"Incorrect Inputs!"
        });
        return;
    } 

    try{
        const hashedpass= await bcrypt.hash(ParsedData.data.password,10)
        const user =await prismaClient.user.create({
            data:{
                email:ParsedData.data.username,
                password:hashedpass,
                name:ParsedData.data.name
            }
        })
        res.status(200).json({message:"Signup Success",UserId:user.id})

    }catch(e){
          res.status(401).json({message:"Username Already exists !"})
    }
    

})
app.post("/signin",async(req,res)=>{
     const ParsedData = SigninSchema.safeParse(req.body);

     if(!ParsedData.success){
        res.status(401).json({
            message:"Incorrect Inputs !",
            error:ParsedData.error.errors
        });
        return;
     }
try{
     const user = await prismaClient.user.findFirst({
         where:{ email:ParsedData.data.username}
     })
     if(!user){
        res.status(401).json({
            message:"Signup First ",
        });
        return;
     }

     const PassMatch = await bcrypt.compare(ParsedData.data.password,user.password!);
     if(!PassMatch){
        res.status(404).json({message:"Wrong Credential !"})
     }
     const token = jwt.sign({
        userId:user?.id
     },JWT_SECRET,{expiresIn:"7h"})

     res.status(200).json({
        message:"Signin Success !",
        token:token
    })
}catch{
    res.status(404).json({message:"some internal error occured either in DB or something"})
}

})
//creation of room endpoint 
app.post("/room",middleware,async(req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(401).json({message:"Incorrecr Inputs!"})
        return;
    }

   const userId=req.userId
   if(!userId){
    return;
   }
try{
  const room= await prismaClient.room.create({
    data:{
        slug:data.data.name,
        adminId:userId
    }
   })
   res.status(200).json({
        message:"Room Created !",
        room:room
   })
}catch{
   res.status(400).json({message:"Room with This name already Exists"})
}
})

app.delete("/room/:id",middleware,async(req,res)=>{
    const id = Number(req.params.id) ;
    const userId=req.userId;

    try{
        const room = await prismaClient.room.findUnique({
            where:{id:id}
        })
        if(!room){
            res.status(401).json({message:"Room does not exists !"});
            return;
        }
        if(room.adminId != userId){   // agar admin nhi h wo room ka
            res.status(401).json({message:"UnAuthorized To delete"})
        }

        await prismaClient.room.delete({
            where:{id:id,adminId:userId}
        })

        res.status(200).json({message:"Room Deletion Success !"})
    }catch{
        res.status(500).json({message:"Failed To delete Room,Internal server error"})
    }
})
// to get all available room of User
app.get("/user",middleware,async(req,res)=>{
    const userId = req.userId;

    try{
        const room = await prismaClient.room.findMany({
            where:{adminId:userId},
             orderBy:{
               createdat:"desc"
          }
        })
        if(!room){
            res.status(401).json({message:"No Room Found !"})
        }
        res.status(200).json({room:room})

    }catch{
        res.status(500).json({message:"Internal Error"})
    }

})

app.get("/chat/:roomId",async(req,res)=>{
    const roomId= Number(req.params.roomId)
    const userId=req.userId;

    try{
        const message= await prismaClient.chat.findMany({
            where:{
                roomId:roomId
            },
            orderBy:{
                id:"desc"
            },
            take:100
        })
        res.json({message})
    }catch{
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

app.get("/rooms/:id",middleware, async (req, res) => {     //  this was not working probaably due to prisma schema 
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
//end point to delete all chats or shapes of Room
   app.delete("/delchats/:roomId",middleware,async(req,res)=>{
     const roomId=Number(req.params.roomId);
     const userId=req.userId;

     try{
         const clear= await prismaClient.chat.deleteMany({
          where:{
               roomId
             //  userId   bcoz room me koi bhi user ho pura del krske middleware is just for authetication 
          }
         })
         res.json({message:"Cleared all "})
     }catch{
           res.status(400).json({message:"failed to clear"})
     }
})

app.listen(3001);

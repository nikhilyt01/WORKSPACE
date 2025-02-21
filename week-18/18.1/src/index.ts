import express from "express";
import { PrismaClient } from "@prisma/client";

const client =new PrismaClient();
const app = express()

app.get("/users", async(req,res) =>{
    const user =await client.user.findMany();
    res.json({user})
})

app.get("/todos/:id",async(req,res)=>{
    const id=req.params.id;   // prisma takes params as string so used parseInt
    const users =await client.user.findFirst({
        where:{
            id:parseInt(id)
        },
        select:{
            todos:true
        }
    })
    res.json({users})
})

app.listen(3000);

//to create 
// await  client.user.create({
//     data:{
//         username:"nikhil",
//         password:"12332",
//         age:21,
//         city:"aligarh"

//     }
// })

//select:{       this will only give username but include will include relationship field
//    username:true}
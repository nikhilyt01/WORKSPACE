import express  from "express";
import {prismaClient} from "db/client"

const app =express();
app.use(express.json());

app.get("/users",(req,res)=>{
    prismaClient.user.findMany().then((users)=>{
        res.json(users);
    }).catch((error)=>{
        res.status(500).json({error:"Internal Server Error"});
    });
})

app.post("user",(req,res)=>{
    const {username,password}=req.body;

    if(!username || !password){
        return res.status(400).json({error:"Username and password are required"});
    }

    prismaClient.user.create({
        data:{
            username,
            password
        }
    }).then((user)=>{
        res.status(201).json(user);
    }).catch((error)=>{
        res.status(500).json({error:"Internal Server Error"});
    });
})




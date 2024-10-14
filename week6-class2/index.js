const express=require("express");
const app =express();
const  jwt=require("jsonwebtoken");
const JWT_SCERET="randomisthisdsanotuourfuckousdng"

const users=[];

app.use(express.json());

app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
        
    });
    res.json({
        message:"signup done"
    })
})


app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    let founduser=null;

    for(let i=0;i<users.length;i++){
        if(users[i].username==username&&
            users[i].password==password){
                founduser=users[i];        
        }
    }
    if(founduser){
        const token=jwt.sign({username:username
        },JWT_SCERET);

        res.json({
            token:token
        })
    }
    else{
        res.json({
            message:"credential incorrect"
        })
    } 
})

app.get("/me",function(req,res){
    const token=req.headers.token;
    let founduser=null;
    const decodedinformation=jwt.verify(token,JWT_SCERET);//jwt.decode will is security vulnareable
    const username=decodedinformation.username

    for(let i=0;i<users.length;i++){
        if(users[i].username==username){
                founduser=users[i];        
        }
    }
    if(founduser){
        res.json({
            username:founduser.username,
            password:founduser.password
        })
    }
    else{
        res.json({
            message:"gaddari krta hai bisi"
        })
    }
   


})
app.listen(3000);
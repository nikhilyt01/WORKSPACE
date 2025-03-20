import express from "express";

const app = express() ;

app.post("/signup",(req,res)=>{
    res.send("hellow")
})
app.post("/signin",(req,res)=>{
    res.send("welcome")
})
app.post("/chat",(req,res)=>{
    res.send("helllow world")
})

app.listen(3000);
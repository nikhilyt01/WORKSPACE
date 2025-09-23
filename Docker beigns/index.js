const express =require("express")
const app=express()

app.get("/",(req,res)=>{
    res.send("hello world ,src code changed but build was not affected");
})

app.listen(3000);
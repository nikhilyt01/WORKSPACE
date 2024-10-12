// write html that hits the backend server  using fetch api
//npm install -g serve , then npx serve

const express=require( "express")
const app=express();
const cors=require("cors");

app.use(cors())
app.use(express.json())
app.post("/sum",function(req,res){
    const a=parseInt(req.body.a)
    const b=parseInt(req.body.b)
    res.json({
        ans: a+b
    })
})
app.listen(3000);

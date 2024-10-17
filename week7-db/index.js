const express=require("express");
const {usermodel,todomodel}=require('./db');
const jwt=require("jsonwebtoken");
const  mongoose  = require("mongoose");
const JWT_SCERTE="nikhilterabap";
const app=express();

mongoose.connect("mongodb+srv://nikhil0807yt:dh9nMvKGB8GQTtVv@cluster0.8onw4.mongodb.net/todo-app-database");
app.use(express.json());//bcoz parsing the body
app.post("/signup",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    await usermodel.create({
        email:email, //email:"nikkhil"
        password:password, // pass:"123"
        name:name
    })
    res.json({
        message:"you are signed up"
    });
   
});
app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user= await usermodel.findOne({
        email:email,
        password:password
    })
   
    if(user){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SCERTE);
        res.json({
           token:token
        });

    }
    else{
        res.status(403).json({
            msg:"incorrect message"
        })
    }


})

app.post("/todo",auth,async function(req,res){
    const userid=req.userid;
    const title=req.body.title;
    const done =req.body.done;
    await todomodel.create({
        userid,
        title,
        done

    });
    res.json({
        mes:"todo created"

    })

})

app.get("/todos",auth,async function(req,res){
    const userid=req.userid;
    const todos=await todomodel.find({
        userid:userid
    })
    res.json({
        todos:todos
    })
    
});
function auth(req,res,next){
    const token=req.headers.token;
    const decodedata=jwt.verify(token,JWT_SCERTE);
    if(decodedata){
        req.userid=decodedata.id;
        console.log(decodedata.id)
        next();
    }
    else{
        res.json({
            msg:"incorrect creds"
        })
    }
}

app.listen(3000);

const express=require("express");
const app =express();
const  jwt=require("jsonwebtoken");
const JWT_SCERET="randomisthisdsanotuourfuckousdng"

const users=[];

app.use(express.json());
function auth(req,res,next){
    const token=req.headers.token;
    const decodedinformation=jwt.verify(token,JWT_SCERET);
    if(decodedinformation.username){
        req.username=decodedinformation.username
        next();
    }
    else{
        res.json({
            message:"you are logged in"
        })
    }

}
function logger(req,res,next){
    console.log(req.method+"  method came");
    next();
}
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})

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
        const token=jwt.sign({username:founduser.username
        },JWT_SCERET);
        res.header("jwt",token);
        res.header("random","nikhil")

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

app.get("/me",auth,function(req,res){
    const currentuser=req.username
    let founduser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username==currentuser){
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
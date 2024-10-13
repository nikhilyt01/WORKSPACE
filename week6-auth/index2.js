/// using jwt

const express=require("express")
const app=express();
const JWT_SECRET="randomdutniksadilbjsadua"
const jwt=require("jsonwebtoken");
const users=[];

//shoul return random long string



app.use(express.json())  // allows to pass body of json type

app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.json({
        msg:"you are signin"
    })

})

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    let founduser=null;

 
    for(let i=0;i<users.length;i++){
        if(users[i].username==username&&users[i].password==password){
            founduser=users[i];
            
        }
    }

    if(founduser){
        const token=jwt.sign({
            username:username},
            JWT_SECRET);
       
       // founduser.token=token;    it is stateless token
        res.json({
            token:token
        })
    
    }
    else{
        res.status(403).send({
            message:"invalid username or password"
        })
    }
    
  
})
app.get("/me",function(req,res){
    const token=req.headers.token;  //now jwt token will be sent by user
    const decodedinformation=jwt.verify(token,JWT_SECRET); // it returns back the object that we encoded
    const username=decodedinformation.username



    let founduser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username==username){ // it checks decoded username matches
            founduser=users[i] ;       
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
                message:"invalid token"
            })
        }
    
    
    
})
app.listen(3000);
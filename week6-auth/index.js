const express=require("express")
const app=express();

const users=[];

//shoul return random long string
function generatetoken(){
    let options=['a','b','c','d','e','f','g','h','i','j','k','l','m'
        ,'n','A','B','C','D','F','G','H','I','J','K','L','M','N'];
        let token="";
        for(let i=0;i<26;i++){
            token =token + options[Math.floor(Math.random()*options.length)]
        }
        return token;
}


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

  /*cosnt user=users.find(function(u){
        if(u.username==username&&u.password==password){
        
            return true;
        }
        else {
            return false;
        } 

       }) */
    for(let i=0;i<users.length;i++){
        if(users[i].username==username&&users[i].password==password){
            founduser=users[i];
            
        }
    }

    if(founduser){
        const token=generatetoken();
        founduser.token=token;
        res.json({
            token:token
        })
    
    }
    else{
        res.status(403).send({
            message:"invalid username or password"
        })
    }
    
  console.log(users)
})
app.get("/me",function(req,res){
    const token=req.headers.token;
    let founduser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].token==token){
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
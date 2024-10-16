const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const { z }=require("zod")

mongoose.connect("mongodb+srv://nikhil0807yt:dh9nMvKGB8GQTtVv@cluster0.8onw4.mongodb.net/todo-app-database")

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
    //input validation
    // add validationn like it should have 1 ucase 1 lcase 1special char

    const requiredbody=z.object({
        email:z.string().min(5).max(100).email(),
        name:z.string().min(5).max(100),
        password:z.string().min(5).max(30)
    }) 
    const parsedDatawithSuccess= requiredbody.safeParse(req.body);
    if(!parsedDatawithSuccess.success){
        res.json({
            msg:"incorrect format",
            error:parsedDatawithSuccess.error
        })
        return 
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    let iserror=false;
   try {
    const hashedpassword=await bcrypt.hash(password,5); //if 5 is not thier then await isnot needed i.e not long process
    console.log(hashedpassword)    // in promisfied version no 3rd argument of fun(req,res)

    await UserModel.create({
        email: email,
        password: hashedpassword,
        name: name
    });
    } catch(e){
    res.json({
        msg:"user already exists"
        
    })
    iserror=true; 
}
    if(!iserror){
        res.json({
            msg:"you are signed up "
        })
    }

       // bcpz if we use many res it throws error
    
   
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        // password can't be compared directly bcoz itis hashed
    });
    if(!response){
        res.json({
            msg:"user not found"
        })
    }
    const passwordmatch= await bcrypt.compare(password,response.password);

    if (passwordmatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.findOne({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);
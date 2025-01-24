import {Client} from "pg";
import express from "express";

const app=express()
const pgClient = new Client ("postgresql://neondb_owner:npg_c9HwoA6OZIYP@ep-flat-grass-a8shxklh-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")

pgClient.connect()
app.use(express.json())
app.post("/signup",async (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
   try{
    const insertquery= `INSERT INTO users(username,email,password) VALUES ( $1 ,$2 ,$3  );` 
    const response = await pgClient.query(insertquery,[username,email,password]);

    res.json({
        msg : "you have signed up"
    })

}catch(e){
    res.json({
        msg:"error while signup",
        error: e
    })
}

})
app.listen(3000);

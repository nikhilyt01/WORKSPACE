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

    const city =req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode=req.body.pincode;


   try{
    const insertquery= `INSERT INTO users(username,email,password) VALUES ( $1 ,$2 ,$3  ) RETURNING id;` 
    const addressinsert =`INSERT INTO addresses (city,country,street,pincode,user_id) VALUES($1,$2,$3,$4,$5) ;`
    
    await pgClient.query("BEGIN ;");  // trancation wrap 


    const response = await pgClient.query(insertquery,[username,email,password]);
    const userId= response.rows[0].id;
    const addressesquery = await pgClient.query(addressinsert,[city,country,street,pincode,userId])
   
   
    await pgClient.query("COMMIT ;")
    
    res.json({
        msg : "you have signed up"
    })

}catch(e){
    console.log(e);
    res.json({
        msg:"error while signup",
       
    })
}

})
app.listen(3000);

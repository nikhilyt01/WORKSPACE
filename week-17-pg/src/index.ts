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
app.get("/metadata",async (req,res)=>{
    const id=req.query.id;

    const query1=`SELECT username,email,password FROM users WHERE id=$1 ;`
    const resp1= await pgClient.query(query1,[id]);

    const query2= `SELECT city,country,pincode,street FROM addresses WHERE user_id=$1 ;`
    const resp2= await pgClient.query(query2,[id]);

    res.json({
        user:resp1.rows[0],
        address: resp2.rows[0]
    })
})


app.listen(3000);

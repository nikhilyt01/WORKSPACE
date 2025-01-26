require('dotenv').config()
const express= require("express");
const mongoose= require("mongoose");
const app=express();

const {courserouter} = require("./routes/course")
const {userrouter} =require("./routes/user")
const { adminrouter } =require("./routes/admin")

//const {CreateUserRoutes}=require("./routes/user");

//CreateUserRoutes(app);
//const {purchasemodel} =require ("./db");

app.use(express.json())

app.use("/api/v1/user",userrouter);        // /api/v1/user/anything will be handled by userrputer
app.use("/api/v1/course",courserouter);
app.use("/api/v1/admin",adminrouter); //1st argument is prefix

//console.log(process.env.MONGO_URL);
async function main(){
    //dotenv HW
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    //console.log("listening") // if some error it won't run backend
}
main();
 
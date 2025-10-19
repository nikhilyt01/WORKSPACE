import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";// bcoz used type : "module" in package.json for import 
import { connectDB } from "./Lib/db.js";

dotenv.config();

const app =express();
const PORT=process.env.PORT ;

app.use("/api/auth",authRoutes);
//noob way
// app.get("/api/auth/signup", (req, res) => {
//     res.send("signup route");
// });
// app.get("/api/auth/login", (req, res) => {
//     res.send("login route");
// });
// app.get("/api/auth/logout", (req, res) => {
//     res.send("logout route");
// });
app.get("/",(req,res)=>{
    res.send("Welcome to Streamify");
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

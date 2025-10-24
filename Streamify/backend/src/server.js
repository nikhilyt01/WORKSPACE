import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";// bcoz used type : "module" in package.json for import 
import cookieParser from "cookie-parser";
import { connectDB } from "./Lib/db.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app =express();
const PORT=process.env.PORT ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("api/users",userRoutes);
app.use("api/chat",chatRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to Streamify");
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

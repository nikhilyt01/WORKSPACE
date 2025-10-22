import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute= async (req,res,next)=>{
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"Unauthorized access -token missing"});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized access -invalid token"});
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"Unauthorized access -user not found"});
        }

        req.userId=user;//decoded  
        next();
    }catch(error){
        console.log("Error in auth middleware:",error.message);
    }
}
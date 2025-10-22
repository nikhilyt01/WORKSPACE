import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function signup(req,res){
    const {fullName,email,password}=req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        const emailregex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailregex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }
        const existinguser= await User.findOne({email});
        if(existinguser){
            return res.status(400).json({message:"Email already in use"})
        }
        //const hashedpass=await bcrypt.hash(password,5);

        const idx=Math.floor(Math.random()*100)+1;
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;
        // To do : add same user to stream  as well
        const newUser= await User.create({
            email,
            fullName,
            password,//:hashedpass
            profilePic:randomAvatar
        })

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY ,{expiresIn:'7h'})
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json({success:true, message:"User registered successfully", user:newUser});
    }  
    catch(error){
        console.error("Error during signup:",error);
        return res.status(500).json({message:"Internal server error"});
        }

}
export async function  login(req,res){
    const {email,password}=req.body;

    try{
        if(!email || !password){
            return res.status(400).json({messsage:"all fields are required"});
        }
        const existinguser=await User.findOne({email})
        if(!existinguser) return res.status(400).json({message:"Invalid credentials -email"});

        const isPasswordmatch= await existinguser.matchPassword(password);
        if(!isPasswordmatch) return res.status(400).josn({message:"Invalid credentials"});
 
        const token= jwt.sign({userId:existinguser._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:'strict',
        })
        return res.status(200).json({success:true,message:"Login successful",user:existinguser});

    }
    catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });

    }
}
export async function logout(req,res){
    res.clearCookie("jwt");
    return res.status(200).json({success:true,message:"Logout successful"});
}   
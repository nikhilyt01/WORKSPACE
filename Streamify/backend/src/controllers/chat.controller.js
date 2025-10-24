import { generateStreamToken } from "../Lib/stream.js";

export async function getStreamToken(req,res){
    try{
        const token= generateStreamToken(req.userId._id);
        res.status(200).json({token});

    }catch(error){
        console.log("Error in get stream token controller:",error.message);
        res.status(500).json({message:"Internal server error"});

    }

}
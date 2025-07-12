import { NextFunction,Request,Response } from "express";
import { JWT_SECRET } from "@repo/back-common/config";
import  Jwt, { JwtPayload }  from "jsonwebtoken";

export function middleware (req:Request,res:Response,next:NextFunction){
    const token =req.headers["authorization"] ?? "";
    if(!token){
        res.status(401).json({message:"Missing token !"});
        return;
    }
    try{
  const decoded : string | JwtPayload = Jwt.verify(token,JWT_SECRET)  // itv will give user id
  if(decoded){
        req.userId=(decoded as JwtPayload).userId;
        next();
        return;
  }
  else{
    res.status(401).json({message:"UnAuthorized !"})
  }
}catch{
    res.status(404).json({message:"Invalid or expired Token !"})
    return;
}

}
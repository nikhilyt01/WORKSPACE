import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function  middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"] ;
   
    const decoded = jwt.verify(token as string,JWT_SECRET);

    if(decoded){
        // we will add that global req updation part
        req.userId=(decoded as JwtPayload).userId;
        next();

    }else{
        res.status(403).json({message:"unauthorized"})
    }

}
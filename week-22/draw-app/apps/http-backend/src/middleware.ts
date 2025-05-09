import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function  middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"] ??"" ;
    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return; 
    }
   
    try{           //error handling
    const decoded:string|JwtPayload = jwt.verify(token ,JWT_SECRET);

    if(decoded){
        // we will add that global req updation part
        req.userId=(decoded as JwtPayload).userId;
        next();
        return;
    }else{
        res.status(403).json({message:"unauthorized"})
    }
}catch{
    res.status(401).json({ error: "Invalid or expired token" })
    return;
}

}

//  app.get("/test-room/:id", async (req, res) => {
//      const room = await prismaClient.$queryRaw`
//        SELECT * FROM "Room" WHERE id = ${Number(req.params.id)}
//      `;
//       res.json(room);
//    });
   
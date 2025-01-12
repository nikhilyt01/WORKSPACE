import {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config"

// interface customRequest extends Request {
//     userId ?:string;
// }

export const userMiddleware= (req:Request,res:Response,next:NextFunction) =>{
    const header=req.headers["authorization"]
    const decoded= jwt.verify(header as string ,JWT_SECRET)
    if(decoded){
        //@ts-ignore
        req.userId =decoded.id;
        next()
    }else {
        res.status(403).json({
            msg:"you are not logged in"
        })

    }

}
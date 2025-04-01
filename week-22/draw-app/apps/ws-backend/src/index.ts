import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss =new WebSocketServer({port:8080});

function checkuser(token:string):string | null {
    const decoded=jwt.verify(token,JWT_SECRET);
    if(typeof decoded=="string"){
       wss.close();
       return null;
    }
    if(!decoded || !decoded.userId){
        return null;
    }
    return decoded.userId

}

wss.on("connection",function connection(ws,request) {
    const url = request.url; // ws://localhost:3000?token=1243647  yaha pe split after ?
    
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";

    const userId=checkuser(token);
    if(!userId){
        ws.close();
    }
    

    ws.on("message",function message(data){
        ws.send("pong");
    });

});
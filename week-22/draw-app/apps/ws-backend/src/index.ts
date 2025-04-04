import { WebSocketServer,WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client";

const wss =new WebSocketServer({port:8080});

interface User{
    userId:string,
    rooms:string[],
    ws:WebSocket
}
const users:User[]=[]

function checkuser(token:string):string | null {
    const decoded=jwt.verify(token,JWT_SECRET);
try{
    if(typeof decoded=="string"){
       return null;
    }
    
    if(!decoded || !decoded.userId){
        return null;
    }

    return decoded.userId              //  { userId: usermodel ---> ka id ko encode kiya h}
} catch(e){
    return null;
}
return null;    // why?????????????????????????????????????

}

wss.on("connection",function connection(ws,request) {
    const url = request.url; // ws://localhost:3000?token=1243647  yaha pe split after ?
    
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";

    const userId=checkuser(token);

    if(userId==null){
        ws.close();
        return null;
    }

    users.push({
        userId,
        rooms:[],
        ws
    })
    

    ws.on("message",async function message(data){
        const parsedData = JSON.parse(data as unknown as string); // {type:"join_room,roomId:1"}

        if (parsedData.type==="join_room"){
            const user =users.find(x => x.ws === ws);  // find user in global  user array & push in its room
            if(!user){
                return;  // optional bcoz bina site pe aye msg nhi krskte  to socket
            }
            user?.rooms.push(parsedData.roomId);
        }

        if(parsedData.type==="leave_room"){
            const user = users.find(x=> x.ws ===ws);
            if(!user){
                return;
            }
            user.rooms =user.rooms.filter(x => x!==parsedData.roomId)   // current room ko leave krne ke liye
        }
        if(parsedData.type==="chat"){
            const roomId=parsedData.roomId;
            const message=parsedData.message;

            await prismaClient.chat.create({
                data:{
                    roomId,
                    message,
                    userId
                }
            })

            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }))

                }
            })

        }

    });

});
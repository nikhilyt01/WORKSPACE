
import {WebSocketServer,WebSocket } from "ws";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/back-common/config"
import {prismaClient} from "@repo/db/client"

const wss =new WebSocketServer({port:8080});

interface user {
    ws:WebSocket,
    rooms : string[],
    userId:string,

}

const users :user[] = [];

function checkUser(token:string):string | null {
    
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
       if(typeof decoded=="string"){  // " "
         return null;
       }
       if(!decoded || !decoded.userId){
        return null;
       }

    return decoded.userId

    }catch(e){
        return null;
    }
  

}

wss.on("connection",function connection(ws,request){
    const url  = request.url; //ws:localhost:3000?token="fdfgfg"
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split('?')[1])
    const token =queryParams.get("token") || "" ;

    const userId = checkUser(token)
    if(userId===null){
        ws.close();
        return;
    }

    // // Remove any existing connection for this user
    const existingUserIndex = users.findIndex(u => u.userId === userId);//returna (index) if matched else (-1)  // check agar same user ka phele se array me details ha to old wale ko Splice krdo
    if (existingUserIndex !== -1) {    // found
        users.splice(existingUserIndex, 1);
    }    // then again waps se push new details

    users.push({
        userId,
        rooms:[],
        ws
       
    })
    ws.on("close",function close(){
        const index = users.findIndex(u => u.userId ===userId);
        if(index !== -1){  // means some index is Found 
             users.splice(index,1)  // wo index ke element ko nikal lawde 
        }
    })
    
   //console.log("user connected")

    ws.on("message",async function message(data){
        let ParsedData;                               // bcoz sending msg as object was giving error and was not being parsed
        if(typeof data !=="string"){                    // buffer was being returned
            ParsedData=JSON.parse(data.toString());
        }else{
            ParsedData=JSON.parse(data);
        }

        // let ParsedData;
        // try {
        //     ParsedData = JSON.parse(data.toString());   // means Khali string chiye nhi to maa chudaiye
        // } catch (e) {
        //     ws.send(JSON.stringify({
        //         type: "error",
        //         message: "Invalid message format"
        //     }));
        //     return;
        // }
         // commare with User Id is best bcoz some one can use mulyiple tabs but have same user Id
         //          Why compare userId instead of WebSocket (ws)?
         // userId represents the actual user identity from your JWT token
        // A user might reconnect (creating a new ws object) but would have the same userId
        // Comparing by userId prevents duplicate connections for the same user
        // If we compared by ws, a user could have multiple connections from different devices/tabs
        if(ParsedData.type ==="join_room"){     //{type:"join_room",roomId:1223}
            const user = users.find(x =>  x.userId===userId)                     
            if(!user){
                return;
            }
           if(!user.rooms.includes(ParsedData.roomId)){  // phele se room nhi hai tab hi push karo
               user?.rooms.push(ParsedData.roomId)
            }
        }
        else if(ParsedData.type==="leave_room"){
            const user =users.find(x => x.userId===userId)
            if(!user){
                return;
            }
            user.rooms = user.rooms.filter(room => ParsedData.roomId!=room)
            
        }
        else if(ParsedData.type==="chat"){   // {type="chat",roomId:"123",message:"sjabd"}
            console.log("called")
            const roomId = ParsedData.roomId;
            const message = ParsedData.message;

           const roomexists= await prismaClient.room.findUnique({
               where:{id:Number(roomId)}
           })
           if(!roomexists){
            ws.send(JSON.stringify({
                type:"error",
                message:`Room with id ${roomId} Not Found`
            }))
           }
        try{
           await prismaClient.chat.create({           // chat created
            data:{
                roomId:Number(roomId),
                message,
                userId
            }
           })

           users.forEach(user =>{     
            if(user.rooms.includes(roomId) ) {  // not && user.ws!==ws as for rendering image so that my message is not broadcasted to me if i sent it
                user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }));
            }
           })
        }catch{
            ws.send(JSON.stringify({
                type:"error",
                message:"something went wrong while sending message"
            }))
        }
        }else if(ParsedData.type==="image"){     // {type:image,roomId,message}
            const roomId = ParsedData.roomId;
            const message = ParsedData.message;

            const roomExist = await prismaClient.room.findUnique({
                where:{id:Number(roomId)}
            })
            if(!roomExist){
                ws.send(JSON.stringify({
                    type:"error",
                    message:`Room with roomId ${roomId} do not exists`
                }))
                return;
            }

        try{
           await prismaClient.chat.create({           // chat created
            data:{
                roomId:Number(roomId),
                message,
                userId
            }
           })

           users.forEach(user =>{
            if(user.rooms.includes(roomId) ) {  //&& user.ws!==ws so that my message is not broadcasted to me if i sent it
                user.ws.send(JSON.stringify({
                        type:"image",
                        message:message,
                        roomId
                    }));
            }
           })
        }catch{
            ws.send(JSON.stringify({
                type:"error",
                message:"something went wrong while sending Image"
            }))
        }

        }
        else if(ParsedData.type==="solve"){
            const roomId= ParsedData.roomId;
            const message = ParsedData.message;
            if(!roomId || ! message){
                 ws.send(JSON.stringify({
                    type:"error",
                    message:`either RoomId or message missing in message`
                }))
                return;

            }
            users.forEach(user =>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"solve",
                        message:message,
                        roomId:roomId
                    }))
                }
            })
        }


    })

})  
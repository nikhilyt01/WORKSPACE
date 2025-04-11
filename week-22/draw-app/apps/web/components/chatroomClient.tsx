"use client"

import { useEffect, useState } from "react";
import{useSockets} from "../hooks/useSockets"

export function ChatRoomClient({
    messages,
    id
}:{
    messages:{message:string}[],          // array of objects    // messages: [{ messages: "Hi" }, { messages: "Bye" }],
    id:string
}){
  const  [chats,setChats]=useState(messages);
  const {socket,loading}= useSockets();
  const [currentMessage, setCurrentMessage] = useState("");

 useEffect(()=>{
    if(socket && !loading){
        socket.onmessage=(event)=>{
            
            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }))

            const parsedData=JSON.parse(event.data);
            if(parsedData.type==="chat"){
                setChats(c => [...c,{message: parsedData.message}])
            }
        }
    }

 },[socket,loading,id])

 return <div>
    {chats.map( m=> <div>{m.message}</div>)}
    <input type="text" value={currentMessage} onChange={e => {
            setCurrentMessage(e.target.value);
        }}></input>
        <button onClick={() => {
            socket?.send(JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage
            }))

            setCurrentMessage("");
        }}>Send message</button>
    </div>


    
}
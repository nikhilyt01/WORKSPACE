"use client"
import {useRef,useEffect,useState} from "react"
import { initDraw } from "@/draw";
import { WS_URL } from "@/config";
import { Canvas } from "./Canvas";

export  function RoomCanvas({roomId}:{roomId:string}){
    const [socket,setSocket] = useState<WebSocket |null>(null);

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NjY1MWQwOS01ZWI2LTQ4NzItOGM5OC1hYWRlNjhlNmZkZDEiLCJpYXQiOjE3NDQ5OTk1NzV9.3PSgC1eOfKSlsVks5jRjx4Ru4Jsn81umletgNlSwL80`);

        ws.onopen =() =>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }
    },[])

    if(!socket){
        return <div>
            connecting to server ...
        </div>
    }

    return <div>
               <Canvas roomId={roomId} socket={socket}/>
               
        </div>
}
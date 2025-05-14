"use client"
import {useRef,useEffect,useState} from "react"
import { initDraw } from "@/draw";
import { http_backend, WS_URL } from "@/config";
import { Canvas } from "./Canvas";
import {toast} from "react-hot-toast";
import { Socket } from "dgram";
import axios from "axios";
import axiosWithAuth from "./axioswithAuth";
import { UnAuth } from "./unAuthpage";
import { Errorpage } from "./roomNotFound";

export  function RoomCanvas({roomId}:{roomId:string}){
    const [socket,setSocket] = useState<WebSocket |null>(null);
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const socketRef = useRef<WebSocket | null>(null);
    const [authstatus,setAuthstatus]=useState<"unAuth"| "valid" | "loading" |"notFound">("loading");
    const api =axiosWithAuth()
   
    useEffect(() => {
      const validateandConnect = async() =>{
        const token = typeof window!= "undefined"? localStorage.getItem("token") : "";
        if(!token){
            setAuthstatus("unAuth");
            return;
        }
   try{
        // room validate
        const res= await api.get(`/rooms/${roomId}`)    // get only takes 2 Inp so used custom axios
        if(!res.data?.room){
            setAuthstatus("notFound");
            return;
        }
        
        setAuthstatus("valid");

        if (socketRef.current) {
            socketRef.current.close();
            toast.dismiss('connection-toast'); // Clear previous toasts
          }  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NjY1MWQwOS01ZWI2LTQ4NzItOGM5OC1hYWRlNjhlNmZkZDEiLCJpYXQiOjE3NDQ5OTk1NzV9.3PSgC1eOfKSlsVks5jRjx4Ru4Jsn81umletgNlSwL80

        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen =() =>{
            setSocket(ws);
            setConnectionStatus("connected");
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
            toast.success("connected to collabrative server")
        }
        ws.onerror=(error)=>{
            setConnectionStatus("error");
            toast.error("ws connection error")
            console.log("conection error:",error)
        }

        ws.onclose=()=>{
            toast.error("Disconnected from server")
        }
    }catch(e){
        console.log("error validating room",e);
        setAuthstatus("unAuth")
    }
    }
  
    validateandConnect();
       
    return () =>{
        if(socketRef.current?.readyState===WebSocket.OPEN){
            socketRef.current.close();
            socketRef.current = null;
        }
    }
        
    },[roomId])

    if(authstatus==="unAuth") return <UnAuth/>
    if(authstatus==="notFound") return <Errorpage/>

    if(!socket || authstatus==="loading"){
         return (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <p className="text-lg">
                            {connectionStatus === "connecting" 
                                ? "Connecting to server..." 
                                : "Connection failed. Please refresh."}
                        </p>
                        {connectionStatus === "error" && (
                            <button 
                                onClick={() => window.location.reload()}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Retry
                            </button>
                        )}
                    </div>
                </div>
            );
        
    }

    return <div>
               <Canvas roomId={roomId} socket={socket}/>   
        </div>
}
"use client"
import { Canvas } from "./canvas";
import { useEffect,useState,useRef } from "react";
import axiosWithAuth from "./apiwithauth";
import { http_backend, WS_URL } from "@/config";
import toast, { Toaster } from "react-hot-toast";
import { UnAuth } from "./unAuthPage";
import { Errorpage } from "./roomNotFound";

export  function RoomCanvas({roomId}:{roomId:string}){
     
     const [connectionStatus, setConnectionStatus] = useState("connecting");
     const socketRef = useRef<WebSocket | null>(null);
     const [authstatus,setAuthstatus]=useState<"unAuth"| "valid" | "loading" |"notFound">("loading");
     const api=axiosWithAuth()
    // validate and connect WS 
    //render unauth and other apage
    useEffect(()=>{
       const validateConnect =async()=>{
          const token =  typeof window!=undefined? localStorage.getItem("token"):"";
          if(!token){
               setAuthstatus("unAuth");
               return;
          }
          try{ // room validation
               const res= await api.get(`${http_backend}/rooms/${roomId}`)
               if(!res.data.room){
                    setAuthstatus("notFound")
                    return;
               }
               setAuthstatus("valid")
                   if(socketRef.current){
                     socketRef.current.close();
                     toast.dismiss('connection-toast');
                   }
          
                    const ws= new WebSocket(`${WS_URL}?token=${token}`)
                    socketRef.current=ws;

                    let connectionSuccessful = false;
                    ws.onopen=()=>{
                         connectionSuccessful = true;
                         setConnectionStatus("connected")
                         ws.send(JSON.stringify({
                              type:"join_room",
                              roomId
                         }))
                         toast.success("connected to collabrative server")
                    }
                    ws.onerror=(error)=>{
                     if (!connectionSuccessful) {
                         setConnectionStatus("error");
                         toast.error("ws connection error")
                         console.log("conection error:",error)
                      }
                    }
                    ws.onclose=()=>{
                          
                          // Only show disconnect toast if previously connected
                          if (connectionStatus === "connected") {
                            toast.error("Disconnected from server");
                          }
                          console.log("Disconnected", event);
                          if (!connectionSuccessful) return; // Skip if already handled by onerror
                    }
               

          }catch(e){
                console.log("error validating room",e);
               setAuthstatus("unAuth")

          }

       }
       validateConnect();

       return ()=>{  // cleanup
               if(socketRef.current?.readyState===WebSocket.OPEN){
                    socketRef.current.close();
                    socketRef.current=null;
               }
          }


    },[roomId])

     if (authstatus === "unAuth") return <UnAuth/>;
    if (authstatus === "notFound") return <Errorpage/>;

    if (!socketRef.current || authstatus === "loading") {
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


   return (
    
        <Canvas roomId={roomId} socket={socketRef.current}></Canvas>
    
     
   )
}
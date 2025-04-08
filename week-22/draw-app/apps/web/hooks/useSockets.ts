import { useEffect,useState } from "react";
import { ws_url } from "../app/config";

export function useSockets(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws =new WebSocket(ws_url);
        ws.onopen=()=>{
            setLoading(false);
            setSocket(ws);
        }

    },[])
    return {
        socket,
        loading
    }
}
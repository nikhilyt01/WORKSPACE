import { useEffect,useState } from "react";
import { ws_url } from "../app/config";

export function useSockets(){
    const [loading,setLoading]=useState(true);
    const [socket,setSocket]=useState<WebSocket>();

    useEffect(()=>{
        const ws =new WebSocket(`${ws_url}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MWEyZjcwOC0zNTQxLTRmOWItYWM5OS04YWUwYzlkNjgxMTYiLCJpYXQiOjE3NDM0NDk3NDZ9.K3xGO5v2hIfV7f7mt95fWKCiq8Rba8zFhnZB_tmO85w`);
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
"use client"

import {useRef,useEffect} from "react"
import { initDraw } from "@/draw";

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvasRef.current){
             initDraw(canvasRef.current)   // canvas html ke attribute ko hi pass krdiye
           
             
        }

    },[canvasRef])

    return <div>
               <canvas ref={canvasRef} width={2000} height={1000}></canvas>
               <div className="absolute bottom-0 right-0">
                 <div className="bg-white text-black">Rect</div>
                 <div className="bg-white text-black">Circle</div>
               </div>
        </div>

}
"use client"

import {useRef,useEffect} from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvasRef.current){
              const canvas =canvasRef.current;
              const ctx=canvas.getContext("2d");

              if(!ctx){
                return
              }

             

              let clicked=false;
              let startx=0;
              let starty=0;

             canvas.addEventListener("mousedown",(e)=>{
              clicked=true;
              startx= e.clientX
              starty=e.clientY
             })
 
             canvas.addEventListener("mouseup",(e)=>{
              clicked=false;
              console.log(e.clientX)
              console.log(e.clientY)
             })

             canvas.addEventListener("mousemove",(e)=>{
              if(clicked){
               const width = e.clientX - startx;
               const height = e.clientY - starty;
               ctx.clearRect(0,0,canvas.width,canvas.height);

              
               ctx.strokeRect(startx,starty,width,height);
               
              }
             })
        }

    },[canvasRef])

    return <div>
               <canvas ref={canvasRef} width={1080} height={1000}></canvas>
        </div>

}
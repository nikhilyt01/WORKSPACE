"use client"
import {useRef,useEffect,useState} from "react"
import { initDraw } from "@/draw";
import { Iconbutton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

enum Shape {
     rect ="RECT",
     circle="CIRCLE",
     pencil="PENCIL"

}
export  function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){

     const [selectedTool,setSelectedTool] = useState<Shape>(Shape.circle)  // used enum
     const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(()=>{
        if(canvasRef.current){
             initDraw(canvasRef.current,roomId,socket)   // canvas html ke attribute ko hi pass krdiye
           
        }

    },[canvasRef])

    return <div style={{
                height:"100vh",
                overflow:"hidden",
                background:"green"
    }}> 
               <canvas ref={canvasRef} width={2000} height={1000}></canvas>
               <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/> 
               {/* bcoz fixed is used that why postion on topbar matter nhi krta */}
        </div>

}

function TopBar({selectedTool,setSelectedTool}:{
     selectedTool:Shape,
     setSelectedTool:(s:Shape)=>void
}){
     return <div style={{
          position:"fixed",
          top:10,
          left:10
     }}>
           <div className="flex gap-2">
               <Iconbutton 
                       Activated={selectedTool===Shape.pencil} 
                       icon={<Pencil />} 
                       onClick={()=>{
                            setSelectedTool(Shape.pencil)
                         }}/>
               <Iconbutton Activated={selectedTool===Shape.rect} icon={<RectangleHorizontalIcon />} 
               onClick={()=>{
                    setSelectedTool(Shape.rect)
                    }}/>
               <Iconbutton Activated={selectedTool===Shape.circle} icon={<Circle />} 
               onClick={()=>{
                    setSelectedTool(Shape.circle)
                    }}/>
           </div>


     </div>
}
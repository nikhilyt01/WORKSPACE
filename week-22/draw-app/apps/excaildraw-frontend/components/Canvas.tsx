"use client"
import {useRef,useEffect,useState} from "react"
import { initDraw } from "@/draw";
import { Iconbutton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, Type ,Eraser, Triangle} from "lucide-react";

enum Shape {
     rect ="Rect",
     pencil="Pencil",
     Oval="Oval",
     Triangle="Triangle",
     Eraser="Eraser",
     Text="Text",

}
export  function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){

     const [selectedTool,setSelectedTool] = useState<Shape>(Shape.Oval)  // used enum
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const toolRef = useRef<Shape>(selectedTool); // it won't trigger  re-render
     
     useEffect(() => {
          toolRef.current = selectedTool; // keeps it in sync                                                                   ❌ Problem with () => selectedTool
                                                                               //selectedTool is state. And in JavaScript, functions remember the variables that existed when they were created. So the function () => selectedTool remembers the value of selectedTool at the time initDraw() was first called.
                                                                             //  React doesn’t update the function’s closure on state changes. So your getTool() inside initDraw was always returning the old value (i.e., the one from the first render), even if the user selected a different tool later.
        }, [selectedTool]);

     useEffect(()=>{
        if(canvasRef.current  && socket){
             initDraw(canvasRef.current,roomId,socket,()=>toolRef.current)   // canvas html ke attribute ko hi pass krdiye
           
        }

    },[canvasRef,roomId])

    return <div style={{
                height:"100vh",
                overflow:"hidden",
               
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
               <Iconbutton Activated={selectedTool===Shape.Oval} icon={<Circle />} 
               onClick={()=>{
                    setSelectedTool(Shape.Oval)
                    }}/>

                    <Iconbutton Activated={selectedTool===Shape.Text} icon={<Type/>} 
               onClick={()=>{
                    setSelectedTool(Shape.Text)
                    }}/>

                    <Iconbutton Activated={selectedTool===Shape.Triangle} icon={<Triangle/>} 
               onClick={()=>{
                    setSelectedTool(Shape.Triangle)
                    }}/>
                     <Iconbutton Activated={selectedTool===Shape.Eraser} icon={<Eraser/>} 
               onClick={()=>{
                    setSelectedTool(Shape.Eraser)
                    }}/>
           </div>


     </div>
}
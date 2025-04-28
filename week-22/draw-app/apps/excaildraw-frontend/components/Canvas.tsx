"use client"
import {useRef,useEffect,useState} from "react"
import { initDraw } from "@/draw";
import { Iconbutton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, Type ,Eraser, Triangle, AlignCenter} from "lucide-react";

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
     const thicknessRef =useRef(2);
     const [thickness,setThickness] =useState(2);
     const [color,setColor]= useState("#ffffff");
     const colorRef = useRef("#ffffff");

     useEffect(()=>{
          colorRef.current=color
     },[color])

     useEffect(() => {
          toolRef.current = selectedTool; // keeps it in sync                                                                   ❌ Problem with () => selectedTool
                                                                               //selectedTool is state. And in JavaScript, functions remember the variables that existed when they were created. So the function () => selectedTool remembers the value of selectedTool at the time initDraw() was first called.
                                                                             //  React doesn’t update the function’s closure on state changes. So your getTool() inside initDraw was always returning the old value (i.e., the one from the first render), even if the user selected a different tool later.
        }, [selectedTool]);

     useEffect(()=>{
        if(canvasRef.current  && socket){
             initDraw(
               canvasRef.current,   // canvas html ke attribute ko hi pass krdiye
               roomId,socket,
               ()=>toolRef.current,
               ()=>colorRef.current,
               ()=>thicknessRef.current

          )   
           
        }

    },[canvasRef,roomId])

    return <div className="Relative w-screen h-screen bg-black  overflow-hidden ">  
               {/* Left sidebar for Color + Thickness */}      
               <div className="absolute left-4 top-24 flex flex-col py-4 px-6 gap-6 bg-gray-900 rounded-lg shadow-lg ">
                    {/* thickness input */}
                    
                    <div className="flex flex-col items-center gap-2">
                          <p className="text-bold text-lg text-white">Stroke Setting</p>
                         <label htmlFor="thickness" className="text-white text-sm">Stroke size : {thickness}px</label>
                         <input
                            id="thickness"
                            type="range"
                            min="1"
                            max="20"
                            defaultValue={2}
                            onChange={(e)=>setThickness(Number(e.target.value))}
                            className="w-full"
                         />
                    </div>
                    {/* colour picker and not for Eraser */}
                    {selectedTool!==Shape.Eraser && (
                         <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center gap-2">
                                   <span className="text-white text-sm">Select Color:</span>
                                  
                              </div>
                              <input
                                 id="color"
                                 type="color"
                                 value={color} 
                                 onChange={(e)=>setColor(e.target.value)}
                                 className="w-full h-10  "
                              />

                         </div>
                    )}

               </div>
               {/* TopBar for tools */}
               <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-full flex items-center gap-4 shadow-lg">
                   <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
               </div>
               {/* Main canvas */}
               <canvas ref={canvasRef} width={2000} height={1000} className="bg-black"></canvas>
               {/* <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/> 
               bcoz fixed is used that why postion on topbar matter nhi krta */}
               
        </div>

}

function TopBar({selectedTool,setSelectedTool}:{
     selectedTool:Shape,
     setSelectedTool:(s:Shape)=>void
}){
     // style={{
     //      position:"fixed",
     //      top:10,
     //      left:10
     // }}
     return <div >      
           <div className="flex items-center gap-2">
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

                    {/* <Iconbutton Activated={selectedTool===Shape.Text} icon={<Type/>} 
               onClick={()=>{
                    setSelectedTool(Shape.Text)
                    }}/> */}

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
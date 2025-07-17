
"use client"
import {useRef,useEffect,useState} from "react"
import { initDraw } from "../app/draw";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, Type ,Eraser, Triangle, AlignCenter,LogOut,MoveRight, Minus, Icon } from "lucide-react";
import { useRouter } from "next/navigation";

enum Shape {
     rect ="Rect",
     pencil="Pencil",
     Oval="Oval",
     Triangle="Triangle",
     Eraser="Eraser",
     Text="Text",
     Arrow="Arrow",
     Line="Line"

}
const basicColors = [
     "#ffffff",
     "#ff4d4d",
     "#4dff4d",
     "#4d9fff",
     "#ffeb3b",
    // "#ff66ff",
     //"#00e5ff",
   ];
export  function Canvas({roomId}:{roomId:string}){
    const CanvasRef = useRef<HTMLCanvasElement >(null);
    const [selectedTool,setSelectedTool] = useState<Shape>(Shape.rect);
    const [thickness,setThickness] = useState(2);
    const [color,setColor]=useState("#ffffff")

    useEffect(()=>{
       if(CanvasRef.current){
         initDraw(CanvasRef.current,roomId)
       }

    },[CanvasRef])

    return (
        <div className=" relative w-screen h-screen bg-black  overflow-hidden">
            {/* settings Box at left */}
            <div className="absolute left-4 top-24 flex flex-col py-4 px-6 gap-6 bg-gray-900 rounded-lg shadow-lg ">
                <div className="flex flex-cols gap-2 ">
                     <p className="text-bold text-lg text-white">Stroke Setting</p>
                     <label htmlFor="thickness" className="block text-sm text-white">Stroke size : {thickness}px </label>
                     <input 
                       id="thickness"
                       type="range"
                       min="1"
                       max={selectedTool=="Arrow"?"6":"20"}
                       onChange={(e)=>setThickness(Number(e.target.value))}
                       defaultValue={2}
                       className="w-full"
                     />
                </div>
               { selectedTool!==Shape.Eraser && 
               <div className="flex flex-cols gap-2">
                    <div><p className="text-sm text-white">Select color:</p></div>
                    <input 
                       id="color"
                       type="color"
                       value={color}
                       onChange={e=>setColor(e.target.value)}
                       className="w-full h-10"
                    />
                     <div >
                        <p className="text-white text-bold text-sm mb-1">Basic Colors:</p>
                        {basicColors.map((c)=>(
                            <button 
                               key={c}
                               onClick={()=>setColor(c)}
                               style={{background:c}}
                               className={`w-6 h-6 rounded-full border border-gray-600 hover:scale-105 active:scale-95
                                         ${color.toLowerCase()===c.toLowerCase()?  "ring-2 ring-indigo-600":""  } `}
                               />
                        ))}

                    </div>
                </div>}

            </div>
            {/* Logout */}
            <div className="absolute top-4 right-4 ">
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 active:scale-95 hover:scale-105 ">
                    Logout
                </button>

            </div>
            {/* topbar */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-full flex items-center border border-blue-900 gap-4 shadow-lg">
                <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
            </div>
            {/* Main canvas is here */}
           <div>
            <canvas ref={CanvasRef} width={2000} height={1000} className=" absolute top-0 left-0 bg-black "></canvas>
           </div>
        </div>
    )
    

}
function Topbar({selectedTool,setSelectedTool}:{
    selectedTool:Shape, setSelectedTool:(s:Shape)=>void
}){
    return (
        <div>
            <div className="flex items-center gap-2">
                <IconButton Icon={<RectangleHorizontalIcon/>} Activated={selectedTool===Shape.rect} onclick={()=>setSelectedTool(Shape.rect)}></IconButton>
                
                 <IconButton Activated={selectedTool===Shape.Oval} Icon={<Circle />} 
                    onclick={()=>{
                    setSelectedTool(Shape.Oval)
                    }}/>

                    {/* <IconButton Activated={selectedTool===Shape.Text} icon={<Type/>} 
               onClick={()=>{
                    setSelectedTool(Shape.Text)
                    }}/> */}

                    <IconButton Activated={selectedTool===Shape.Triangle} Icon={<Triangle/>} 
                     onclick={()=>{
                    setSelectedTool(Shape.Triangle)
                    }}/>
                     <IconButton Activated={selectedTool===Shape.Eraser} Icon={<Eraser/>} 
                     onclick={()=>{
                    setSelectedTool(Shape.Eraser)
                    }}/>
                    <IconButton Activated={selectedTool===Shape.Arrow} Icon={<MoveRight/>}  
                     onclick={()=>setSelectedTool(Shape.Arrow)}/>
                    <IconButton  Activated={selectedTool===Shape.Line} Icon={<Minus/>}
                    onclick={()=> setSelectedTool(Shape.Line)} />
            </div>
        </div>
    )


}
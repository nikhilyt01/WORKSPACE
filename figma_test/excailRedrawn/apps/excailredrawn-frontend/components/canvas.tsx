
"use client"
import {useRef,useEffect,useState,useCallback} from "react"
import { initDraw } from "@/draw";
import { IconButton } from "./IconButton";
import { ChevronDown, Sparkles, BrainCircuit, Loader2, Trash2,SettingsIcon,X, Puzzle,WandSparkles, MousePointer,Circle, Hand,Pencil, RectangleHorizontalIcon, Type ,Eraser, Triangle, AlignCenter,LogOut,MoveRight, Minus, Icon,ZoomIn,ZoomOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Shape } from "@/draw";
import axiosWithAuth from "./apiwithauth";
import { http_backend } from "@/config";
import toast from "react-hot-toast";
import { generateImageFromSelection } from "@/draw";
import { solveExpression } from "@/draw";
import { Settings } from "./settings";
import { Logoutandgroup } from "./logoutnOtherbutton";

const api = axiosWithAuth()

export enum shape {
     select="Select",
     rect ="Rect",
     pencil="Pencil",
     Oval="Oval",
     Triangle="Triangle",
     Eraser="Eraser",
     Text="Text",
     Arrow="Arrow",
     Line="Line",
     Hand = "Hand"

}
const basicColors = [
     "#ffffff",
     "#ff4d4d",
     "#4dff4d",
     "#4d9fff",
     "#ffeb3b",
     "#ff66ff",
    
   ];
   // zoom,offset x/y,existingshape,setexistingshape,selectedshapeIds
export  function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}){
    const CanvasRef = useRef<HTMLCanvasElement >(null);
    const [selectedTool,setSelectedTool] = useState<shape>(shape.select);
    const toolRef= useRef<shape>(selectedTool);
    const [thickness,setThickness] = useState(2);
    const thicknessRef = useRef(2);
    const [color,setColor]=useState("#ffffff");
    const colorRef =useRef("#ffffff")
    const router =useRouter()
    const [isMobile,setIsMobile]=useState(false)
    const [check,setCheck]=useState(true)
    const [dimensions, setDimensions] = useState({ 
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0 
    
  });
   const [zoom, setZoom] = useState(1);
   const zoomRef = useRef(1);
   const [offsetX, setOffsetX] = useState(0);
   const [offsetY, setOffsetY] = useState(0);
   const [existingShapes, setExistingShapes] = useState<Shape[]>([]);
   const [selectedShapeIds, setSelectedShapeIds] = useState<Set<string>>(new Set());
   const [loadImprove,setLoadImprove] = useState(false);
   const [loadSolving,setLoadSolving]=useState(false);
   const [airesponse,setAiresponse]=useState<string | null >(null);
   const [toggle,setToggle] = useState(false)


  const updateExistingShapes = useCallback((newShapes: React.SetStateAction<Shape[]>) => {
      setExistingShapes(newShapes);
    }, []);

  const updateSelectedShapeIds = useCallback((newSelectedIds: React.SetStateAction<Set<string>>) => {
      setSelectedShapeIds(newSelectedIds);
    }, []);
   const updateZoom = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);
// for zoom on wheel 
    const updatezoomandoffset =useCallback((newzoom:number,offsetx:number,offsety:number)=>{
         setZoom(newzoom);
         setOffsetX(offsetx);
         setOffsetY(offsetY);
    },[])

    // Handle window resize and set canvas dimensions.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDimensions = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        setIsMobile(window.innerWidth < 768);
      };
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);

    useEffect(()=>{
         thicknessRef.current=thickness
    },[thickness])

    useEffect(()=>{
        toolRef.current=selectedTool
    },[selectedTool])

    useEffect(()=>{
       colorRef.current = color; 
    },[color])

    useEffect(()=>{
        zoomRef.current=zoom
    },[zoom])

    useEffect(()=>{
       if(CanvasRef.current){
        //console.log("hii")
         initDraw(
          CanvasRef.current,
          roomId,
          ()=>toolRef.current,
          ()=>thicknessRef.current,
          ()=>colorRef.current,
          socket,
          ()=>zoomRef.current,
          updateZoom,
          updateOffsetX,
          updateOffsetY,
          existingShapes,
          updateExistingShapes,
          offsetX,
          offsetY,
          selectedShapeIds,
          updateSelectedShapeIds,
          setAiresponse
        )
       }

    },[CanvasRef,roomId,socket,check])

    // Create stable setter functions
    const updateOffsetX = useCallback((newOffsetX: number) => {
     setOffsetX(newOffsetX);
    }, []);

    const updateOffsetY = useCallback((newOffsetY: number) => {
     setOffsetY(newOffsetY);
    }, []);

    const handleZoomIn =()=>{
      const newZoom=Math.min(zoom*1.2,5);
      setZoom(newZoom)
    }
    const handleZoomOut=()=>{
      const newZoom=Math.max(zoom/1.2,0.1)
      setZoom(newZoom);
    }
    const resetZoom=()=>{
      setZoom(1)
    }
    async function delchats(){
      try{
        const res = await api.delete(`${http_backend}/delchats/${roomId}`)
        setCheck(prev=>!prev)
        if(res.data.message){
          toast.success(res.data.message)
        }
      }catch(e){
         toast.error("failed to del chats")
      }

    }
   async function handleImprove() {
    try {
      setLoadImprove(true);
      await generateImageFromSelection(
        existingShapes,
        selectedShapeIds,
        roomId,
        socket
      );
    } catch (error) {
      console.error("Improvement failed:", error);
      toast.error("Failed to improve image");
    } finally {
      setLoadImprove(false); // Runs whether success or failure
    }
  }
  async function handleSolve(){
    try{//console.log(airesponse);
      setLoadSolving(true)
    await solveExpression(
      existingShapes,
      selectedShapeIds,
      roomId,
      socket,
      setAiresponse
    );
  }catch(e){
    console.log("error solving ",e)
    //toast.error("failed to Solve ")
  }finally{
   setLoadSolving(false);
  }
  }
   const formatAIResponse = (response: string) => {
    try {
      const parsed = JSON.parse(response);
      return Object.entries(parsed)
        .map(([key, value]) => {
          // If the value is an object, stringify it with indentation.
          const formattedValue =
            typeof value === "object" && value !== null
              ? JSON.stringify(value, null, 2)
              : value;
          return `${key}: ${formattedValue}`;
        })
        .join("\n");
    } catch (error: any) {
      return response;
    }
  };
    return (
        <div className=" relative w-screen h-screen bg-black  overflow-hidden">
            {/* Solve response */}
             {airesponse && (
                      <div className="fixed right-0 bottom-0 z-50 bg-gray-900 bg-opacity-95 backdrop-blur-md p-6 rounded-2xl shadow-2xl max-w-md w-full m-4 border border-gray-700/50 transform transition-all duration-300 ease-in-out scale-100 hover:scale-[1.01]">
                          {/* Cross Button to Dismiss */}
                          <button
                              onClick={() => setAiresponse(null)}
                              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-gray-700"
                          >
                              <X size={20} strokeWidth={2.5} /> {/* Slightly smaller icon, bolder stroke */}
                          </button>
                          <div className="flex items-center mb-4">
                              <WandSparkles size={20} className="text-purple-400 mr-2" /> {/* Adding a subtle icon */}
                              <h3 className="text-lg font-semibold text-white">AI Insight</h3>
                          </div>
                          <pre className="text-gray-200 text-md leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-100 custom-scrollbar">
                              {formatAIResponse(airesponse)}
                          </pre>
                      </div>
             )}
              
            {/* settings Box at left */}
              {/* toggler */}
              <button
                onClick={() => setToggle(!toggle)}
                className={`absolute z-10 top-6 left-4   p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-blue-500/50 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:border border-blue-400/50 transition-colors duration-200 md:top-8 left-4`}
              >
               <SettingsIcon size={24} />
              </button>
            {toggle && (<Settings thickness={thickness} selectedTool={selectedTool} setThickness={setThickness} color={color} setColor={setColor}></Settings>)}
            {/* --------Setting Box end-------- */}
            
            {/* Top right Logout */}
            <Logoutandgroup loadImprove={loadImprove} loadSolving={loadSolving} handleSolve={handleSolve} handleImprove={handleImprove} delchats={delchats}/>
            
            {/* topbar */}
            <div className={`absolute z-30 ${
              isMobile ? 'top-4 left-1/2 transform -translate-x-1/2' : 'top-6 left-1/2 transform -translate-x-1/2'
            } bg-slate-800/95  border border-slate-700/50 px-4 py-2 rounded-2xl backdrop-blur-sm shadow-2xl`}>
                <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool} isMobile={isMobile} />
            </div>
            
            {/* Main canvas is here */}
           <div>
            <canvas ref={CanvasRef} width={dimensions.width} height={dimensions.height} className=" z-0 absolute top-0 left-0 bg-black "></canvas>
           </div>
           {/* zoom buttons */}
           <div className={`  md:absolute left-8 bottom-5 z-10 bg-slate-800/95 rounded-2xl shadow-2xl border border-slate-700/50 p-4 `}>
               <div className="flex items-center gap-3">
                 <button className="bg-slate-700/50 text-white rounded-lg shadow-2xl p-2 border border-slate-600/50 hover:bg-slate-700/50 hover:cursor-pointer hover:scale-105 active:scale-95"
                   onClick={handleZoomOut}
                   >
                    <ZoomOut className="w-4 h-4"/>
                 </button>
                 <button className="bg-slate-700/50 min-w-[60px] text-white rounded-lg shadow-2xl py-1 px-3 border border-slate-600/50 hover:bg-slate-700/50 hover:cursor-pointer hover:scale-105 active:scale-95"
                   onClick={resetZoom}
                   >
                    {Math.round(zoom * 100)}%
                 </button>
                 <button className="bg-slate-700/50  text-white rounded-lg shadow-2xl p-2 border border-slate-600/50 hover:bg-slate-700/50 hover:cursor-pointer hover:scale-105 active:scale-95"
                  onClick={handleZoomIn}
                  >
                   <ZoomIn className="w-4 h-4"/>
                 </button>

               </div>
           

           </div>
        </div>
          
    )
    

}
function Topbar({selectedTool,setSelectedTool,isMobile}:{
    selectedTool:shape, setSelectedTool:(s:shape)=>void,isMobile:boolean
}){
    return (
        <div>
            <div className={`flex items-center ${isMobile?"gap-1":"gap-2"} `}>
                <IconButton Activated={selectedTool===shape.Hand} size={isMobile?"sm":"md"} Icon={<Hand size={isMobile?16:24}/>} // Using AlignCenter as hand icon
                   onclick={()=>setSelectedTool(shape.Hand)} />
                <IconButton Activated={selectedTool===shape.select} Icon={<MousePointer size={isMobile?16:24}/>} size={isMobile?"sm":"md"}
                    onclick={()=>{
                    setSelectedTool(shape.select)
                    }}/>
                <IconButton Icon={<RectangleHorizontalIcon size={isMobile?16:24}/>} size={isMobile?"sm":"md"} Activated={selectedTool===shape.rect} onclick={()=>setSelectedTool(shape.rect)}></IconButton>
                
                 <IconButton Activated={selectedTool===shape.Oval} Icon={<Circle size={isMobile?16:24}/>} size={isMobile?"sm":"md"}
                    onclick={()=>{
                    setSelectedTool(shape.Oval)
                    }}/>

                  <IconButton Activated={selectedTool===shape.Text} Icon={<Type size={isMobile?16:24}/>} size={isMobile?"sm":"md"}
                     onclick={()=>{
                    setSelectedTool(shape.Text)
                    }}/> 

                  <IconButton Activated={selectedTool===shape.Triangle} Icon={<Triangle size={isMobile?16:24} />} size={isMobile?"sm":"md"}
                     onclick={()=>{
                    setSelectedTool(shape.Triangle)
                    }}/>
                  <IconButton 
                       Activated={selectedTool===shape.pencil} size={isMobile?"sm":"md"}
                       Icon={<Pencil  size={isMobile?16:24} />} 
                       onclick={()=>{
                            setSelectedTool(shape.pencil)
                         }}/>
                  <IconButton Activated={selectedTool===shape.Eraser} Icon={<Eraser size={isMobile?16:24} />} size={isMobile?"sm":"md"}
                     onclick={()=>{
                    setSelectedTool(shape.Eraser)
                    }}/>
                  <IconButton Activated={selectedTool===shape.Arrow} Icon={<MoveRight size={isMobile?16:24}/>}  size={isMobile?"sm":"md"}
                     onclick={()=>setSelectedTool(shape.Arrow)}/>
                  <IconButton  Activated={selectedTool===shape.Line} Icon={<Minus size={isMobile?16:24}/>} size={isMobile?"sm":"md"}
                    onclick={()=> setSelectedTool(shape.Line)} />
                  
            </div>
        </div>
    )


}
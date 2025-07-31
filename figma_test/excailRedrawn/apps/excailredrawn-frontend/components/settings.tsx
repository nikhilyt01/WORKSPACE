import { shape } from "./canvas";
const basicColors = [
     "#ffffff",
     "#ff4d4d",
     "#4dff4d",
     "#4d9fff",
     "#ffeb3b",
     "#ff66ff",
    
   ];
   interface props{
    thickness:number;
    setThickness:(thickness:number)=>void;
    selectedTool:shape;
    color:string;
    setColor:(c:string)=>void;

   }
export function Settings(
    {thickness,
    setThickness,
    selectedTool,
    color,
    setColor,}:props
){// <Settings thickness={thickness} setThickness={setThickness} color={color} setColor={setColor}>
    return(
        <div className="absolute z-10 left-4 top-24 space-y-6 p-6  bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl ">
                        <div className="space-y-4  ">
                             <p className="font-semibold text-2xl text-center text-white mb-6 ">Stroke Setting</p>
                            <div className="space-y-2">
                              <label htmlFor="thickness" className="block font-medium text-sm text-slate-300">Stroke size : {thickness}px </label>
                              <input 
                                id="thickness"
                                type="range"
                                min="1"
                                max={selectedTool=="Arrow"?"6":"20"}
                                onChange={(e)=>setThickness(Number(e.target.value))}
                                defaultValue={2}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                              />
                            </div>
                        </div>
                       { selectedTool !== shape.Eraser && 
                       <div className="space-y-2">
                            <div><p className="text-sm font-medium text-slate-300 ">Custom color:</p></div>
                            <input 
                               id="color"
                               type="color"
                               value={color}
                               onChange={e=>setColor(e.target.value)}
                               className="w-full h-10  cursor-pointer  border border-slate-700/50  bg-slate-700/95 rounded-lg"
                            />
                             <div >
                                <p className="text-slate-300 font-medium  text-sm mb-2">Quick Colors:</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {basicColors.map((c)=>(
                                    <button 
                                       key={c}
                                       onClick={()=>setColor(c)}
                                       style={{background:c}}
                                       className={`w-10 h-10 rounded-lg border border-gray-600 hover:scale-105 active:scale-95
                                                 ${color.toLowerCase()===c.toLowerCase()?  "ring-2 ring-indigo-600":""  } `}
                                       />
                                   ))}
                                </div>
        
                            </div>
                        </div>}
        
                    </div>
    )

}
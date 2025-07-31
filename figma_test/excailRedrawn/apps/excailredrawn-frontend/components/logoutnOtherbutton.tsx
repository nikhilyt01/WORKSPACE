import {LogOut,WandSparkles,ChevronDown, Sparkles, BrainCircuit, Loader2, Trash2} from "lucide-react";
import { useRouter } from "next/navigation";
interface props{
    loadImprove:boolean; 
    loadSolving:boolean;
    handleImprove:()=>void;
    handleSolve:()=>void;
    delchats:()=>void;


} // <Logoutandgroup loadImprove={loadImprove} loadSolving={loadSolving} handle={handleSolve} delchats={delchats}/>
export function Logoutandgroup({loadImprove,loadSolving,handleImprove,handleSolve,delchats}:props){
    const router = useRouter();
    return(
         <div className="absolute z-10 top-20 right-4 flex  items-center gap-2 md:top-4">
            {/* AI Tools Dropdown Button */}
            <div className="relative group">
                <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md transition-all duration-200 ease-in-out hover:from-blue-700 hover:to-purple-700 active:scale-95 flex items-center gap-1"
                >
                    <WandSparkles size={16} /> {/* AI icon */}
                    <span>AI Tools</span>
                    <ChevronDown size={16} className="ml-1 transition-transform duration-200 group-hover:rotate-180" />
                </button>
        
                {/* Dropdown Content */}
                <div className="absolute right-0 mt-2 w-40 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-in-out origin-top-right">
                    <button
                        className="w-full text-left px-3 py-2 text-white font-medium text-sm rounded-t-lg hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center gap-2"
                        disabled={loadImprove}
                        onClick={handleImprove}
                    >
                        {loadImprove ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Improving...
                            </>
                        ) : (
                            <>
                                <Sparkles size={16} /> Improve
                            </>
                        )}
                    </button>
                    <button
                        className="w-full text-left px-4 py-2 text-white font-medium text-sm rounded-b-lg hover:bg-slate-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center gap-2"
                        disabled={loadSolving}
                        onClick={handleSolve}
                    >
                        {loadSolving ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Solving...
                            </>
                        ) : (
                            <>
                                <BrainCircuit size={16} /> Solve
                            </>
                        )}
                    </button>
                </div>
            </div>
        
            {/* Clear Button */}
            <button
                className="bg-slate-800/95 hover:cursor-pointer hover:scale-105 active:scale-95 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md transition-all duration-200 ease-in-out hover:bg-slate-700/50 active:scale-95 flex items-center gap-1"
                onClick={delchats}
            >
                <Trash2 size={16} /> {/* Clear/Trash icon */}
                <span>Clear</span>
            </button>
        
            {/* Logout Button */}
            <button
                className="bg-red-600 hover:cursor-pointer hover:scale-105 active:scale-95 text-white px-3 py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 active:scale-95 transition-all duration-200 ease-in-out flex items-center gap-1"
                onClick={() => { router.push("/dashboard") }}
            >
                <LogOut size={16} /> {/* Logout icon */}
                <span>Logout</span>
            </button>
        </div>

    )
}
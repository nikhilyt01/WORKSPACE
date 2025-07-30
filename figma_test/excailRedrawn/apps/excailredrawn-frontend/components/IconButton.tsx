import { ReactNode } from "react";
interface buttonProps {
    onclick:() => void;
    Icon:ReactNode,
    Activated:boolean,
    size:"lg"|"md"|"sm"
}

export function IconButton({Icon,Activated,onclick,size}:buttonProps){
   
  
    const sizeClass={
        lg:"p-3",
        md:"p-2",
        sm:"p-1"
    }
    return (
    <div className={`rounded-xl p-2 cursor-pointer border  transition-all overflow-hidden duration-200 hover:bg-gray hover:scale-105 active:scale-95
        ${Activated ?"bg-blue-500/50 text-white shadow-lg shadow-blue-500/50 border border-blue-400/50 "
                    :"bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white border border-slate-600/50 hover:border-slate-500/50"}`}  onClick={onclick} >
       {Icon }
    </div>
    )

}
import { ReactNode } from "react";
interface buttonProps {
    onclick:() => void;
    Icon:ReactNode,
    Activated:boolean
}

export function IconButton({Icon,Activated,onclick}:buttonProps){
    return (
    <div className={`rounded-full p-2 cursor-pointer border bg-black hover:bg-gray
        ${Activated ?"text-red-400":"text-white"}`}  onClick={onclick} >
       {Icon}
    </div>
    )

}
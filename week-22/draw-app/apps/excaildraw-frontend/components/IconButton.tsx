import { ReactNode } from "react";


export function Iconbutton({
    icon,onClick,Activated
}:{
    icon:ReactNode,
    onClick:()=> void,
    Activated:boolean
    }) {
        return <div className={`p-2 rounded-full cursor-pointer border bg-black hover:bg-gray 
            ${Activated ? "text-red-400":"text-white"}`}
        onClick={onClick}>
            {icon}
        </div>

    }
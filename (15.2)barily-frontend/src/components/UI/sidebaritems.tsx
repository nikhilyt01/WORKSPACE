import {ReactElement} from "react";

export function SidebarItem({text,Icon}:{
    text:string;
    Icon:ReactElement;
}) {  
    //  but icon has no effect in text color so we used ,fill ="current color"
    return <div 
    className={"flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-100  "}> 
            <div className={"pr-2"}>
                {Icon}
            </div>
            <div >
                {text}
            </div>

    </div>
}

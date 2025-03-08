import {ReactElement} from "react";

export function SidebarItem({text,Icon,onClick,open}:{
    text:string;
    Icon:ReactElement;
    onClick ?:() =>void;
    open?:boolean;
}) {  
    //  but icon has no effect in text color so we used ,fill ="current color"
    return <div  onClick={onClick}       // attched props of onclick which will cause to setfilter
    className={"h-14  mb-2 flex items-center text-white text-xl md:text-2xl py-2 cursor-pointer  hover:bg-gray-500 rounded w-full pl-4 transition-all ease-in-out duration-100  "}> 
            <div className={"pr-2"}>
                {Icon}
            </div>
            {/* text bahar na jayee */}
          {open && <div className=" overflow-hidden " >   
                {text}
            </div>
          }
    </div>
}
 
import { SidebarItem } from "./sidebaritems"
import { YoutubeIcon } from "../../icons/youtubeIcon";
import { TwitterIcon } from "../../icons/twittericon";
import { Logo } from "../../icons/logo";
import { Text } from 'lucide-react';
import {useState,useEffect} from "react";
import { PanelRightOpen,Link2 } from 'lucide-react';
import { Files,LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

 interface filterprop{
    setFilter:(filter:string)=> void;

}
export const Sidebar =({setFilter}:filterprop)=>{
    const [open,setOpen ] =useState(window.innerWidth>1200);
    const [width,setWidth] =useState(window.innerWidth);
    const navigate =useNavigate();

    useEffect(()=>{
        const handleresize =() =>{
            const newWidth =window.innerWidth;
            setWidth(newWidth);
            setOpen(newWidth>1200);

        }

        window.addEventListener("resize",handleresize);

        return () =>{
            window.removeEventListener("resize",handleresize) ;
        };

    },[])

    //LogOut ka functinality
    const handleLogout = ()=>{
        const confirm = window.confirm("Are You Sure You Want To LogOut ?");
        if(confirm){
            localStorage.removeItem("token");
            navigate("/");
           
            

        }
    }


    return <div id="Sbar" className={`h-screen   bg-zinc-800 text-white  fixed top-0 left-0 pl-2 py-8 ${open ? "w-[20vw]" : "w-20"}`}>
        <div id="logo" className={"w-full px-2"}>
            <div className="flex items-center  justify-between h-10 mb-4">

              {open && (<div className="flex items-center text-2xl md:text-3xl font-bold">
                          <div className="text-purple-600 pr-2">
                              <Logo />
                           </div>
                              <div> Scholarly </div>
                        </div> 
                    ) }
            
              <PanelRightOpen onClick={()=>setOpen((prev)=>!prev)} className=" cursor-pointer text-2xl hover:text-slate-300"/>
            </div>


        </div>
        <div className={"pt-4  "}>
            <SidebarItem text="All" Icon={<Text/>} open={open} onClick={()=>setFilter("all")} />
            <SidebarItem text="Twitter" Icon={<TwitterIcon/>} open={open} onClick={()=>{setFilter("Tweets"); }} />
            <SidebarItem text="Youtube" Icon={<YoutubeIcon/>} open={open} onClick={()=>{setFilter("Youtube") ; } }/>
            <SidebarItem text="Documents" Icon={<Files/>} open={open} onClick={()=>{setFilter("Documents") ; } }/>
            <SidebarItem text="WebSite" Icon={<Link2/>} open={open} onClick={()=>{setFilter("Website") ; } }/>
         </div>
         <div className="mt-20 ">
            <SidebarItem text={"LogOut"} Icon={<LogOut/>} open={open} onClick={handleLogout} />

         </div>
    </div>
}
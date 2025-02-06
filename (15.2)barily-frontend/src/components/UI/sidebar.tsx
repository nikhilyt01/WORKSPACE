import { SidebarItem } from "./sidebaritems"
import { YoutubeIcon } from "../../icons/youtubeIcon";
import { TwitterIcon } from "../../icons/twittericon";
import { Logo } from "../../icons/logo";

export const Sidebar =()=>{
    return <div className={"h-screen w-72  bg-zinc-800 text-white border-r fixed top-0 left-0 pl-6"}>
        <div className={"text-3xl flex items-center pt-8"}>
            <div className="text-purple-600 pr-2">
               <Logo />
            </div>
            Brainly
        </div>
        <div className={"pt-4 pl-4 "}>
            <SidebarItem text="Twitter" Icon={<TwitterIcon/>} />
            <SidebarItem text="Youtube" Icon={<YoutubeIcon/>} />
         </div>
    </div>
}
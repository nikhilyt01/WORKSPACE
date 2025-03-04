import {Logo} from "../../icons/logo" ;
import { FaArrowRightLong } from "react-icons/fa6";
import { Button1 } from "./Button1";
import {useNavigate} from "react-router-dom";

export function Headers(){
    const navigate= useNavigate();
    return (
        <div className="flex justify-between items-center ">
             <div className="flex items-center gap-2 text-lg font-semibold">
                <Logo />
                <div className="italic text-2xl font-semibold">Scholarly</div>

             </div>

             <div className="hidden gap-10 md:flex ">
                <button  className="text-gray-300 cursor-pointer hover:text-gray-50" onClick={()=>navigate("/random-url")} >About</button>
                <button  className="text-gray-300 cursor-pointer hover:text-gray-50" onClick={()=>navigate("/random-url")}>Contact</button>
                <button className="text-gray-300 cursor-pointer hover:text-gray-50" onClick={()=>navigate("/random-url")}>New Updates</button>

             </div>

             <div className="flex gap-2">
                <Button1 text={"Signup"} onClick={()=> navigate("/signup")} variate={"bg-zinc-200 hover:bg-zinc-300 text-black cursor-pointer border shadow-lg shadow-slate-500/50  "}></Button1>
                <Button1 text={"Login"} onClick={()=>navigate("/signin")} variate={"bg-blue-500 hover:bg-blue-600 border-none cursor-pointer text-white shadow-lg shadow-cyan-500/50"} icons={<FaArrowRightLong/>}></Button1>

             </div>

        </div>
    )

}

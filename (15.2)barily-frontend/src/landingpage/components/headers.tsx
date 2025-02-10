import {Logo} from "../../icons/logo" ;
import { FaArrowRightLong } from "react-icons/fa6";
import { Button1 } from "./Button1";
import {useNavigate} from "react-router-dom";

export function Headers(){
    const navigate= useNavigate();
    return (
        <div className="flex justify-between items-center">
             <div className="flex items-center gap-2 text-lg font-semibold">
                <Logo />
                <div>Scholarly</div>

             </div>

             <div className="hidden gap-10 md:flex ">
                <a href="#about">About</a>
                <a href="#contact">contact</a>
                <a href="#updates">new updates</a>

             </div>

             <div className="flex">
                <Button1 text={"Get Started"} onClick={()=> navigate("/signup")} variate={"bg-zinc-100 border "}></Button1>
                <Button1 text={"Login in"} onClick={()=>navigate("/signin")} variate={"bg-blue-500 border text-white"} icons={<FaArrowRightLong/>}></Button1>

             </div>

        </div>
    )

}

import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protected =({children}:{children:React.ReactNode})=>{
    const navigate =useNavigate();

    const tokenisvalid =(token:string):boolean=>{
        try{
        const decode = jwtDecode(token) as {exp:number} ;
        const currdate= Math.floor(Date.now()/1000);  // current time /1000 seconds me time dega n then exp bhi sec me hi hai
        return decode.exp > currdate ;
        }catch(e){
            return false;
        }

    }
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(!token || !tokenisvalid(token)){
            localStorage.removeItem("token");
            navigate("/test")

        }

    },[navigate])  // so ye har bar new navigate use kre its good practice

    return(
        <>{children}</>
    )
}
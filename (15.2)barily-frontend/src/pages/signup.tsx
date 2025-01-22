import { InputBox } from "../components/UI/inputbox";
import { Button } from "../components/UI/Button";
import { Backend_url } from "../config";
import {useRef} from "react";
import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Signup(){
    const UsernameRef= useRef<HTMLInputElement>();
    const PasswordRef = useRef<HTMLInputElement> ();
    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

   async  function  signup(){
       setLoading(true)
       const username= UsernameRef.current?.value;
       const password = PasswordRef.current?.value;
       try{ await axios.post(Backend_url+"/api/v1/signup",{
        username,
        password
       })
        alert ("you have signed in ")
      }catch(e){
        console.error("signup error:",e)
        
      }finally{
        setLoading(false);
        navigate("/signin");
      }
    }

    return <div className={"h-screen w-screen bg-gray-200 flex justify-center items-center"}>
                <div className={"bg-white rounded-xl border min-w-48 p-8 "}>
                    <InputBox reference={UsernameRef} placeholder={"username"}/>
                    <InputBox reference={PasswordRef} placeholder={"password"} />
                    <div className={"flex justify-center pt-4"}>
                    <Button onClick={signup} variate="primary" size="md" 
                    loading={loading} text={"Signup"} fullwidth={true} />
                    </div>
                </div>
    </div>
}
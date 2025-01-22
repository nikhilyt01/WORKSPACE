import { InputBox } from "../components/UI/inputbox";
import { Button } from "../components/UI/Button";
import {useRef} from "react"
import axios from "axios";
import { Backend_url } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export  function Signin(){
    const navigate = useNavigate();
    
   const [loading,setLoading] = useState(false);

    const UsernameRef= useRef<HTMLInputElement>();
    const PasswordRef = useRef<HTMLInputElement>();
    async function signin(){
        setLoading(true);
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        try{const response = await axios.post(Backend_url+"/api/v1/signin",{
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
    }catch(e){
        console.error("signin error :",e)
    }finally{
        setLoading(false);
        navigate("/Dashboard")
    
    }

    }
    return <div className={"h-screen w-screen bg-gray-200 flex justify-center items-center"}>
                <div className={"bg-white rounded-xl border min-w-48 p-8 "}>
                    <InputBox reference={UsernameRef} placeholder={"username"}/>
                    <InputBox reference={PasswordRef} placeholder={"password"} />
                    <div className={"flex justify-center pt-4"}>
                    <Button  onClick={signin} variate="primary" loading ={loading} size="md" text={"Signin"} fullwidth={true} />
                    </div>
                </div>
    </div>
}
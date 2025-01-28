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

    const UsernameRef= useRef<HTMLInputElement|null>(null);
    const PasswordRef = useRef<HTMLInputElement|null>(null);

    async function handlesignin(){
        setLoading(true);
        const username = UsernameRef.current?.value;
        const password = PasswordRef.current?.value;
        try{
            const response = await axios.post(`${Backend_url}/api/v1/signin`,{
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        alert(response.data.message)
        navigate("/Dashboard")
    }catch(e:any){
        const error = e as {response?:{data?:{message?:string}}};
        const errormsg = error.response?.data?.message;
        alert(errormsg)
        
    }finally{
        setLoading(false);
        
    
    }

    }

    return <div className={"h-screen w-screen bg-zinc-900 flex justify-center items-center"}>
                <div className={"bg-zinc-500 rounded-xl border min-w-48 p-8 "}>
                  <h2 className="text-2xl text-center font-bold m-6">SignIn</h2>
                  <form onSubmit={handlesignin}>
                    <div>
                      <label htmlFor="username" className="block font-sm ">username</label>
                      <input id="username"type="text" ref={UsernameRef} required className="w-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    </div>
                    <div>
                      <label htmlFor="password" className="block font-sm ">password</label>
                      <input  minLength={7} id="password" type="password" ref={PasswordRef} required  className="focus:outline-none focus:ring-2  focus:ring-blue-500 w-full px-2 py-1 rounded-1 outline  mb-2"></input>
                    </div>
                    <div>
                      <Button  type="submit" loading={loading} text={loading?"Signing In..":"Sign In"}  variate="primary" size="md"fullwidth={true}  ></Button>
                    </div>
                  
                     <p className="text-sm text-center mt-4">
                      Didn't have account?
                      <a href="/signup" className="text-blue-900  hover:underline"> Sign Up </a>
                     </p>
                  </form>
                </div>
    </div>
}
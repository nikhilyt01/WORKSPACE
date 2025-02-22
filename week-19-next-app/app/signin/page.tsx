"use client"      // whenever we use onClick functionality this is must 

import { useState } from "react";
import axios from  "axios";
import { useRouter } from "next/navigation";

    
export default function Signin(){
    const router = useRouter();
    const [username,setUsername] =useState("");
    const [password,setPassword]=useState("")
    return( <div className="w-screen h-screen flex justify-center items-center ">
                <div className="border p-2  ">
                    <div className="mb-2">
                    <input className="text-gray-700" type="text" placeholder="username" onChange={e => {setUsername(e.target.value)}}></input>
                    </div>

                    <div className="mb-2">
                    <input className="text-gray-700" type="text" placeholder="password" onChange={e => {setPassword(e.target.value)}}></input>
                    </div>

                    <button  className="rounded bg-blue-500 px-2 py-1 " onClick={async()=> {
                       await axios.post("http://localhost:3000/api/v1/signup",{
                            username,
                            password
                        })
                        
                    }}> signin</button>

                </div>

           </div>)

}
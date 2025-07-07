// in this we will send user details like userN and pass so we will use USER that we have set in the UserContextProvider (useContext)

import { useContext, useState } from "react";
import UserContext from "../context/Usercontext";

function Login() {
    const [username,setUsername]=useState("");
    const [pass,setPass]=useState("");

    const {setUser} = useContext(UserContext)
    const handlelogin =(e)=>{
        e.preventDefault();
        setUser({username,pass})
    }
    return (
        <div className=" flex  justify-center items-center">
            <div className="min-w-md bg-gray-200 shadow-lg border-lg flex flex-col gap-2 p-6 rounded-2xl ">
                <h1>Login</h1>
                <input type="text" placeholder="username" className="w-full py-1 rounded-xl bg-zinc-700 outline-none px-2" value={username} 
                  onChange={(e)=> setUsername(e.target.value)}
                 />
                <input type="text" placeholder="password" className="w-full px-4 rounded-xl bg-zinc-700 outline-none" value={pass}
                 onChange={(e)=> setPass(e.target.value)} 
                 />
                <button className=" mx-10 rounded-2xl py-2 bg-blue-500 cursor-pointer active:scale-95 hover:scale-105" onClick={handlelogin}>
                    submit
                </button>

            </div>

        </div>
    )
}
export default Login
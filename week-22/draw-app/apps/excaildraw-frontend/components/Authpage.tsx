"use client";

export function  Authpage({isSignin}:{isSignin:boolean}){

    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="p-2">
               <input type="text"  className="border border-gray-300 rounded px-3 py-2 w-full placeholder-gray-500" placeholder="Email" ></input>
            </div>
            <div className="p-2">
                <input type="password" className="border border-gray-300 rounded px-3 py-2 w-full placeholder-gray-500"  placeholder="password"></input>
            </div>
            <div className="pt-2">
                <button className="bg-red-300" onClick={()=>{

                 }}>{isSignin?"Sign in":"Sign up"}</button>
            </div>
        </div>

    </div>
}
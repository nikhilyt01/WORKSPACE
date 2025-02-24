"use client"
import {useState} from "react";

export  function Button(){
    const [count,setCount]=useState(0);

    return (
        <div>
            <button className="rounded bg-blue-500 px-2 py-1 cursor-pointer hover:bg-blue-600" onClick={()=>setCount((c)=>c+1)}>
                Click me! {count}
            </button>
        </div>
    )
}
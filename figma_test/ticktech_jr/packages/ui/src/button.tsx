"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
// better to use Ui library
// interface buttonProps{   
//     type:"primary" | "secondary";
//     text:string;
//     onClick ?:()=>void;
//     className?: string;
// }
// export const Button =({type,text,onClick,className}:buttonProps)=>{
//     return (
//         <button className={`px-6 py-2 rounded-xl font-bold ${type==="primary"?"bg-orange-500 text-white shadow-lg ":""}
//             ${type==="secondary"?"bg-white text-orange-500 border border-orange-500 shadow-lg ":""} ${className}`} >
//             {text}
//         </button>
//     )

// }

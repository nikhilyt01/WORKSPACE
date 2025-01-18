import { ReactElement } from "react";

 interface Buttonprops{
    variate:"primary" | "secondary";
    size:"sm" | "md" | "lg";
    text : string;
    startIcon?: ReactElement;
    endIcon ?:ReactElement;
    onClick?: () => void;
    fullwidth ? : boolean;
    loading ?:boolean;
 }

 const variateStyles ={
   "primary":"bg-purple-600 text-white ", 
   "secondary":"bg-purple-300 text-purple-600"
 }
 const defaultstyles="rounded-xl p-4 font-light flex items-center";
 const sizestyle={
   "sm":"py-1 px-2",
   "md":"py-2 px-4",
   "lg":"py-2 px-6"
 }

 export const Button = (props:Buttonprops) =>{
    return <button onClick={props.onClick} className={`${variateStyles[props.variate]}  
    ${defaultstyles} ${sizestyle[props.size]} ${props.fullwidth ? " w-full flex justify-center items-center": ""}
    ${props.loading ? " opacity-45" : "" }` } > 

      {props.startIcon && <div className="pr-2">{props.startIcon}</div>}
      <span>{props.text}</span>
      {props.endIcon && <div className="pl-2">{props.endIcon}</div>}
       
    </button>
 }












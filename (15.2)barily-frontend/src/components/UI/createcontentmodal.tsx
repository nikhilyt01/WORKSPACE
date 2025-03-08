
import { CrossIcon } from "../../icons/CrossIcons";
import { Button } from "./Button";
import {InputBox}  from "./inputbox";
import { useRef ,useState} from "react";
import axios from "axios"
import { Backend_url } from "../../config";

enum ContentType{
   Youtube ="youtube",
   Twitter ="twitter",
   Document="Document",
   Links="Links",

 }
 interface props{
   open:boolean;
   onClose:()=>void;
   refresh:()=>void;   // taken mannual-contentrefresh function and then call it afterwards


 }

export function CreateContentModal({open,onClose,refresh}:props){

   const titleRef= useRef<HTMLInputElement>();
   const linkRef=useRef<HTMLInputElement>();
   const [type,setType]= useState(ContentType.Youtube)

   async function addcontent (){
      const title=titleRef.current?.value;
      const link=linkRef.current?.value;
     await axios.post(`${Backend_url}/api/v1/content`,{
         title,
         link,
         type,

      },{ headers: { 
         "Authorization" : localStorage.getItem("token")
      }})
      alert("content added")
      onClose();
      refresh();

   }

   return <div>
  {open && <div>
  <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-20 flex justify-center "> 
  </div> 

   <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center "> 
        <div className={"flex flex-col justify-center"}>
           <span className={"text-center bg-zinc-800 opacity-100 p-4 rounded-lg shadow-lg shadow-cyan-500/50 outline outline-gray-200 "}>
               <div className={"flex justify-end"}>
                  <div onClick={onClose} className={"cursor-pointer text-red-500"}>
                     <CrossIcon />
                  </div>
               </div>
               <div>
                  <InputBox reference={titleRef} placeholder={"title"}/>
                  <InputBox reference={linkRef} placeholder={"link"}/>
              
              </div>
              <h1 className="text-xl font-semibold text-white">Type</h1>
              <div className={"grid grid-cols-2 gap-1 p-4"}>
               <Button text="youtube"  size="lg" variate = {type===ContentType.Youtube ?
               "primary" : "secondary"} onClick={() => {setType(ContentType.Youtube)
               }}></Button>
               <Button text="Twitter" size="lg" variate={type===ContentType.Twitter ? 
                  "primary":"secondary"} onClick={() =>{ setType(ContentType.Twitter)
               } }></Button>
               <Button text="Document" size="lg" variate={type===ContentType.Document ? 
                  "primary":"secondary"} onClick={() =>{ setType(ContentType.Document)
               } }></Button>
                <Button text="Website" size="lg" variate={type===ContentType.Links ? 
                  "primary":"secondary"} onClick={() =>{ setType(ContentType.Links)
               } }></Button>
              </div>
              <div className={"flex justify-center"}>
                    <Button onClick={addcontent} variate="primary" size="lg" text="submit" />
              </div>
           </span>
        </div>

      </div>
 </div> }

 </div>
}



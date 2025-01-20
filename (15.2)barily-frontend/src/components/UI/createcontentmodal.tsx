
import { CrossIcon } from "../../icons/CrossIcons";
import { Button } from "./Button";
import {InputBox}  from "./inputbox";
import { useRef ,useState} from "react";
import axios from "axios"
import { Backend_url } from "../../config";

enum ContentType{
   Youtube ="youtube",
   Twitter ="twitter"

 }

export function CreateContentModal({open,onClose}){

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

   }

   return <div>
  {open && <div>
  <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center "> 
  </div> 

   <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center "> 
        <div className={"flex flex-col justify-center"}>
           <span className={"bg-white opacity-100 p-4 rounded"}>
               <div className={"flex justify-end"}>
                  <div onClick={onClose} className={"cursor-pointer"}>
                     <CrossIcon />
                  </div>
               </div>
               <div>
                  <InputBox reference={titleRef} placeholder={"title"}/>
                  <InputBox reference={linkRef} placeholder={"link"}/>
              
              </div>
              <h1>Type</h1>
              <div className={"flex gap-1 p-4"}>
               <Button text="youtube"  size="lg" variate = {type===ContentType.Youtube ?
               "primary" : "secondary"} onClick={() => {setType(ContentType.Youtube)
               }}></Button>
               <Button text="Twitter" size="lg" variate={type===ContentType.Twitter ? 
                  "primary":"secondary"} onClick={() =>{ setType(ContentType.Twitter)
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



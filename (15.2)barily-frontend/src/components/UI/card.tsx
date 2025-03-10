
import { ShareIcon } from "../../icons/shareicon"
import { Trash2 } from 'lucide-react';
import axios from "axios";
import { Backend_url } from "../../config";
import {  useEffect,ReactNode,useState } from "react";

interface Cardprops {
   id:string;
   link :string;
   title:string;
   type : string;
   date? :string;
   onDelete:() =>void ;  // so we pass  refresh fun as prop to card and then call after content deletion
   icon?:ReactNode;
   disabled?:boolean;  // for shared content show view cann't delete
}
export function Card({id,link,title,type,date,onDelete,icon,disabled}:Cardprops){
 

  useEffect(() => {

    // Reinitialize Twitter widgets after the component mounts or updates
    if (type === "twitter" && (window as any).twttr) {
      (window as any).twttr.widgets.load();          // hardcode it or learn the fun to load tweets fast
    }
  }, [type, link]);

  const deletecontent =async(id:string)=>{
    try{
    const res=await axios.delete(`${Backend_url}/api/v1/content`,{
      data:{contentId:id},              // include contentId in and headers in as delete method requires only 2 attribute
      headers:{
        Authorization:localStorage.getItem("token"),
      }
  })
  alert(res.data.message);
  onDelete(); 
}catch(e:any){
  console.error("error deleting content",e)
}

  }
   

    return <div>
        <div className={"px-4 py-2 bg-zinc-700 rounded-md shadow-md border-gray-300 max-w-72 border min-h-48 min-w-72" } >
           <div className={"flex justify-between "}>
             <div className={"flex items-center"}> 
                
                  <div className={"text-white text-xl pr-2"}>
                    {icon}
                  </div>
                  <div className="text-base font-bold text-white">
                    {type}
                  </div>
                
             </div>

             <div className={"flex items-center "}>

                  <div className={" pr-2 text-white"}>
                     <a href={link} target = "_blank" >
                       <ShareIcon size={"lg"}/>
                     </a>
                  </div>
                  <button disabled={disabled} onClick={()=>deletecontent(id)} className={"cursor-pointer text-gray-300 hover:text-gray-100"}>
                    <Trash2 />
                  </button>
                
             </div>
           

           </div>
           <div id="title" className="text-2xl text-white mt-2 h-8 font-bold overflow-hidden ">
                {title}
           </div>
           <div className="pt-4">
            { type =="youtube" && <iframe className="w-full" 
             src={link.replace("watch","embed").replace("?v=","/")} // it will replace embed in link
             title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; 
             picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
             allowFullScreen></iframe> }

             { type ==="twitter" && <blockquote className="twitter-tweet">
                 <a href={link.replace("x.com","twitter.com")}></a> 
             </blockquote> }

            

            

            {type === "Document"&&(
                     <div>                    
                        <iframe 
                            className="w-full h-80 border rounded-lg shadow-lg"
                            src={link} 
                             title="Embedded Document"
                            
                        ></iframe>
                        <p className="mt-2 text-center cursor-pointer text-blue-400 hover:text-blue-300 font-bold">
                          <a href={link} target="_blank" >Open in Newtab</a>
                        </p>
                      </div>
           )}
           
                {/* to add in embeed causes issue */}
            {type === "Links" &&( <div>            
                  <iframe  className="w-full h-80 border rounded-lg shadow-lg" src={link} title="Embedded Website"
                  ></iframe>

                  <p className="mt-2 text-center text-blue-400 font-bold hover:text-blue-300 cursor-pointer">
                    <a href={link} target="_blank" >Open in NewTab</a>
                  </p>
                  </div>
             )} 


           </div>
             
           <div className="text-gray-50 text-sm  my-2"> Added on {date}</div>
        </div>
        
    </div>
}


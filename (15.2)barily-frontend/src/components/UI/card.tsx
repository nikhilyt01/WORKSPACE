
import { ShareIcon } from "../../icons/shareicon"

interface Cardprops {
   id:any;
   link :string;
   title:string;
   type : "youtube" | "twitter"
}
export function Card({id,link,title,type}:Cardprops){
    return <div>
        <div className={"p-4 bg-white rounded-md shadow-md border-gray-300 max-w-72 border min-h-48 min-w-72" } >
           <div className={"flex justify-between"}>
             <div className={"flex items-center"}> 
                
                  <div className={"text-gray-500 pr-2"}>
                     <ShareIcon size={"md"}/>
                  </div>
                  project Ideas
                
             </div>

             <div className={"flex items-center "}>

                  <div className={" pr-2 text-gray-500"}>
                     <a href={link} target = "_blank" >
                       <ShareIcon size={"md"}/>
                     </a>
                  </div>
                  <div className={"text-gray-500"}>
                    <ShareIcon size={"md"}/>
                  </div>
                
             </div>

           </div>
           <div className="pt-4">
            { type =="youtube" && <iframe className="w-full" 
             src={link.replace("watch","embed").replace("?v=","/")} // it will replace embed in link
             title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; 
             picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
             allowFullScreen></iframe> }

             { type =="twitter" && <blockquote className="twitter-tweet">
                 <a href={link.replace("x.com","twitter.com")}></a> 
             </blockquote> }
           </div>

        </div>
    </div>
}
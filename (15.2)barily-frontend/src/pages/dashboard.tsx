

import { Button } from '../components/UI/Button';
import { Plusicon } from '../icons/plusicons';
import {ShareIcon} from "../icons/shareicon";
import { Card } from '../components/UI/card';
import { CreateContentModal } from '../components/UI/createcontentmodal';
import {useState} from "react"
import { Sidebar } from '../components/UI/sidebar';
import { useContents } from '../hooks/useContents';
import axios from "axios"
import { Backend_url } from '../config';
import { DarkModeToggle } from './darkmode';

export function Dashboard() {
  const [modalopen,setModalopen] =useState(false);
  const contents =useContents();
  

//className={"py-1 pr-4 flex justify-end"}
  return (<div>
         <Sidebar />
     <div className="p-4 ml-72 bg-zinc-900 min-h-screen ">

     
       <CreateContentModal open={modalopen} onClose={()=>setModalopen(false)} />
       <div className={"flex justify-end gap-4"}>
          <Button 
             onClick={()=>setModalopen(true)}
             startIcon={<Plusicon size="lg"/>} 
             size="md" variate="primary" 
             text="Add content"
             >
          </Button>
          <Button onClick={async ()=>{
                const response = await axios.post(`${Backend_url}/api/v1/brain/share`,{
                  share:true
                 },{
                  headers:{
                    "Authorization": localStorage.getItem("token")
                  }
                 })
                 const shareurl=`http://localhost:5173/api/v1/brain/${response.data.hash}`;
                 alert(shareurl)

          }}
          startIcon={<ShareIcon size="lg"/>} size="md" variate="secondary" text="Share brain"></Button>
       </div>
      <div className="flex gap-4 flex-wrap">
         {contents.map(  ({type,link ,title})  => <Card 
                link={link}
                title={title}
                type={type} 
          /> ) } 

          
           
      </div>
      
    </div>
   
</div> )
}
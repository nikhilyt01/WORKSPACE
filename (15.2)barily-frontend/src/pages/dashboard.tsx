

import { Button } from '../components/UI/Button';
import { Plusicon } from '../icons/plusicons';
import {ShareIcon} from "../icons/shareicon";
import { Card } from '../components/UI/card';
import { CreateContentModal } from '../components/UI/createcontentmodal';
import {useState,useEffect,} from "react"
import { Sidebar } from '../components/UI/sidebar';
import { IoDocumentTextOutline, IoLink } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";



import axios from "axios"
import { Backend_url } from '../config';
import { RotateCcw } from 'lucide-react';

interface content1 {
  _id:string,
  title:string;
  type:"youtube"|"twitter";
  link:string;
  userId:string;
}

const icons = [
  { name: "twitter", logo: <FaXTwitter /> },
  { name: "youtube", logo: <AiOutlineYoutube /> },
  { name: "Document", logo: <IoDocumentTextOutline /> },
  { name: "Links", logo: <IoLink /> },  // mistake was that i didn't matched items.name that is from backend
 
];


export function Dashboard() {
  // console.log("Dashboard component re-rendering...");
  const [modalopen,setModalopen] =useState(false);
  const[filter,setFilter] =useState("all");
  const [content1,setContent1] =useState<content1[]>([]);
  const [loading,setLoading] =useState(false);

  const fetchData = async(filter:string) =>{
    setLoading(true);
    try{
      // console.log("fetching data for filter :",filter)
      const res=await axios.get(`${Backend_url}/api/v1/content/${filter}`,{
        headers:{
          Authorization:localStorage.getItem("token"),
        }
      });
      setContent1(res.data.content)

    }catch(e){
      console.error("error fetching content",e);
    }
    setLoading(false);

  }
  // fetch content when filetr change
  useEffect(()=>{
    
    fetchData(filter);

  },[filter]) 

  // to manually fetch content using button
  const refreshMannual =async()=>{
    await fetchData(filter);

  }

  

//className={"py-1 pr-4 flex justify-end"}
  return (<div>
         <Sidebar setFilter={(filter)=>setFilter(filter)}/>
     <div className="p-4  bg-zinc-900 overflow-y-scroll min-h-screen ">

     
       <CreateContentModal refresh={refreshMannual} open={modalopen} onClose={()=>setModalopen(false)} />
       <div className={"flex justify-end gap-4"}>
         <button className="text-white rounded-full px-4 text-sm bg-zinc-500 flex justify-center items-center mb-2" onClick={refreshMannual}><RotateCcw className="h-4 w-4"/> content</button>
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
                 const shareurl=`Go To => /brain/${response.data.hash}`;
                 alert(shareurl)

          }}
          startIcon={<ShareIcon size="lg"/>} size="md" variate="secondary" text="Share brain"></Button>
       </div>

      <div className=" ml-[20vw]  mt-4 gap-4  grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-2">

      {loading ? (<p className=" flex items-center justify-center text-centre text-gray-500 ">Loading...</p>
    ) :(
      content1.map((items)=> { 
        const icon= icons.find((i)=>i.name==items.type)
        return <Card icon={icon? icon.logo:<IoLink/>} onDelete={refreshMannual} id={items._id} link={items.link} title={items.title} type={items.type} date={new Date().toLocaleDateString()}></Card>})
    )}

          {/* filter returns array of object but find direct return 1st matching object
           so if in filter no result found it give empty array but so if we do icon[0].logo it is undefined thatwhy used find and 
           direct used icon.logo as it returns only object */}
      </div>
     
  
      
    </div>
    
   
</div> )
}
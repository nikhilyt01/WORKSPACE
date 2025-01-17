
import './App.css'
import { Button } from './components/UI/Button';
import { Plusicon } from './icons/plusicons';
import {ShareIcon} from "./icons/shareicon";
import { Card } from './components/UI/card';
import { CreateContentModal } from './components/UI/createcontentmodal';
import {useState} from "react"
import { Sidebar } from './components/UI/sidebar';

function App() {
  const [modalopen,setModalopen] =useState(false);

//className={"py-1 pr-4 flex justify-end"}
  return (<div>
         <Sidebar />
     <div className="p-4 ml-72 bg-gray-100 min-h-screen border-2"> 
     
       <CreateContentModal open={modalopen} onClose={()=>setModalopen(false)} />
       <div className={"flex justify-end gap-4"}>
          <Button 
             onClick={()=>setModalopen(true)}
             startIcon={<Plusicon size="lg"/>} 
             size="md" variate="primary" 
             text="Add content"

             >
          </Button>
          <Button startIcon={<ShareIcon size="lg"/>} size="md" variate="secondary" text="Share brain"></Button>
       </div>
      <div className="flex gap-4">
          <Card link="https://x.com/kirat_tw/status/1633685473821425666"
                title="first tweet"
                type="twitter"/>
          <Card link="https://www.youtube.com/watch?v=BK6dGvjDb5c"
                title="first video"
                type="youtube"/>
           
      </div>
      
    </div>
   
</div> )
}

export default App

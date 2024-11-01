import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {usepostTitle} from "./hooks/usefetch"
import {useFetch} from "./hooks/usefetch"

function App() {
  const [currentTab,setCurrentTab]=useState(3);
const {finalData,loading}=useFetch("https://jsonplaceholder.typicode.com/todos/"+currentTab,10);
  
   if(loading){
    return <div>Loading...</div>
   }
  return (<div>
    <button onClick={()=>setCurrentTab(1)}>1</button>
    <button onClick={()=>setCurrentTab(2)}>2</button>
    <button onClick={()=>setCurrentTab(3)}>3</button>
   {JSON.stringify(finalData) }
  </div>
  )

 
}


export default App

import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {usepostTitle} from "./hooks/usefetch"
import {useFetch} from "./hooks/usefetch"
import {usePrev} from "./hooks/usePrev"
function App() {
  const [state,setState]=useState(0);
  const prev=usePrev(state);

  return (
    <div>
      <p>{state}</p>
      <button onClick={()=>{setState((curr)=> curr+1 )}}>click</button>
      <p>the previous value was {prev} </p>
    </div>
  )

 
}


export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [color, setColor] = useState("red");
  const basicc=[
    "red",
    "blue",
    "yellow",
    "green",
  ]


  return (
    <div className="w-screen h-screen  " style={{background:color}}>

     <div className="absolute top-4 left-1/2 transform -translate-x-1/2  px-6 py-2 bg-white rounded-full flex items-center border border-blue-900 gap-4 shadow-lg">
        <div className="flex gap-2">
          {basicc.map( (c) => (
            <button key={c} className="px-4 py-2 outline-none text-white text-bold rounded-full cursor-pointer hover:scale-105 active:scale-95 " style={{backgroundColor:c}} 
            onClick={()=>setColor(c)}>{c}</button>

          ))}

        </div>
      </div>
        
     
     
    </div>
  )
}

export default App

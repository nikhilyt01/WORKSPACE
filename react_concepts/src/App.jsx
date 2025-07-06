import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [count, setCount] = useState(0)

function reduce(){
  setCount((count)=>{
    if(count > 0){
     return  count -1;
    }
   else{
    return count=0;
   }
  })
}
  return (
    <>
      <div>
        
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) =>{
          if(count==20){
            return 20;
          }
          return count +1;
        })}>
          count is increased to :{count}
        </button>
        <br/>
        <br/>
         <button onClick={reduce}>
          count is reduced to: {count}
        </button>
      </div>
     
    </>
  )
}

export default App

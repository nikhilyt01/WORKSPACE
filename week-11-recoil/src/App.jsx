import { useState,memo,useEffect } from 'react'
import { RecoilRoot,atom,useRecoilValue,useSetRecoilState} from "recoil"
import {CounterAtom} from "./store/atoms/counter"

import './App.css'

function App() {
 

  return (
    <>
       <RecoilRoot>
         <Counter />
       </RecoilRoot>
      
    </>
  )
}
function Counter(){
  
  return <div>
  <CurrentCount />
  <Increase  />
  <Decrease  />
  </div>
}
function CurrentCount(){
  const count=useRecoilValue(CounterAtom)
  return <div>
    {count}
  </div>
}
function Increase(){
 const setCount = useSetRecoilState(CounterAtom)
  function increasecount(){
    setCount((curr)=>curr+1)
  }
  return <div>
  <button onClick={increasecount}>increase</button>
  </div>
}
function Decrease(){
  const setCount = useSetRecoilState(CounterAtom)
  function decreasecount(){
    setCount((curr)=>curr -1)
  }
  return <div>
  <button onClick={decreasecount}>decrease</button>
  </div>

}

export default App

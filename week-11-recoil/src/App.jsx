import { useState,memo,useEffect } from 'react'
import { RecoilRoot,atom,useRecoilValue,useSetRecoilState} from "recoil"
import {CounterAtom,evenSelector} from "./store/atoms/counter"

import './App.css'

function App() {
 

  return (
    <>
    <RecoilRoot>
       <Buttons />
       <Counter />
       <IsEven />
    </RecoilRoot>
      
    </>
  )
}
function Buttons(){
  const setCount=useSetRecoilState(CounterAtom)
  function decrease(){
    setCount(c => c-1)

}
function increase(){
  setCount(c => c+2 )
}

  return <div>
    <button onClick={increase}>increase</button>
    <button onClick={decrease}>decrease</button>
  </div>
}
function Counter(){
  const count= useRecoilValue(CounterAtom)
  return <div>
    {count}
  </div>

}
function IsEven(){
  const even= useRecoilValue(evenSelector);
  return <div>
     {even? "even":"odd"}
  </div>
 
}

export default App

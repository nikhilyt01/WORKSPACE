import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useEffect,useRef} from "react";

function App() {
  const [socket,setSocket] = useState();
  const InputRef=useRef();
  

  function sendMessage(){
    if(!socket){
      return ;
    }
    const message = InputRef.current.value;
    // @ts-ignore
    socket.send(message)

  }
useEffect(()=>{
  const ws = new WebSocket("ws://localhost:8080"); // it initiate web socket connect^n on Mount
  setSocket(ws)                      // to send it to function using state

  ws.onmessage = (ev) =>{
    alert(ev.data);
  }

},[])
  

  return (
    <div>
       <input ref={InputRef} placeholder="mesage..." type="text" ></input>
       <button  onClick={sendMessage} >send</button>
    </div>

  )
}

export default App

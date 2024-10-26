import React , {useState} from 'react';
import { PostComponent} from "./post" ;
function App() {
  const [count,setCount]=useState(0);
  function increment(){
    setCount(count+1)

  }
  return <div >
    {/* coz span is not allowing width n height adjusts */}
    <div style={{display:'flex'}}> 
       <div style={{backgroundColor:"red",borderRadius:20,width:20,height:25,paddingLeft:10,paddingTop:7}}>
          {count}
       </div>
    </div>
    <img style={ {cursor:"pointer"}} 
    src={"https://cdn-icons-png.flaticon.com/128/1827/1827422.png"} width={50}
    /> 
    <button onClick={increment}>increase count</button>
  </div>
     
   
}




export default App

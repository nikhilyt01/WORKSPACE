import  {useState,useEffect} from 'react';
import { PostComponent} from "./post" ;
const App=() => {
  return <div style={{display:"flex",backgroundColor:"grey"}}>

    <Card >
    <div>
      what do u want to add <br/>
      <input type={"text"}  />
    </div>
    </Card>
    
    <Card>
      hi there
    </Card>

  </div>
  
}
function Card({children}){
  return <div style={{backgroundColor:"white",borderRadius:10,padding:10,margin:10}}>
    {children}
  </div>

}






export default App
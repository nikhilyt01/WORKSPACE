import  {useState,useEffect} from 'react';
import { PostComponent} from "./post" ;
function App() {
  const [showtimer,setShowtimer]=useState(true);

  useEffect(function(){
    setInterval(function(){
      setShowtimer(prevval =>!prevval)

    },5000)

  },[])

return <div>
  {showtimer && <Timer/>}
</div>
}

const Timer= function(){
   const [seconds,setSeconds]=useState(0);

   useEffect(function(){
    let clock=setInterval(() => {
      console.log("from inside the clock")
      setSeconds(currvalue => currvalue + 1)
     }, 1000);

     return function(){
      clearInterval(clock)
     }


   },[])
   return <div> {seconds} seconds elapsed</div>
}





export default App
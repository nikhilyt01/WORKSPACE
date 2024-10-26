import  {useState,useEffect} from 'react';
import { PostComponent} from "./post" ;
function App() {
const [count,setCount]=useState(1);
const [count1,setCount1]=useState(1);

function increasecount(){
  setCount(function(currval){
    return currval+1;
  });
  
}
function decreasecount(){
  setCount1(function(currval){
    return currval-1;
  })
}
useEffect(function(){
  console.log("above setinterval")
  setInterval(increasecount,1000);
  setInterval(decreasecount,1000);
},[])
useEffect(function(){
  console.log("count is updated")
},[count,count1])

return <div>
  {count} {count1}
</div>
     
   
}




export default App

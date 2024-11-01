import {useEffect,useState,useRef} from "react"
export const usePrev = (value) => {
    const ref=useRef();
    console.log("re render happened with new value "+ value)

    useEffect(()=>{
        console.log("updated ref to "+ value)
        ref.current=value;
    },[value])
    
  console.log("returned "+ ref.current)  
  return ref.current;

}
// it return first ,effect gets called later
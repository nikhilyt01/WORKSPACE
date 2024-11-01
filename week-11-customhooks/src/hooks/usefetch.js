import {useState,useEffect} from "react"

export function  usepostTitle(){
    const [post,setPost]=useState({}); 

    async function getpost(){
      const response=await fetch("https://jsonplaceholder.typicode.com/todos/3")
      const json= await response.json();
      setPost(json)
    }
  
    useEffect(() =>{
      getpost()
  
    },[])
    return post.title
        
    
}
export function useFetch(url,retrytime){
    const [finalData,setFinalData]=useState({});
    const [loading,setLoading]=useState(true);

   async function getdetails(){
        setLoading(true);
        const response= await fetch(url);
        const json=await response.json();
        setFinalData(json)
        setLoading(false);
    }
 

    useEffect(() =>{
         getdetails();
    },[url])
    useEffect(()=>{
        setInterval(getdetails,retrytime*1000)
    },[])

    


    return {
        finalData,
        loading
    }
}
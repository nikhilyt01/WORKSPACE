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
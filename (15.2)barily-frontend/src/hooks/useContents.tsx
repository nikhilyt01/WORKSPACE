import { useState,useEffect } from "react"
import { Backend_url } from "../config";
import axios from "axios";

export function useContents(){
    const [contents,setContents] =useState([]);
    function refresh () {
        axios.get(`${Backend_url}/api/v1/content`,{
            headers:{
                "Authorization": localStorage.getItem("token")

            }
        }) 
        .then( (response)=>{
            setContents(response.data.content)})
    }

    useEffect(() =>{
        refresh();
        let interval= setInterval(( ) => {
            refresh()
        },10 *1000)


        return () =>{
            clearInterval(interval);
        }
    
    },[])

    return contents;
    
}
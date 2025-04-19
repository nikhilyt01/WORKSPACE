import {useRef,useEffect} from "react"
import { initDraw } from "@/draw";
import { RoomCanvas } from "@/components/Roomcanvas";

export default async function Canvaspage({params}:{
  params : {              // this just extracts the roomId params
     roomId:string
  }
}){
    const roomId=(await params).roomId

    return <RoomCanvas roomId={roomId}/>

}
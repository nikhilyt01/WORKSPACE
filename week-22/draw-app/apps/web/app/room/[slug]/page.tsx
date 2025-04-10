import axios from "axios"
import { Backend_url } from "../../config"
import { ChatRoom } from "../../../components/chatroom";

async function getRoom(slug:string){
   const response=await  axios.get(`${Backend_url}/room/${slug}`)
   return response.data.room.id;  
}


export default async function ChatRoom1({
    params
}:{
    params: {
        slug:string
   }
})  {
    const slug=(await params).slug;
    const roomId=await getRoom(slug)

    return <ChatRoom id={roomId} ></ChatRoom>

}
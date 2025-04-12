import axios from "axios"
import { Backend_url } from "../../config"
import { ChatRoom } from "../../../components/chatroom";

async function getRoom(slug:string){
    try{
   const response=await  axios.get(`${Backend_url}/room/${slug}`)
   return response.data.room.id;
    }catch(e){
        console.error("Failed to fetch id",e);
        return null;
    }
}


export default async function ChatRoom1({
    params
}:{
    params: {
        slug:string
   }
})  {
    const slug= (await params).slug;
    const roomId=await getRoom(slug)

    return <ChatRoom id={roomId} ></ChatRoom>

}


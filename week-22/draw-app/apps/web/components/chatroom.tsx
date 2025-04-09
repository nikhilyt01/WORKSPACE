import axios from "axios";
import { Backend_url } from "../app/config";

async function getChats(roomId:string){
    const response= await axios.get(`${Backend_url}/chats/${roomId}`)
    return response.data.message
}

export async function ChatRoom({id}:{
    id:string
}){
    const messages =await getChats(id);

}
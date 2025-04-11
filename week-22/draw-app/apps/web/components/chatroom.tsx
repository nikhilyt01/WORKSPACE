import axios from "axios";
import { Backend_url } from "../app/config";
import { ChatRoomClient } from "./chatroomClient";

async function getChats(roomId:string){
    const response= await axios.get(`${Backend_url}/chats/${roomId}`)
    return response.data.message
}

export async function ChatRoom({id}:{
    id:string
}){
    const messages =await getChats(id);
    return <ChatRoomClient id={id} messages={messages}></ChatRoomClient>

}
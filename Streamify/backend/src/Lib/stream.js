import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey=process.env.STEAM_API_KEY;
const apiSecret=process.env.STEAM_API_SECRET
if(!apiKey || !apiSecret){
    console.error("stream api key or secret is missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);
export const upsertStreamUser = async(userData)=>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData

    }catch(error){
        console.log("error in upserting user :",error.message);
    }

}

export const generateStreamToken=(userId)=>{}
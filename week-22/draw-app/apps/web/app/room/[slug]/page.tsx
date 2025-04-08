import axios from "axios"
import { Backend_url } from "../../config"

async function getRoom(slug:string){
   const response=await  axios.get(`${Backend_url}/room/${slug}`)
   return response.data.id;
}

interface paramss{
    slug:string
}
export default async function ChatRoom({
    params

}:{params:{
    slug:string
   }
})  {
    const slug=params.slug;
    const roomId=await getRoom(slug)

}
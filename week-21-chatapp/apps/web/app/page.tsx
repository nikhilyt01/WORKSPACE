"use client"
import { TextInput } from "@repo/ui/text-input";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const Router = useRouter()
  return (
  
    <div style={{
      background:"black",
      height:"100vh",
      width:"100vw",
      display:"flex",
      justifyContent:"center",
      justifyItems:"center"
    }}>
      <div style={{
        display:"flex",
        justifyContent:"center",
        flexDirection:"column"
      }}>
        <TextInput size="small" placeholder="room name"></TextInput>
        <button onClick={()=>Router.push("/chat/123")} >join room</button>
      </div> 
    </div>
  );
}

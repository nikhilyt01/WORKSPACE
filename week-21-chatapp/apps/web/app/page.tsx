import { TextInput } from "@repo/ui/text-input";

export default function Home() {
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
        <button >join room</button>
      </div> 
    </div>
  );
}

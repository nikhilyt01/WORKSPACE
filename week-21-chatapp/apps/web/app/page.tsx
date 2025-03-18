import { TextInput } from "@repo/ui/input";

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
        <input type="text"></input>
        <button >join room</button>
      </div> 
    </div>
  );
}

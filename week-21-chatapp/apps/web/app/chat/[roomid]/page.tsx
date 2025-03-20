import { TextInput } from "@repo/ui/text-input";

export default function (){
    return <div style={{
        height:"100vh",
        width:"100vw",
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column"
    }}>
                <div>
                  Chat room 
                </div>
                <div>
                    <TextInput size="big" placeholder="char here"></TextInput>
                </div>
    </div>
}
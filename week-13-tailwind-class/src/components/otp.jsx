import {useRef,useState} from "react"
export const Otpcomponent=()=>{
    const ref1= useRef();
    const ref2=useRef();
    const ref3=useRef();
    const ref4=useRef();
    const ref5=useRef();
    const ref6=useRef();
    return <div className="flex justify-center">
        
        <Otp reference={ref1} onDone={()=>{ 
            ref2.current.focus()
            }} />
        
        <Otp reference={ref2} onDone={()=>{ ref3.current.focus()}} />
        <Otp reference={ref3} onDone={()=>{ ref4.current.focus()}}/>
        <Otp reference={ref4} onDone={()=>{ ref5.current.focus()}}/>
        <Otp reference={ref5} onDone={()=>{ ref6.current.focus()}} />
        <Otp reference={ref6} onDone={()=>{ ref6.current.focus()}} />

    </div>
}


function Otp({reference,onDone}){
    const [inputval,Setinputval]= useState("");
    return <div>
        <input ref={reference} type="text" className="w-[40px] h-[50px] rounded-2xl m-1 
        bg-blue-500 outline-none px-4" onChange={(e)=>{
            const value=e.target.value;
            if(value=="1"|value=="2"|value=="3"|value=="4"|value=='5'|value=="6"|value=="7"|value=="8"|value=="9"|value=='0'){
                Setinputval(value);
                onDone();

            }
            else{

            }
        }}></input>
    </div>
}
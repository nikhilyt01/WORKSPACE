

interface buttonProps{
    type:"primary" | "secondary";
    text:string;
    onClick ?:()=>void;
    className?: string;
}
export const Button =({type,text,onClick,className}:buttonProps)=>{
    return (
        <button className={`px-6 py-2 rounded-xl font-bold ${type==="primary"?"bg-orange-500 text-white shadow-lg ":""}
            ${type==="secondary"?"bg-white text-orange-500 border border-orange-500 shadow-lg ":""} ${className}`} >
            {text}
        </button>
    )

}
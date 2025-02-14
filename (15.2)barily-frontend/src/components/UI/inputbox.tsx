interface InputProps {
    placeholder: string;
    reference? :any
}

export function InputBox({reference,placeholder}:InputProps){
    return <div>
        <input  ref={reference} placeholder={placeholder} type={"text"} 
        className={"px-4 py-2 border rounded m-2 bg-zinc-600 text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 "} ></input>
    </div>
}

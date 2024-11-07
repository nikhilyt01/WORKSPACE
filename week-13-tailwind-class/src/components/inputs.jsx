export const Input=({
    type,
    placeholder,
    onClick}) => {
    return <span onClick={onClick} className={` rounded-xl px-2
    py-2 text-white cursor-pointer bg-blue-200 `} >
        <input type={type} placeholder={placeholder}
        className="bg-blue-200 outline-none"></input>
    </span>
}
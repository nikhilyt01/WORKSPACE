export const Button=({
    disabled,
    children,
    onClick}) => {
    return <span onClick={onClick} className={` rounded-2xl px-20
    py-4 text-4xl text-white cursor-pointer ${disabled? "bg-blue-200":"bg-green-400" } `}>
        {children}
    </span>
}
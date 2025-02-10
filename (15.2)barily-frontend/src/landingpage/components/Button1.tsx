import { ReactElement } from "react"
interface buttonprops {
    text : string,
    icons?:ReactElement,
    onClick ?:()=> void,
    variate:string

}

export const Button1 = ({text,icons,onClick,variate}:buttonprops) =>{
    return (
        <div>
             <div onClick={onClick} className={`${variate} flex items-center gap-2 rounded-full px-4 py-2`}>
                <div>{text}</div>
                {icons}

            </div>
            
        </div>
    )

}


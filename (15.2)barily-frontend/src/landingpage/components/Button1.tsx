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
            { onClick ?( <div onClick={onClick} className={`${variate} flex items-center rounded-full px-4 py-2`}>
                <div>{text}</div>
                {icons}

            </div>) 
            :(<div className={`${variate} flex items-center rounded-full px-4 py-2`}>
                <div>{text}</div>
                {icons}

            </div>)
            }
            
        </div>
    )

}

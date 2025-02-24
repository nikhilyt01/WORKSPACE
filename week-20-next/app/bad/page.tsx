// made server component so removed onClick which is part of server and  also no State ,effect 
// if ther it will be Client so moved all to components folder  
// only the button part is client component and rest is server componet gfg

import { Button } from "@/components/button";

export default function(){
    return <div>
        hellow
        <Button/>
    </div>
}
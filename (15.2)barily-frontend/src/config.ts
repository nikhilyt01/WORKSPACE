export const Backend_url ="http://localhost:3000"






export function name() =>{
return <div>
{open && <div>
    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center "> 
    </div>
    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0  flex justify-center "> 
            <div className={"flex flex-col justify-center"}>
                     <span className={"bg-white opacity-100 p-4 rounded"}>
                         <div className={"flex justify-end"}>
                            <div onClick={onClose} className={"cursor-pointer"}>
                               <CrossIcon />
                            </div>
                         </div>
                         <div>
                            <InputBox placeholder={"title"}/>
                            <InputBox placeholder={"link"}/>
                        
                        </div>
                        <div className={"flex justify-center"}>
                              <Button variate="primary" size="lg" text="submit" />
                        </div>
                     </span>
            </div>
    </div>
    
    

</div> }





}

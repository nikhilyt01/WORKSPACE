


import { useNavigate } from "react-router-dom"

export const UnAuth = ()=>{
    const navigate =useNavigate();
    return (
        <div className="h-full w-full fixed inset-0 bg-zinc-900 flex justify-center items-center">
        
            <div className=" max-w-sm rounded-xl shadow-lg shadow-cyan-900/50  outline outline-1 outline-white bg-zinc-800 text-center p-4 ">
              <h2 className="text-bold font-bold text-red-500 text-3xl mb-2"> Access Denied !</h2>
              <p className="text-md font-semibold text-white">You Do not seems to Be Authentic user or token must be expired Try Again Later</p>
              <div className="my-4 text-center">
                <button onClick={()=>navigate("/")} className="rounded px-4 py-1 bg-blue-500 text-white cursor-pointer hover:bg-blue-600" >
                     Go Home
                </button>

              </div>

            </div>
        

        </div>
    )
}
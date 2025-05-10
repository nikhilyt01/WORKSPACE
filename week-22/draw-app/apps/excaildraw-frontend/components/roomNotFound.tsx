
import { useRouter } from "next/navigation"
export const Errorpage = ()=>{
    const router=useRouter()
    return (
        <div className="h-full w-full fixed inset-0 bg-zinc-900 flex justify-center items-center">
        
            <div className="max-w-md rounded-xl shadow-lg shadow-cyan-900/50  outline outline-1 outline-white bg-zinc-800 text-center p-4 ">
              <h2 className="text-bold font-bold text-red-500 text-3xl mb-2"> Error 404 !</h2>
              <p className="text-md font-semibold text-white">Sorry , Room You Are Looking For Does not Exists or you may not be authentic Room admin .please Enter a valid ROOM ID!</p>
              <div className="my-4 text-center">
                <button onClick={()=>router.push("/")} className="rounded px-4 py-1 bg-blue-500 text-white cursor-pointer hover:bg-blue-600" >
                     Go Home
                </button>

              </div>

            </div>

        </div>
    )
}
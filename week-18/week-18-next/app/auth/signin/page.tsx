
export default function Signin(){
    return (<div className="h-screen bg-zinc-900 flex justify-center items-center">
        <div >
            <div className="border rounded-lg bg-zinc-800 max-w-sm  p-6 ">
                <div className="text-gray-50 mb-4 text-center font-bold text-3xl">Signin</div>
                <div className="mb-2">
                    <label htmlFor="username" className="block text-sm" >username</label>
                    <input id="username" type="text" placeholder="nikhil@xyz" className="outline-none  w-full mt-1 focus:rounded focus:ring-2 focus:ring-blue-500  bg-zinc-700 text-gray-300" required></input>
                </div>

                <div className="mb-4">
                    <label htmlFor="pass" className="block text-sm" >password</label>
                    <input id="pass" type="password" placeholder="12332" className="outline-none  w-full mt-1 focus:rounded focus:ring-2 focus:ring-blue-500  bg-zinc-700 text-gray-300" required></input>
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 shadow shadow-cyan-500/50">Signin</button>
                </div>

                
             
            </div>

        </div>

    </div>)
}
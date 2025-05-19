import Image from "next/image"
import { Button } from "@/components/button"


export default function login(){
    
    return (
        <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
            <Image
             src="/bluebg.jpg"
             fill
             alt="bg"
             className="object-cover "
            />
            <div className="absolute z-10">
                <Form/>
            </div>
           

        </div>

    )
}

function Form(){
    return <div className="bg-white max-w-xl p-10 rounded-4xl shadow-2xl  mt-20">
        <div className="mb-8"><h1 className="text-2xl text-black font-bold ">LOGIN</h1></div>
        <div className="mx-4">
            <input type="text" placeholder="Username" className="w-full px-4 py-2 bg-gray-100 rounded-full text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8" />
            <input type="text" placeholder="Password" className="w-full px-4 py-2 bg-gray-100 rounded-full text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" />
        </div>
        {/* check list part */}
        <div className="flex items-center justify-between px-6">
                <div className="flex items-center space-x-2">
                    <input 
                       type="checkbox" 
                       id="terms-checkbox"
                       className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="terms-checkbox" className="text-gray-700">
                        Remember me
                    </label>
                </div>
                <div>
                    <h1 className="text-gray-700 underline font-semibold">Forgot Password ?</h1>
                </div>

        </div>
        {/* buttons */}
        <div className="text-center my-10 ">
            <Button text={" Cancel "} type={"secondary"} className={"mr-6"} />
            <Button text={" Login "} type={"primary"} />

        </div>

    </div>
}


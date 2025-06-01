import Image from "next/image"
import { Button } from "@/components/button"
export default function dashmain(){
    return(
        <div className="Relative bg-gray-100 flex flex-col min-h-screen">
            <header className="absolute inset-0 z-0 w-full h-64">
                             <Image
                                src="/child1.jpg"
                                alt="Form background"
                                fill
                                className="object-cover "
                             />
            </header>
            <div className="Relative mt-90 ">
                <Card/>
            </div>
            <footer >
                <div className="text-center bg-blue-500 h-64 ">
                        <p className="text-center text-white pt-30 ">@2025 ,TickTech_Jr.All Rights Reserved</p>
                </div>

            </footer>
            <div className=" absolute inset-0 z-10 text-center bg-white h-24 w-full ">
                <div className="flex justify-end mr-12">
                    <div className="grid grid-cols-2 gap-4 pt-10">
                        <p className="text-orange-500 font-bold text-xl"> View Dashboard </p>
                        <p className="text-gray-500 font-bold text-xl"> welcome James </p>
                        

                    </div>

                </div>
            </div>

        </div>
    )
}

function Card (){
    return <div className="max-w-3xl mx-auto p-8 px-14 bg-white backdrop-blur-sm rounded-2xl  shadow-2xl mb-10 pb-20">
        <div className="flex justify-end pt-2 mb-4">
            <p className="font-bold text-2xl text-gray-700 pr-6">Jhon mathew</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* course card */}
            <div className="min-w-64 min-h-84 rounded-2xl shadow-2xl flex flex-col ">
                <div className="bg-blue-500 w-full h-42 rounded-t-2xl">
                    <div className="p-4">
                         <h1 className="text-center text-black text-xl">Techie Studio </h1>
                         <p className=" pt-4 pl-24 pr-6 text-sm">No of Modules: 4
                            Course Type: Regular
                            Mode of delivery: Live
                            One-on-one / Group</p>
                     </div>   
                </div>
                <div className=" mt-14">
                    <div className="flex items-center justify-center">
                        <Button text={"Enroll Now"} type={"primary"} />
                    </div>
                </div>

            </div>
             <div className="min-w-64 min-h-64 rounded-2xl shadow-2xl flex flex-col ">
                <div className="bg-blue-500 w-full h-32 rounded-t-2xl"></div>
                <div className=" mt-14">
                     <div className="flex items-center justify-center">
                        <Button text={"Enroll Now"} type={"primary"} />
                    </div>
                </div>

            </div>

        </div>

    </div>
}


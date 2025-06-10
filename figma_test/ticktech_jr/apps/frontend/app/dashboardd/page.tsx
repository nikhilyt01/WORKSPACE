import Image from "next/image"
export default function Dashboard(){
    return (
        <div className="Relative min-h-screen flex flex-col">
            <header className="absolute inset-0 z-0 w-full h-64">
                 <Image
                    src="/header.png" // Replace with your image
                    alt="Form background"
                    fill
                    className="object-cover object-top"
                 />
            </header>
            <div className="bg-gray-100">
                <FormContainer/>
            </div>
            <footer >
                <div className="text-center h-64 bg-blue-600 ">
                   <p className="text-center pt-32">@2025,TickTech_Jr.All Rights Reserved</p> 
                </div>

            </footer>

        </div>
    )

}
// backdrop is effect which also gives postion relative thats why form appears above
function FormContainer(){ 
    return <div className="max-w-3xl mx-auto p-8 bg-white backdrop-blur-sm rounded-lg  shadow-2xl mb-10">
        {/* header */}
        <div className="text-center mt-18 mb-18">
            <h1 className="font-bold text-3xl text-blue-500">TickTech_Jr</h1>
            <h1 className="font-bold text-sm text-orange-500">#online Tech School for Kids </h1>
        </div>
        <div><h1 className="text-2xl font-bold text-black">Parents Details</h1></div>
        {/* form */}
        <div className="grid grid-cols-1 gap-8 md:grid grid-cols-2 p-6 border-b-1 border-gray-300">
            {/* left column part */}   {/*left col ko flex -col for tabular view*/}
            <div className="space-y-4">  {/*equal spacing*/}
                <div>
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input 
                       type="text"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Country You would Like To enroll</label>
                    <input 
                       type="text"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Whatsapp Number</label>
                    <input 
                       type="tel"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Email Address</label>
                    <input 
                       type="email"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">User Name</label>
                    <input 
                       type="number"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div className="flex flex-col">
                    <div className="bg-gray-100 border border-gray-300 rounded-full h-20 w-20"></div>
                    <div className="ml-4 mt-1 underline text-blue-500"> upload</div>

                </div>

            </div>
            {/* right column part */}
            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">CitizenShip</label>
                    <input 
                       type="text"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Number of Kids You would Like To enroll</label>
                    <input 
                       type="number"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Alterative Whatsapp Number</label>
                    <input 
                       type="tel"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Alterative Email Address</label>
                    <input 
                       type="email"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Login Password</label>
                    <input 
                       type="text"
                       className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                </div>
               

            </div>


        </div>
        <h1 className="font-bold text-black text-2xl mt-4">Kid's Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* left part */}
          <div className="space-y-4">
             <div>
                <label className="text-gray-700 block mb-1">Name</label>
                <input
                 type="text"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
             </div>
             <div>
                <label className="text-gray-700 block mb-1">Gender</label>
                <input
                 type="text"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
             </div>
            </div>
             {/* Right */}
          <div className="space-y-4">
             <div>
                <label className="text-gray-700 block mb-1">Age</label>
                <input
                 type="number"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
             </div>
             <div>
                <label className="text-gray-700 block mb-1">Grade</label>
                <input
                 type="text"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
             </div>
            </div>

        </div>
        {/* kids details sec */}
        <p className="ml-8 text-gray-700">Kids login details</p>
        <div className="grid grid-cols-1  rounded-4xl border p-4 border-gray-300 gap-8 md:grid-cols-2 ">
            <div>
                <label className="text-gray-700 block mb-1">User Name</label>
                <input
                 type="text"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
            </div>
            <div>
                <label className="text-gray-700 block mb-1">Password</label>
                <input
                 type="text"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
            </div>

        </div>
            {/* profile pic upload sec */}
         <div className="grid grid-cols-1  gap-8 md:grid-cols-2 p-6 ">
            <div className="flex flex-col">
                <label className="text-gray-700 block mb-1 ml-2">Profile Pic</label>
                    <div className="bg-gray-100 border border-gray-300 rounded-full h-20 w-20"></div>
                    <div className="ml-4 mt-1 underline text-blue-700"> upload</div>
            </div>
             <div>
                <label className="text-gray-700 block mb-1">Course Type</label>
                <input
                 type="number"
                 className="w-full px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
            </div>
         </div>
         <div className="text-center mt-4">
            <p className="text-gray-700">By Registering.I agree with Ticktech_Jr <span className="text-blue-500 hover:underline">Terms & Condition </span> and <span className="text-blue-700 hover:underline">Privacy Policy</span></p>

         </div>
        
    </div>
}
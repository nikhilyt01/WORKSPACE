import { Twitter, Facebook, Instagram } from 'lucide-react'

export const Contact = () => {
  return (<div className="py-10 flex justify-center items-center">
    <div className="max-w-3xl mx-auto px-2 py-4">
        <div className="mb-4">
           <h3 className="font-semibold text-white text-3xl mb-4 ">Contact Information</h3>
           <p className="text-zinc-300 mb-2">Email : scholarly@foryou.com</p>
           <p className="text-zinc-300 mb-2">Phone : +91 9131870000</p>
        </div>

        <div>
        <h1 className="font-semibold text-2xl ">Follow Us</h1>
          <div className="flex gap-2">
            <a href="#"className="bg-gary-300 hover:text-cyan-500"> <Twitter /></a>
            <a href="#" className="bg-gary-300 hover:text-cyan-500"><Facebook /></a>
            <a href="#" className="bg-gary-300 hover:text-cyan-500"><Instagram /></a>


          </div>
          
        </div>
    </div>

  </div>)
}
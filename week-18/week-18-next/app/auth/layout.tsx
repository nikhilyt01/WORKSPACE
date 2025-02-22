import Navbar from "@/components/page";

export default function AuthLayout({children}){
    return <div>
         <Navbar/>
         {children}
    </div>
}
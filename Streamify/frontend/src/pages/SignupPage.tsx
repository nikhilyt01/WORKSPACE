import { ShipWheel } from "lucide-react";
import { useState } from "react";

const SignupPage = () => {
  const [signupData,setSignupData]=useState({
    fullName:"",
    email:"",
    password:"",
  })
  const HandleSignup=(e)=>{
    e.preventDefault();
  }
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 " data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/*SIGUP Form -- left side */}
        <div className="w-full  lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/*Logo+Branding*/}
          <div className="mb-8 flex items-center justify-start gap-2">
            <ShipWheel className="text-primary size-9" />
            <span className="text-3xl  font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
            from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          <div className="w-full">
            <form onSubmit={HandleSignup}>
              <div className="space-y-4 ">
                <div>
                  <h2 className="text-xl font-semibold">Create an Accoount</h2>
                  <p className="text-sm opacity-70">join streamify and start learing now!</p>
                </div>

              </div>
            </form>

          </div>


        </div>
      </div>
    </div>
  )
}

export default SignupPage

import {  useMutation} from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import {  ShipWheel } from "lucide-react";
import { useState } from "react";
import {Link} from "react-router";
import {signup }from "../lib/api";

const SignupPage = () => {
  const [signupData,setSignupData]=useState({
    fullName:"",
    email:"",
    password:"",
  })

  const queryClient=useQueryClient();

  const {mutate:signupMutation,isPending,error}=useMutation({
    mutationFn:signup,
    onSuccess:(data)=>queryClient.invalidateQueries({queryKey:["authUser"]}),
  }) 
  const handlesSignup= (e) =>{
    e.preventDefault();
    signupMutation(signupData);
  }
  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 " data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/*SIGUP Form -- left side */}
        <div className="w-full  lg:w-1/2 p-4 sm:p-8 flex flex-col ">
          {/*Logo+Branding*/}
          <div className="mb-8 flex items-center justify-start gap-2">
            <ShipWheel className="text-primary size-9" />
            <span className="text-3xl  font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r 
            from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>
          {/*error msg if any*/}
          {error && (
            <div className="alert alert-error mb-4">
              <span className="text-sm">{error.response.data.message}</span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handlesSignup}>
              <div className="space-y-4 ">
                <div>
                  <h2 className="text-xl font-semibold">Create an Accoount</h2>
                  <p className="text-sm opacity-70">join streamify and start learing now!</p>
                </div>

                <div className="space-y-3">
                  {/*fullname*/}
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="jhom doe"
                      className="input input-bordered w-full"
                      value={signupData.fullName}
                      onChange={ (e)=>setSignupData({...signupData,fullName:e.target.value}) }
                      required
                    />
                  </div>
                  {/*email*/}
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="jhon@gmail.com"
                      className="input input-bordered w-full"
                      value={signupData.email}
                      onChange={ (e)=>setSignupData({...signupData,email:e.target.value}) }
                      required
                    />
                  </div>
                  {/*password*/}
                  <div className="w-full form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="text"
                      placeholder="******"
                      className="input input-bordered w-full"
                      value={signupData.password}
                      onChange={ (e)=>setSignupData({...signupData,password:e.target.value}) }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">password must be atleast 6 character long</p>
                  </div>
                    <div className=" form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">terms of service</span> and{" "}
                        <span className="text-primary hover:underline">privacy policy</span>
                      </span>
                    </label>
                   </div>

                   <button type="submit" className="btn btn-primary w-full  ">
                    {isPending?(
                      <>
                      <span className="loading  loading-spinner loading-xs"></span>
                      Loading ...
                      </>
                      ):"Create Account"}
                   </button>

                   <div className="text-center mt-4">
                    <p className="text-sm">Alreday have account?{" "}
                      <Link to="/login" className="text-primary hover:underline">
                        Sign In
                      </Link>
                    </p>
                   </div>
                  
                </div>
              </div>
            </form>

          </div>


        </div>
        {/*Image -- right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative  max-w-sm mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
              <p className="opacity-70 text-xs">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage

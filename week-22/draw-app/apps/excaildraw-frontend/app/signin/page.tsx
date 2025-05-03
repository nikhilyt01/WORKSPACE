
"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { http_backend } from "@/config"; // Update path if needed
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Signin() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const res = await axios.post(`${http_backend}/signin`, {
        username,
        password,
      });

      const token = res.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", token);
         
         // Store in cookies for server-side reading
        Cookies.set("token", token, {
        expires: 1, // days
        secure: false,    //when deploying--> process.env.NODE_ENV === "production", // only send over HTTPS in prod
        sameSite: "Lax",
      });
      }
      
      toast.success("Signin successfull",{duration:2000})
      //alert("Signin successful!");
      router.push("/Dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signin failed")
      //alert(err?.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form onSubmit={handleSignin} className="bg-zinc-700 p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <input type="email" ref={usernameRef} placeholder="Email" required className="w-full p-2 rounded bg-zinc-600" />
        <input type="password" ref={passwordRef} placeholder="Password" required className="w-full p-2 rounded bg-zinc-600" />
        <button disabled={loading} type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition">
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <span onClick={() => router.push("/signup")} className="text-blue-400 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

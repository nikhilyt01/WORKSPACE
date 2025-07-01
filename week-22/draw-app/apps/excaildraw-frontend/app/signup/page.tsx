
"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { http_backend } from "@/config";// Update path if needed
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [showpass,setShowpass]=useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();           //prevents default reload
    setLoading(true);

    try {
      const name = nameRef.current?.value;
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      const res = await axios.post(`${http_backend}/signup`, {
        name,
        username,
        password,
      });
      toast.success("Signup successful! Please Sign in.")
      //alert("Signup successful! Please Sign in.");
      router.push("/signin");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Signup failed")
      //alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form onSubmit={handleSignup} className="bg-zinc-700 p-8 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input type="text" ref={nameRef} placeholder="Name" required className="w-full p-2 rounded bg-zinc-600" />
        <input type="email" ref={usernameRef} placeholder="Email" required minLength={6} maxLength={23} className="w-full p-2 rounded bg-zinc-600" />
      <div className="relative">
        <input type={showpass?"text":"password"} ref={passwordRef} placeholder="Password" required minLength={3} maxLength={10} className="w-full p-2 rounded bg-zinc-600" />
          <button
           type="button"
           onClick={()=>setShowpass(!showpass)}            //transform -translate-y-1/2  so that shape comes upside i.e centered
           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
           aria-label={showpass ? "Hide password" : "Show password"}
           >
               {showpass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
      </div>
        
        <button disabled={loading} type="submit" className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <span onClick={() => router.push("/signin")} className="text-blue-400 cursor-pointer hover:underline">
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}

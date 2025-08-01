
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-800  ">
      <form onSubmit={handleSignup} className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 rounded-2xl w-full max-w-sm space-y-6 shadow-2xl border border-zinc-700/50 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-br from-blue-400 to-purple-600 bg-clip-text text-transparent mb-8">Sign Up</h2>
                         {/* bg-gradient-to-br from-color to-color but it gives bg-color so we have to place it on text so use bg-clip-text to cut bg & text-transparent to remove text original colour and show only bg that we set */}
        
        <input 
          type="text" 
          ref={nameRef} 
          placeholder="Name" 
          minLength={5} 
          maxLength={23} 
          required 
          className="w-full p-4 rounded-xl bg-zinc-700/50 border border-zinc-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-zinc-400 text-white outline-none" 
        />
        <input 
          type="email" 
          ref={usernameRef} 
          placeholder="Email" 
          minLength={6} 
          maxLength={23} 
          required 
          className="w-full p-4 rounded-xl bg-zinc-700/50 border border-zinc-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-zinc-400 text-white outline-none" 
        />
        
        <div className="relative">
          <input 
            type={showpass ? "text" : "password"} 
            ref={passwordRef} 
            placeholder="Password" 
            required 
            minLength={3} 
            maxLength={10} 
            className="w-full p-4 pr-12 rounded-xl bg-zinc-700/50 border border-zinc-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-zinc-400 text-white outline-none" 
          />
          <button
            type="button"
            onClick={() => setShowpass(!showpass)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors duration-200"
            aria-label={showpass ? "Hide password" : "Show password"}
          >
            {showpass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <button 
          disabled={loading} 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </span>
          ) : (
            "Sign In"
          )}
        </button>
        
        <p className="text-sm text-center text-zinc-400 pt-4 border-t border-zinc-700/50">
          Don't have an account?{" "}
          <span 
            onClick={() => router.push("/signin")} 
            className="text-blue-400 cursor-pointer hover:text-blue-300 hover:underline transition-colors duration-200 font-medium"
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
    
  );
}

"use client"

import { signOut,signIn, SessionProvider, useSession } from "next-auth/react";


export default function Home() {
 return (
      <SessionProvider> 
              <RealHome/>
      </SessionProvider>

 )
}

function RealHome(){
  const session = useSession();  // to use it we need to wrap it inside usesession provider
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
   
      {session.status=="authenticated"&& <button onClick={()=>signOut()}>LogOut</button>}
      {session.status=="unauthenticated"&& <button onClick={()=>signIn()}>signin</button>}
    </div>
  );
}
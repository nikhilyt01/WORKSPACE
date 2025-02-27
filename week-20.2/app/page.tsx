

import { getServerSession } from "next-auth";
import { signOut,signIn, SessionProvider, useSession } from "next-auth/react";


export default async function Home() {
  const session = await getServerSession();
 return (<div>
      {JSON.stringify(session)}
   </div>
 )
}

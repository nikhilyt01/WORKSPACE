// import { NextRequest, NextResponse } from "next/server";

// export function GET(){
//     return NextResponse.json({message:"hi buddy"})
// }

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


console.log(process.env.NEXTAUTH_SECRET)
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:" Email",
            credentials:{
                username:{label:"username",type:"text",placeholder:"harkirat@gmail.com"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials,req){
               return{
                name:"nikhil",
                id:"1",
                email:"nikhil@gmail.com"
               }
            },
        }),
 
        // just to explore not working
        GoogleProvider({
            clientId: "dfsdjf",
            clientSecret: "dfsbdf"
          }),

      
    ],
    secret:process.env.NEXTAUTH_SECRET
})

export const  GET =handler
export const  POST =handler

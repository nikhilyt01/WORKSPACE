// import { NextRequest, NextResponse } from "next/server";

// export function GET(){
//     return NextResponse.json({message:"hi buddy"})
// }

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:" email",
            credentials:{
                username:{label:"username",type:"text",placeholder:"harkirat@gmail.com"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials,req){
                const username=credentials?.username;
                const password =credentials?.password;
                console.log(username)


                // this will hit DB to check username n password
                const user ={
                    name:"nikhil",
                    id:"1",
                    username:"nikhl@321"
                }
                 if(user){
                     return user;
                 } else{
                    return null;
                 }
            }
        }),
 
        // just to explore not working
        GoogleProvider({
            clientId: "dfsdjf",
            clientSecret: "dfsbdf"
          }),

      
    ]
})

export const  GET =handler
export const  POST =handler

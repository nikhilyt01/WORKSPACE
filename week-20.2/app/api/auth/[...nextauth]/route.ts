// import { NextRequest, NextResponse } from "next/server";

// export function GET(){
//     return NextResponse.json({message:"hi buddy"})
// }

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:"Login with email",
            credentials:{
                username:{label:"username",type:"text",placeholder:"harkirat@gmail.com"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials,req){
                const username=credentials?.username;
                const password =credentials?.password;


                // this will hit DB to check username n password
                const user ={
                    name:"nikhil",
                    id:1,
                    username:"nikhl@321"
                }
                if(user){
                    return user;
                } else{
                    return null;
                }
            }
        })
    ]
})

export const  GET =handler
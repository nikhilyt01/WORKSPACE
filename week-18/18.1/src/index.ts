
import { PrismaClient } from "@prisma/client";

const client =new PrismaClient();

async function CreateClient(){
   const find=await  client.user.findFirst({
    where:{
        id:2
    },
    // select:{           only username and typescript will get automatically that it will be only string or null not the whole user
    //     username:true
    // }
        
    })
    console.log(find);
      
    
}
CreateClient();

//to create 
// await  client.user.create({
//     data:{
//         username:"nikhil",
//         password:"12332",
//         age:21,
//         city:"aligarh"

//     }
// })
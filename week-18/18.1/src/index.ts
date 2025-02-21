
import { PrismaClient } from "@prisma/client";

const client =new PrismaClient();

async function CreateClient(){
  await  client.user.create({
    data:{
                username:"nikhil",
                password:"12332",
               age:21,
                city:"aligarh"
    
             }
   
        
    })
   
      
    
}
CreateClient();



import {z} from "zod";

export const CreateUserSchema =z.object({
    username:z.string().min(3).max(23),
    password:z.string().min(2).max(10),
    name:z.string()

})

export const SigninSchema= z.object({
    username:z.string().min(3).max(23),
    password:z.string().min(2).max(10),
   
})
export const CreateRoomSchema=z.object({
    name:z.string().min(3).max(20)

})
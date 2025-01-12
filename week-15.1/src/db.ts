import mongoose,{model,Schema} from "mongoose" ;
import { isJSDocThisTag } from "typescript";
import dotenv from 'dotenv';
dotenv.config();
const Mongourl=process.env.Mongo_url

if(!Mongourl){
    throw new Error("mongo_url is not defined in .env file");
}
mongoose.connect(Mongourl)
    .then(()=>console.log("connected to string"))
    .catch((error)=>console.log("mongo connecetion error",error));

const UserSchema=new Schema ({
    username:{type:String,unique:true},
    password:String
})

export const usermodel= model("user",UserSchema)

const ContentSchema = new Schema ({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tags'}],
    userId:{type:mongoose.Types.ObjectId,ref:'user',required:true},
}) 
export  const contentmodel= model("content",ContentSchema);

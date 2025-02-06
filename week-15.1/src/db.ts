import mongoose,{model,Schema} from "mongoose" ;
import dotenv from 'dotenv';
import { error } from "console";
dotenv.config();
const Mongourl=process.env.Mongo_url

export const mongooconnect= async( ) =>{

if(!Mongourl){
    throw new Error("mongo_url is not defined in .env file");
}
try{
  await mongoose.connect(Mongourl)
  console.log("connected to mongodb")
}catch(e){
    console.error("connection error to mongodb",e);
    throw error; // to handle in start server so it goes to catch of it
}

    

}

const UserSchema=new Schema ({
    username:{type:String,unique:true},
    password:String
})


const ContentSchema = new Schema ({
    type:String,
    link:String,
    title:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tags'}],
    userId:{type:mongoose.Types.ObjectId,ref:'user',required:true},
}) 
const Linkschema= new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:"user",required:true,unique:true}


})
export const usermodel= model("user",UserSchema);
export  const contentmodel= model("content",ContentSchema);
export const linkmodel = model("link",Linkschema);


// {
// "username":"nikhil2", test of content
// "password":"letsgo2"
// }

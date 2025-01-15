import mongoose,{model,Schema} from "mongoose" ;
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


const ContentSchema = new Schema ({
    type:String,
    link:String,
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

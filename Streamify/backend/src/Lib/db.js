import mongoose from "mongoose";

export const connectDB= async()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to Db ${conn.connection.host}`);    
    }catch(error){
        console.log("error connecting to Db",error);
        process.exit(1);

    }
}
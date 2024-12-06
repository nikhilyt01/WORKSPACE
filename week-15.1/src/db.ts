import mongoose,{model,Schema} from "mongoose" ;
mongoose.connect("mongodb+srv://nikhil0808yt:E9bliQgzUPiW0rzX@cluster0.x0cfi.mongodb.net/")

const UserSchema=new Schema ({
    username:{type:String,unique:true},
    password:String
})

export const usermodel= model("user",UserSchema)

const ContentSchema = new Schema ({
    title:String,
    link:String,
    tags:{type:mongoose.Types.ObjectId,ref:'Tags'},
    userId:{type:mongoose.Types.ObjectId,ref:'user',required:true},
})
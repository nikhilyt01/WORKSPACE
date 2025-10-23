import mongoose from "mongoose";

const friendrequestSchema = new mongoose.Schema({
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending",
    }

},{ timestamps: true });

const FriendRequest=mongoose.model("FriendRequest",friendrequestSchema);
export default FriendRequest;
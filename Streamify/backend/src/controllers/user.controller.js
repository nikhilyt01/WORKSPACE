import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req,res){

    try{
        const currentUserId=req.userId._id;
        const currentUser=req.userId;

        const recommendedUsers = await User.find({
            $and:[
                {_id: {$ne: currentUserId}}, // exculde current user
                {_id: {$nin: currentUser.friends}},// exclude current friends 
                {isOnboarded:true} 
            ]
        })
        res.status(200).json(recommendedUsers);
    }catch(error){
        console.log("Error in getting recommended users:",error.message);
        res.status(500).json({message:"Internal server error"});

    }
}

export async function getMyFriends(req,res){
    try{
        const user = await User.findById(req.userId._id)
        .select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage ");
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user.friends);

    }catch(error){
        console.log("Error in getting friends:",error.message);
        res.status(500).json({message:"Internal server error"});

    }

}
//friend-request/:id route
export async function sendFriendRequest(req,res){
    try{
        const myId=req.userId._id;
        const recipientId=req.params.id; // or {id:recipientId} from req.body
        //prevent sending request to self
        if(myId.toString()===recipientId){
            return res.status(400).json({message:"You cannot send friend request to yourself"});
        }

        const recipient= await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message:"Recipient user not found"});
        }
        //check if user is already friends
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"});
        }
        // if friend request already exists
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ],
        });

        if(existingRequest){
            return res.status(400).json({message:"Friend request already exists"});
        }
        
        const friendRequest=await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        });
        res.status(200).json({success:true,message:"Friend request sent successfully"});

    }catch(error){
        console.log("Error in sending friend request:",error.message);
        res.status(500).json({message:"Internal server error"});

    }

}
//friend-request/:id /accept route  id of friendRequest
export async function acceptFriendRequest(req,res){
    try{

        const requestId=req.params.id;
        const myId=req.userId._id;

        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(404).json({message:"Friend request not found"});
        }
        //check if recipient is the current user
        if(friendRequest.recipient.toString()!==myId){
            return res.status(403).json({message:"You are not authorized to accept this friend request"});
        }
        friendRequest.status="accepted";
        await friendRequest.save();

        //update friends list for both users
        await User.findByIdAndUpdate(friendRequest.sender,{
            $addtoSet:{friends:friendRequest.recipient}
        })
        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addtoSet:{friends:friendRequest.sender}
        })
        
        res.status(200).json({success:true,message:"Friend request accepted successfully"});
    }catch(error){
        console.log("Error in accepting friend request:",error.message);
        res.status(500).json({message:"Internal server error"});
    }

}

export async function getFriendRequest(req,res){
    try{
       const incomimgRequests = await FriendRequest.find({
         recipient:req.userId._id,
         status:"pending"
       }).populate("sender","fullName profilePic nativeLanguage learningLanguage");

       const acceptedRequests = await FriendRequest.find({
        sender:req.userId._id,
        status:"accepted"
       }).populate("recipient","fullName profilePic ");

       res.status(200).json({incomimgRequests,acceptedRequests});

    }catch(error){
        console.log("Error in getting friend requests:",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function outGoingFriendRequest(req,res){
    try{
         const outgoingRequests = await FriendRequest.find({
            sender:req.userId._id,
            status:"pending"
         }).populate("recipient","fullName profilePic nativeLanguage learningLanguage");

         res.status(200).json(outgoingRequests);    
    }catch(error){      
        console.log("Error in getting outgoing friend requests:",error.message);
        res.status(500).json({message:"Internal server error"});

    }
}
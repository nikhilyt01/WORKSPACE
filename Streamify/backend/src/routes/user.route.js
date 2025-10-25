import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequest,outGoingFriendRequest} from "../controllers/user.controller.js";


const router = express.Router();

// apply auth middleware to all routes below
router.use(protectRoute); 

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("friend-request/:id/accept",acceptFriendRequest);
router.get("/friend-request",getFriendRequest);
router.get("/outgoing-friend-request/",outGoingFriendRequest);


export default router;

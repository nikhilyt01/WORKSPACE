import express from "express";
import { signup,login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { onboard } from "../controllers/auth.controller.js";

const router= express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.post("/onboarding",protectRoute,onboard);

router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({sucess:true,user:req.userId});
})


export default router;
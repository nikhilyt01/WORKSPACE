const jwt=require("jsonwebtoken")
const { JWT_ADMINPASS } =require("../config");
function adminmiddleware(req,res,next){
    const token =req.headers.token;
    const decode = jwt.verify(
        token,JWT_ADMINPASS);
    if(decode){
        req.userid= decode.id;
        next();
    }
    else{
        res.status(403).json({
            msg:"only for admins"
        })
    }
}
module.exports={
    adminmiddleware:adminmiddleware
}
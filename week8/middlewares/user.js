

const jwt=require("jsonwebtoken");
const {JWT_USERPASS} =require("../config");

function usermiddleware(req,res,next){
    const token=req.headers.token;
    const decode =jwt.verify(token,JWT_USERPASS);
    
    if(decode){
        req.userid =decode.id;
        next()
    }
    else{
        res.status(403).json({
            msg:"you are not signed in"
        })
    }


}
module.exports={
    usermiddleware:usermiddleware
}
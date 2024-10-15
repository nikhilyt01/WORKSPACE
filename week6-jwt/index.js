//returning jwt
const jwt=require("jsonwebtoken");
sceretkey="tormaiike"
const objectt={
    "name1":"nikhil",
    "pass":"passord1"
};

const value=jwt.sign(objectt,sceretkey);
console.log(value);
//verifying
const verify=jwt.verify(value,sceretkey);
if(verify){
    console.log("verified")
}
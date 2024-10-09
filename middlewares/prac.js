const express = require("express");
////const bodyparser=require("body-parser");

const app = express();
////app.use(bodyparser.json())

//to pass json data express.json()
app.use(express.json());
app.post("/sum",function(req,res){
    console.log(req.body)
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);
    res.json({
        ans: a+b
    })
})
app.listen(3000)
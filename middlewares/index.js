const express=require("express")
const app=express();
let reqcount=0;
function requestincreaser(){
    reqcount++;
    console.log("total no. of requet="+reqcount);
    
}

app.get("/sum",function(req,res){
    requestincreaser();
    
    const a=parseInt(req.query.a)
    const b=parseInt(req.query.b)

    res.json({
        ans:a+b
    });
});
app.listen(3000);
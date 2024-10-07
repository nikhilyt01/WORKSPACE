const express=require("express");
const app=express();
function isoldenoughmiddleware(req,res,next){
    const age=req.query.age;

    if(age>=14){
        next()  ;   
    }
    else{
        res.json({
            msg:"sorry you age not met"
        })
    }
}
//app.use(isoldenoughmiddleware);
app.get("/ride1",isoldenoughmiddleware,function(req,res){
    res.json({
        msg:"you have successfully riden ride1"
    })
   
    })

 app.get("/ride2",isoldenoughmiddleware,function(req,res){
    res.json({
         msg:"you have successfully riden ride2"
    })
       
    })
   

app.listen(3000);
const express = require("express");
const app=express();

/*app.get("/sum",function(req,res){
    const a=parseInt(req.query.a);
    const b=parseInt(req.query.b);
    res.json({
        ans: (a+b)
    });

  ////        here we give query as ?a=2&b=3
})  */

    app.get("/sum/:a/:b",function(req,res){
        const a=parseInt(req.params.a);
        const b=parseInt(req.params.b);
        res.json({
            ans: (a+b)
        });
    
    
    })  

app.listen(3000)
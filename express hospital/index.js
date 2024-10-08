const express=require("express");
const app=express();
//const users=[user]
const users=[ {
    name:"jhon"
    ,kidneys:[{
        healthy:false
    }]
} ] ;
//showing the details of kidneys
app.use(express.json()) // for passing json body type
app.get("/",function(req,res){
    const jhonkidney=users[0].kidneys;
    const noofkidneys=jhonkidney.length;
    let nohealthykidney=0;
    for(let i=0;i<jhonkidney.length;i++){
        if(jhonkidney[i].healthy){
            nohealthykidney=nohealthykidney+1
        }
    }
    const nounhealthykidneys=noofkidneys - nohealthykidney;
    res.json({
        noofkidneys,
        nohealthykidney,
        nounhealthykidneys
    })
})
//for adding details kidneys
app.post("/",function(req,res){
    //console.log(req.body)   it gives undefined
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({
        msg:"done!"
    })

})
app.put("/",function(req,res){ //it will replace kidney status
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;

    }
    res.json({});
})
//what if no unhealthy 
app.delete("/",function(req,res){ //it will replace kidney status
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy==false){
            users[0].kidneys.splice(i,1);
        }
    }    
        res.json({})
})
app.listen(3000);
//add here a function that will give respective status code
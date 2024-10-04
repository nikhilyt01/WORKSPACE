const fs=require("fs");
function readfilesync(){
    return new Promise(function(resolve,reject){
        fs.readFile("ayety.txt","utf-8",function (err,data){
        if(err){
            reject("not found");
        }
        else{
            resolve(data);
            
        }

    })
    })
}
readfilesync().then(function(x){
    console.log("file is read "+x)
}).catch(function(e){
    console.log(e)
})

//we cam chain on case of promises
/*const fs=require("fs");
new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("async task2")
        resolve()
    },2000);
}).then(function(){
    console.log("then fun")
})


//here we see object can be sent through resolve
new Promise(function(resolve,reject){
    setTimeout(function(){
        console.log("async task2")
        resolve({name:"nikhil",age:69,gender:"m"})
    },2000);
}).then(function(data){
    console.log(data)
})
*/

// chaining of promises  1st .then gives value to 2nd  .then
/*const promisefour=new Promise(function(resolve,reject){
    setTimeout(function(){
        let error=false; //false for checking username
        if(!error){
            resolve({username:"nikhil"})

        }
        else{
            reject("error 404")
        }
    })
})
promisefour.then(function(user){
    console.log(user)
    return user.username              // this return is stored in nxt .then
}).then(function(username){
    console.log(username)

}).catch(function(x) {
    console.log(x)
}).finally( ()=> console.log("promsise is either resolved or rejected"))
*/

const promisefive=new Promise(function(resolve,reject){
    setTimeout(function(){
        error=false;
        if (!error){
            resolve({username:"nikhil",age:28})
        }
        else{
            reject("error found")
        }
    })

},1000)
// async function handle error only if in try catch block
async function consumepromisefive(){
    try {

        const response = await promisefive
        console.log(response);
        
    } catch (error) { 
        console.log(error)
    }
}
consumepromisefive()

/*function setTimeoutpromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration)
    })
}
function callback(){
    console.log("5 sec has passed");
}

setTimeoutpromisified(5000).then(callback); */



/* function setTimeoutpromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration)
    })
}


setTimeoutpromisified(1000).then(function(){
    console.log("hi");
    setTimeoutpromisified(3000).then(function(){
        console.log("hello");
        setTimeoutpromisified(5000).then(function(){
            console.log("hi there")
        })
    })
});  */


//promised using chain
function setTimeoutpromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration)
    })
}


setTimeoutpromisified(1000).then(function(){
    console.log("hi");
    return setTimeoutpromisified(3000)
}).then(function(){
        console.log("hello");
        setTimeoutpromisified(5000)
    
}).then(function(){
    console.log("hi there")
});


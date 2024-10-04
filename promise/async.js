function setTimeoutpromisified(duration){
    return new Promise (function (resolve){
        setTimeout(resolve,duration)
    })
}

async function solve(){
    setTimeoutpromisified(2000);
    console.log("hi");
    await setTimeoutpromisified(3000);
    console.log("hello");
    await setTimeoutpromisified(6000);
    console.log("6 sec passed")
    
}
solve()
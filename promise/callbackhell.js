console.log("before callbackhell")
setTimeout(function(){
    console.log("hi");
    setTimeout( function(){
        console.log("hello")
        setTimeout(function(){
            console.log("hi there")
        },5000)
    },3000)
},1000);
console.log("after calbackhell") //it shows SYNC OPERATION

//this messy look is called callback hell

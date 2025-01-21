import {WebSocketServer} from 'ws' ;

const wss = new WebSocketServer({port:8080});


//event handler
wss.on("connection",function(socket){
    console.log("user connected")
  
    socket.on("message",(e)=>{
        if(e.toString()== "ping") {
            socket.send("pong");
        }
    })

})
// //event handler
// wss.on("connection",function(socket){
//     console.log("user connected")
//     setInterval(()=>{
//         socket.send("current price of solana is:"+ Math.random());
//     },500)
    
//     //msg handler like when client sends data
//     socket.on("message",(e)=>{
//         console.log(e.toString())
//     })

// })
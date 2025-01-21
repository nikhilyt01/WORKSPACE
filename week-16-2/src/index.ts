import {WebSocketServer,WebSocket} from "ws"

const wss = new WebSocketServer({port :8080})
let usercount = 0;
let allsockets:WebSocket[] = [];
wss.on("connection",(socket) =>{
    allsockets.push(socket);
    usercount++;
    console.log("user connected #"+usercount);


    socket.on("message",(message)=>{
        console.log("message recieved :"+ message.toString());
        for (let i=0 ; i<allsockets.length;i++){
            const s= allsockets[i];
            s.send(message.toString() +": send from server")
        }
    })
    socket.on("disconnect",()=>{
        allsockets= allsockets.filter(x =>x!=socket );
    })
    
})




// wss.on("connection",(socket) => {
//     usercount++;
//     console.log("user connected #"+usercount);

//     socket.on("message",(event)=>{
//         console.log("messge recieved"+ event.toString() )
//         setTimeout(()=>{
//             socket.send(event.toString() + ": sent from server" );
//         },1000 ) ;
       
//     })

// })
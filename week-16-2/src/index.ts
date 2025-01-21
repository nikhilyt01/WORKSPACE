import {WebSocketServer,WebSocket} from "ws"

const wss = new WebSocketServer({port :8080})
let usercount = 0;
wss.on("connection",(socket) => {
    usercount++;
    console.log("user connected #"+usercount);

    socket.on("message",(event)=>{
        console.log("messge recieved "+ event.toString() )
        setTimeout(()=>{
            socket.send(event.toString() + ": sent from server" );
        },1000 ) ;
       
    })

})
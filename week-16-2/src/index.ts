import {WebSocketServer,WebSocket} from "ws"

const wss = new WebSocketServer({port :8080})

interface user {
    socket:WebSocket;
    room : string;
}
let allsockets:user[] = []; 


wss.on("connection",(socket) =>{
   

    socket.on("message",(message)=>{    // socket.on means client is sending msg to server  & socket.send is method that server use to send message to client
        
        const parsedmessage = JSON.parse(message.toString());
        if (parsedmessage.type == "join"){
            console.log("user joined room :"+parsedmessage.payload.roomId)
            allsockets.push({
                socket,
                room:parsedmessage.payload.roomId
            })

        }

        if (parsedmessage.type== "chat"){
            console.log("user wants to chat")
            let currentUserRoom =null;
            for(let i=0;i< allsockets.length;i++){
               if( allsockets[i].socket == socket){
                currentUserRoom = allsockets[i].room
               }
            }
            for(let i=0;i<allsockets.length;i++){
                if(allsockets[i].room== currentUserRoom){
                    allsockets[i].socket.send(parsedmessage.payload.message)
                }

            }
            
        }
    })
    socket.on("close",()=>{            // in sccket.io it is disconnect
        console.log("user disconnected ")
        allsockets=allsockets.filter((x)=> x.socket!=socket)
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
import {WebSocketServer,WebSocket} from "ws"

const wss = new WebSocketServer({port :8080})

interface user {
    socket:WebSocket;
    room : string;
}
let allsockets:user[] = []; 


wss.on("connection",(socket) =>{
   

    socket.on("message",(message)=>{
        //@ts-ignore
        const parsedmessage = JSON.parse(message);
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
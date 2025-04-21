import { http_backend } from "@/config";
import axios from "axios"

type shape ={
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number;      

} | {
    type:"circle";
    centerx:number;
    centery:number;
    radius:number;
}


export async function initDraw(canvas:HTMLCanvasElement,roomId:string ,socket:WebSocket){
    const ctx = canvas.getContext("2d");
 
    let existingShapes : shape[] =await getExistingShapes(roomId);

    if(!ctx){
        return
    }

    socket.onmessage =(event)=>{                   // ye  part collaboration wla part hai ,,jaise hi msg aye render krde
        const message =JSON.parse(event.data)
        if(message.type==="chat"){
            const parseShape = JSON.parse(message.message);
            existingShapes.push(parseShape.shape)
            clearCanvas(existingShapes,canvas,ctx)            // after pushing shape clear & render 
        }

    }

    clearCanvas(existingShapes,canvas,ctx)
      let clicked=false;
      let startx=0;
      let starty=0;

     canvas.addEventListener("mousedown",(e)=>{
      clicked=true;
      startx= e.clientX
      starty=e.clientY
     })

     canvas.addEventListener("mouseup",(e)=>{
      clicked=false;
      const width = e.clientX -startx;
      const height = e.clientY -starty;
      const shape:shape={ 
        type:"rect",
        x:startx,
        y:starty,
        width,
        height }

      existingShapes.push(shape);        // {shape: {type:"rect",x,y}}  so .shape will give req object

      socket.send(JSON.stringify({          // jaise koi object banye server pe message chle jaye as chat 
        type:"chat",                           //and message ho object form me -==> {type:"rect",x,y,width,height}
        message:JSON.stringify({shape}),     // it will be send as shape = [{}]  so we have to do .shape
        roomId
      }))
     })

     canvas.addEventListener("mousemove",(e)=>{
      if(clicked){
       const width = e.clientX - startx;
       const height = e.clientY - starty;
       clearCanvas(existingShapes,canvas,ctx);    // it clears and renders shapes

       ctx.strokeStyle="rgba(255,255,255)"         // for current drawing that we drag
       ctx.strokeRect(startx,starty,width,height);
       
      }
     })
}

// clears and renders shapes 
function clearCanvas(existingShapes:shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    existingShapes.map((shape)=>{
        if(shape.type==="rect"){
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
        }
    })

}

async function getExistingShapes(roomId:string){
    const res =await axios.get(`${http_backend}/chats/${roomId}`);
    const messages= res.data.message;

    const shapes = messages.map((x :{message:string})=>{   // this type is wrong
        const messageData =JSON.parse(x.message)
        return messageData.shape;                         // {shape: {type:"rect",x,y}}  so .shape will give req object
    })
    return shapes;
} 
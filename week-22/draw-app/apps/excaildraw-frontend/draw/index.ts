import { http_backend } from "@/config";
import axios from "axios"
import { Shapes } from "lucide-react";
import { toast } from "react-hot-toast";

type Shape ={
    type:"rect";
    x:number;
    y:number;
    width:number;
    height:number;      

} | {
    type:"eraser";
    points: {x:number,y:number}[]
    
}  |  {
    type:"oval";
    x:number;
    y:number;
    radiusx:number;
    radiusy:number

}  | {
    type:"pencil";
    points:{x:number,y:number}[]
}   | {
    type:"triangle";
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    x3:number;
    y3:number;
}   |  {
     type: "text",
     x:number;
     y:number;
     text:string;

}


export async function initDraw(canvas:HTMLCanvasElement,roomId:string ,socket:WebSocket,getTool:()=>string,getStroke:()=>string,getColor:()=>Number){
    const ctx = canvas.getContext("2d");
    if(!ctx){
        toast.error("Failed to get canvas context")
        return
    }
    let existingShapes : Shape[] =[]
 try{ 
    existingShapes =await getExistingShapes(roomId);
    clearCanvas(existingShapes,canvas,ctx)
   

    socket.onmessage =(event)=>{                   // ye  part collaboration wla part hai ,,jaise hi msg aye render krde
     try{
        const message =JSON.parse(event.data)

        if(message.type==="error"){
            toast.error(message.message, {
                duration: 4000,
                position: "top-center"
            });
            return;
        }    

        if(message.type==="chat"){
            const parseShape = JSON.parse(message.message);
            existingShapes.push(parseShape.shape)
            clearCanvas(existingShapes,canvas,ctx)            // after pushing shape clear & render 

        }
       
    }catch(e){
        console.log("Failed to process message",e)
    }


    }

}catch(e){
    toast.error("Failed to intialize drawing");
    console.log("Failed to init drawing:",e)
}

    let currentPoints:{x:number,y:number}[]=[];
      let clicked=false;
      let startx=0;
      let starty=0;

     canvas.addEventListener("mousedown",(e)=>{
      clicked=true;
      startx= e.clientX
      starty=e.clientY
      currentPoints=[{x:e.clientX,y:e.clientY}]
     })

     canvas.addEventListener("mouseup",(e)=>{
      clicked=false;
      const width = e.clientX -startx;
      const height = e.clientY -starty;

      let shape:Shape | null=null;
      const Tool = getTool();  //it is function that retur string which is passed
      console.log(getTool())
      if (Tool === "Rect") {
        shape = {
            type: "rect",
            x: startx,
            y: starty,
            width,
            height,
        };
    }
       
       else if (Tool === "Oval") {
            const radiusx = Math.abs((e.clientX - startx) / 2);
            const radiusy = Math.abs((e.clientY - starty) / 2);
             shape = {
                type: "oval",
                x: (startx + e.clientX) / 2,
                y: (starty + e.clientY) / 2,
                radiusx,
                radiusy,
            };
        }
        else if(Tool === "Pencil"){
              shape={
                type:"pencil",
                points:currentPoints
              }
        }
        // else if(Tool==="Eraser"){
        //      shape={
        //         type:"pencil",
        //         points:currentPoints
        //       }
        // }
        else if(Tool==="Triangle"){
            shape={
                type:"triangle",
                x1:startx,
                y1:starty,
                x2:e.clientX,
                y2:e.clientY,
                x3:startx - (e.clientX- startx),
                y3:e.clientY

            }

        }
        // else if(Tool==="Text"){
        //    const text= prompt("Enter your text:");
        //    if(!text) return;
        //     shape={
        //         type:"text",
        //         x:e.clientX,
        //         y:e.clientY,
        //         text
        //     }
        // }
        else{
            return
        }

      existingShapes?.push(shape);        // {shape: {type:"rect",x,y}}  so .shape will give req object

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
       const Tool=getTool()
       console.log(getTool())
       clearCanvas(existingShapes,canvas,ctx);    // it clears and renders shapes

       ctx.strokeStyle=Tool==="Eraser" ? "Black"   : "white"     // for current drawing that we drag
       if(Tool==="Rect"){
           ctx.strokeRect(startx,starty,width,height);

       }
       if (Tool === "Oval") {
        ctx.beginPath();
        ctx.ellipse(
          (startx + e.clientX) / 2,
          (starty + e.clientY) / 2,
          Math.abs((e.clientX - startx) / 2),
          Math.abs((e.clientY - starty) / 2),
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
      else if(Tool==="Pencil"){    //|| Tool==="Eraser"
        currentPoints.push({ x: e.clientX, y: e.clientY });
        ctx.beginPath();
        for (let i = 0; i < currentPoints.length - 1; i++) {
          ctx.moveTo(currentPoints[i].x, currentPoints[i].y);
          ctx.lineTo(currentPoints[i + 1].x, currentPoints[i + 1].y);
        }
        ctx.stroke();

      }
      else if(Tool==="Triangle"){
          ctx.beginPath();
          ctx.moveTo(startx, starty);
          ctx.lineTo(e.clientX, e.clientY);
          ctx.lineTo(startx - (e.clientX - startx), e.clientY);
          ctx.closePath();
          ctx.stroke();

      }
       
      }
     })
}

// clears and renders shapes 
function clearCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    existingShapes.map((shape)=>{
        ctx.strokeStyle = shape.type === "eraser" ? "black" : "white";
        if(shape.type==="rect"){
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
        }
        else if(shape.type==="oval"){
            ctx.beginPath();
            ctx.ellipse(shape.x, shape.y, shape.radiusx, shape.radiusy, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
        else if (shape.type === "pencil" ) {   //|| shape.type === "eraser"
            ctx.beginPath();
            for (let i = 0; i < shape.points.length - 1; i++) {
              ctx.moveTo(shape.points[i].x, shape.points[i].y);
              ctx.lineTo(shape.points[i + 1].x, shape.points[i + 1].y);
            }
            ctx.stroke();
          } 
        else if(shape.type ==="triangle"){
            ctx.beginPath();
            ctx.moveTo(shape.x1,shape.y1)
            ctx.lineTo(shape.x2,shape.y2)
            ctx.lineTo(shape.x3,shape.y3)
            ctx.closePath()
            ctx.stroke();
        }
        // else if(shape.type==="text"){
        //     ctx.font = "20px Arial";
        //     ctx.fillStyle = "white";
        //     ctx.fillText(shape.text, shape.x, shape.y);
        // }
    }) 

}

async function getExistingShapes(roomId:string){
    const res =await axios.get(`${http_backend}/chats/${roomId}`);
    const messages= res.data.message;

    const shapes = messages.map((x :{message:string})=>{   // bcoz message is string only then it have further type,message,roomid all
        const messageData =JSON.parse(x.message)
        return messageData.shape;                         // {shape: {type:"rect",x,y}}  so .shape will give req object
    })
    return shapes;
} 
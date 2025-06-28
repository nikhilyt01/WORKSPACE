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
    strokeColor:string;
    strokeWidth:number;   

} | {
    type:"eraser";
    points: {x:number,y:number}[];
    strokeWidth:number;
    
}  |  {
    type:"oval";
    x:number;
    y:number;
    radiusx:number;
    radiusy:number;
    strokeColor:string;
    strokeWidth:number;

}  | {
    type:"pencil";
    points:{x:number,y:number}[];
    strokeColor:string;
    strokeWidth:number;
}   | {
    type:"triangle";
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    x3:number;
    y3:number;
    strokeColor:string;
    strokeWidth:number;
}   |  {
     type: "text",
     x:number;
     y:number;
     text:string;
     strokeColor:string;

}   | {
    type :"line",
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    strokeColor:string,
    strokeWidth:number,
}  | {
    type:"arrow",
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    strokeColor:string;
    strokeWidth:number;
}


export async function initDraw(canvas:HTMLCanvasElement,roomId:string ,socket:WebSocket,getTool:()=>string,getStroke:()=>number,getColor:()=>string){
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
        // if(message.type==="clear-canvas"){
        //   window.location.reload();
        //   // existingShapes.length=0
        //   // clearCanvasOnly(canvas, ctx);  
        // }
       
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
      if(getTool()==="Eraser"){
        // canvas.classList.add("eraser-cursor")
        const eraserSize = getStroke(); // Your current thickness
    
        // Apply dynamic size
        canvas.style.setProperty('--eraser-size', `${eraserSize}px`);
        canvas.classList.add("eraser-cursor");
        
        // Position the cursor
        const cursor = document.createElement('div');
        cursor.id = 'eraser-cursor';
        document.body.appendChild(cursor);
        
        const moveCursor = (e: MouseEvent) => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        };
        
        window.addEventListener('mousemove', moveCursor);
        
        // Cleanup on mouseup
        const cleanup = () => {
          canvas.classList.remove("eraser-cursor");
          document.body.removeChild(cursor);
          window.removeEventListener('mousemove', moveCursor);
          canvas.removeEventListener('mouseup', cleanup);
        };
        
        canvas.addEventListener('mouseup', cleanup);
      }

      if (getTool() === "Text") {
        e.preventDefault();
        const textarea = document.createElement("textarea");
        textarea.placeholder = "Type here...";
        textarea.style.position = "absolute";
        textarea.style.top = `${e.clientY}px`;
        textarea.style.left = `${e.clientX}px`;
        textarea.style.font = "16px Arial";
        textarea.style.color = getColor();
        textarea.style.background = "transparent";
        textarea.style.border = "none";
        textarea.style.outline = "none";
        textarea.style.resize = "none";
        textarea.style.zIndex = "10";
        textarea.style.padding = "0px";
        textarea.style.margin = "0px";
        textarea.style.lineHeight = "1.2";
        textarea.style.fontSize = "18px";
        textarea.style.fontWeight = "normal";
        textarea.style.whiteSpace = "pre";
    
        document.body.appendChild(textarea);
        textarea.focus();
    
        const cleanupAndDraw = () => {
          const text = textarea.value.trim();
          document.body.removeChild(textarea);
          if (!text) return;
    
          const shape: Shape = {
            type: "text",
            x: e.clientX,
            y: e.clientY,
            text,
            strokeColor: getColor(),
          };
    
          existingShapes.push(shape);
    
          socket.send(
            JSON.stringify({
              type: "chat",
              message: JSON.stringify({ shape }),
              roomId,
            })
          );
    
          clearCanvas(existingShapes, canvas, ctx);
        };
    
        textarea.addEventListener("keydown", (event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            textarea.blur();
          }
        });
    
        textarea.addEventListener("blur", cleanupAndDraw);
      }
     })

     canvas.addEventListener("mouseup",(e)=>{
      clicked=false;
      const width = e.clientX -startx;
      const height = e.clientY -starty;

      let shape:Shape | null=null;
      const Tool = getTool();  //it is function that retur string which is passed
      const thickness =getStroke();  // function that return thickness no.
      const color = getColor()
      console.log(getTool())
      if (Tool === "Rect") {
        shape = {
            type: "rect",
            x: startx,
            y: starty,
            width,
            height,
            strokeColor:color,
            strokeWidth:thickness
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
                strokeColor:color,
                strokeWidth:thickness
            };
        }
        else if(Tool === "Pencil"){
              shape={
                type:"pencil",
                points:currentPoints,
                strokeColor:color,
                strokeWidth:thickness
              }
        }
        else if(Tool==="Eraser"){
             shape={
                type:"eraser",
                points:currentPoints,
                strokeWidth:thickness
              }
        }
        else if(Tool==="Triangle"){
            shape={
                type:"triangle",
                x1:startx,
                y1:starty,
                x2:e.clientX,
                y2:e.clientY,
                x3:startx - (e.clientX- startx),
                y3:e.clientY,
                strokeColor:color,
                strokeWidth:thickness

            }

        }
        else if(Tool==="Line"){
            shape={
                type:"line",
                x1:startx,
                y1:starty,
                x2:e.clientX,
                y2:e.clientY,
                strokeColor:color,
                strokeWidth:thickness
            }
            
        }
        else if(Tool==="Arrow"){
            shape={
                type:"arrow",
                x1:startx,
                y1:starty,
                x2:e.clientX,
                y2:e.clientY,
                strokeColor:color,
                strokeWidth:thickness
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
       
      canvas.classList.remove("eraser-cursor")

     })

     canvas.addEventListener("mousemove",(e)=>{
      if(clicked){
       const width = e.clientX - startx;
       const height = e.clientY - starty;
       const Tool=getTool();
       const thickness= getStroke();
       const color = getColor();
       clearCanvas(existingShapes,canvas,ctx);    // it clears and renders shapes

       ctx.strokeStyle = Tool === "Eraser" ? "rgba(0,0,0,1)" : color;    // for current drawing that we drag
       if(Tool==="Rect"){
           ctx.lineWidth=thickness;
           ctx.strokeRect(startx,starty,width,height);

       }
       if (Tool === "Oval") {
        ctx.beginPath();
        ctx.lineWidth=thickness;
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
      else if(Tool==="Pencil" || Tool==="Eraser"){    //|| Tool==="Eraser"
        currentPoints.push({ x: e.clientX, y: e.clientY });
        ctx.beginPath();
        ctx.lineCap="round";
        ctx.lineJoin="round";
        ctx.lineWidth=thickness;
        for (let i = 0; i < currentPoints.length - 1; i++) {
          ctx.moveTo(currentPoints[i].x, currentPoints[i].y);
          ctx.lineTo(currentPoints[i + 1].x, currentPoints[i + 1].y);
        }
        ctx.stroke();

      }
      else if(Tool==="Triangle"){
          ctx.beginPath();
          ctx.lineWidth=thickness;
          ctx.moveTo(startx, starty);
          ctx.lineTo(e.clientX, e.clientY);
          ctx.lineTo(startx - (e.clientX - startx), e.clientY);
          ctx.closePath();
          ctx.stroke();

      }
      else if(Tool==="Line"){
        ctx.beginPath();
        ctx.lineWidth=thickness;
        ctx.moveTo(startx,starty);
        ctx.lineTo(e.clientX,e.clientY);
        ctx.stroke();
    
      }
      else if(Tool==="Arrow"){
        drawArrowPreview(ctx, startx, starty, e.clientX, e.clientY, color, thickness);

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
        ctx.strokeStyle = shape.type === "eraser" ? "black" : shape.strokeColor;
        if(shape.type==="rect"){
            ctx.lineWidth=shape.strokeWidth;
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
        }
        else if(shape.type==="oval"){
            ctx.beginPath();
            ctx.lineWidth=shape.strokeWidth;
            ctx.ellipse(shape.x, shape.y, shape.radiusx, shape.radiusy, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
        else if (shape.type === "pencil"|| shape.type === "eraser" ) {   //|| shape.type === "eraser"
            ctx.beginPath();
            ctx.lineCap="round";
            ctx.lineJoin="round";
            ctx.lineWidth=shape.strokeWidth;
            for (let i = 0; i < shape.points.length - 1; i++) {
              ctx.moveTo(shape.points[i].x, shape.points[i].y);
              ctx.lineTo(shape.points[i + 1].x, shape.points[i + 1].y);
            }
            ctx.stroke();
          } 
        else if(shape.type ==="triangle"){
            ctx.beginPath();
            ctx.lineWidth=shape.strokeWidth;
            ctx.moveTo(shape.x1,shape.y1)
            ctx.lineTo(shape.x2,shape.y2)
            ctx.lineTo(shape.x3,shape.y3)
            ctx.closePath()
            ctx.stroke();
        }
        else if(shape.type==="line"){
            ctx.beginPath();
            ctx.lineWidth = shape.strokeWidth;
            ctx.moveTo(shape.x1, shape.y1);
            ctx.lineTo(shape.x2, shape.y2);
            ctx.stroke();
        }
        else if(shape.type==="arrow"){
            drawArrowPreview(ctx, shape.x1, shape.y1, shape.x2, shape.y2, shape.strokeColor, shape.strokeWidth);
        }
        else if (shape.type === "text") {
            ctx.font = "18px Arial";
            ctx.fillStyle = shape.strokeColor;
            ctx.textBaseline = "top";
            ctx.fillText(shape.text, shape.x, shape.y);
        }
        
        // else if(shape.type==="text"){
        //     ctx.font = "20px Arial";
        //     ctx.fillStyle = "white";
        //     ctx.fillText(shape.text, shape.x, shape.y);
        // }
    }) 
   

}
// function clearCanvasOnly(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.fillStyle = "rgba(0,0,0)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

async function getExistingShapes(roomId:string){
    const res =await axios.get(`${http_backend}/chats/${roomId}`);
    const messages= res.data.message;

    const shapes = messages.map((x :{message:string})=>{   // bcoz message is string only then it have further type,message,roomid all
        const messageData =JSON.parse(x.message)
        return messageData.shape;                         // {shape: {type:"rect",x,y}}  so .shape will give req object
    })
    return shapes;
} 
// seperate function for arrow 
function drawArrowPreview(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    thickness: number
  ) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
  
    // Arrowhead size scales gently with thickness
    const headLength = 8 + thickness * 1.5; // e.g. 8 + 1.5*4 = 14
  
    const headAngle = Math.PI / 7; // sharpness of arrowhead
  
    // Shaft
    ctx.beginPath();
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  
    // Arrowhead lines
    const leftX = x2 - headLength * Math.cos(angle - headAngle);
    const leftY = y2 - headLength * Math.sin(angle - headAngle);
    const rightX = x2 - headLength * Math.cos(angle + headAngle);
    const rightY = y2 - headLength * Math.sin(angle + headAngle);
  
    ctx.beginPath();
    ctx.lineWidth = thickness * 0.6; // slightly thinner than shaft
    ctx.moveTo(x2, y2);
    ctx.lineTo(leftX, leftY);
    ctx.moveTo(x2, y2);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();
  }
  
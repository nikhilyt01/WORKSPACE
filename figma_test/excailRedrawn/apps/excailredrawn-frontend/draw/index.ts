import { http_backend } from "@/config";
import axios from "axios";
import { parse } from "path";
import toast from "react-hot-toast";


type Shape={
   type:"rect",
   x:number,
   y:number,
   width:number,
   height:number,
   strokecolor:string,
   strokewidth:number,

} |  {
    type:"oval";
    x:number;
    y:number;
    radiusx:number;
    radiusy:number;
    strokecolor:string;
    strokeWidth:number;

} 

   

export async function initDraw(canvas:HTMLCanvasElement,roomId:string,getTool:()=>string,getStroke:()=>number,getColor:()=>string,socket:WebSocket,getZoom:()=>number,setZoom:(zoom:number)=>void){
         const ctx = canvas.getContext("2d");
         if(!ctx){
            return ;
         }

         let existingShapes :Shape[]=[]
         let isPanning = false;
         let panStartX = 0;
         let panStartY = 0;
         let offsetX = 0;
         let offsetY = 0;
         let zoom=1;

         try{
            existingShapes= await getExistingshapes(roomId);
            clearCanvas(existingShapes,canvas,ctx,offsetX, offsetY,zoom);

            socket.onmessage=(event)=>{
               try{
                  const message = JSON.parse(event.data)  // { type:"join_room"|"chat"|"error" , "message":{shape:{...}}
                  if(message.type==="error"){
                      toast.error(message.message, {
                      duration: 4000,
                      position: "top-center"
                      });
                      return;
                  }
                  if(message.type==="chat"){
                     const parsedshape= JSON.parse(message.message)
                     existingShapes.push(parsedshape.shape);
                     clearCanvas(existingShapes,canvas,ctx,offsetX, offsetY,zoom)
                  }

               }catch(e){
                  console.log("Failed to process message",e)

               }
            
            }

         }catch(e){
              toast.error("Failed to intialize drawing");
              console.log("Failed to init drawing:",e)
         }
      

         let clicked:Boolean=false;
         let startx=0;
         let starty=0;
         
         canvas.addEventListener("mousedown",(e)=>{
            const tool=getTool();
            // -b
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top; 
            zoom = getZoom();
            //

            canvas.style.cursor = tool === "Hand" ? "grab" : "crosshair"; // Set default cursor
            if (tool === "Hand") {
               isPanning = true;
               panStartX = clientX - offsetX;// as offset is 0 initialy //-b
               panStartY = clientY - offsetY;  
               canvas.style.cursor = "grabbing";
               return;
            }
            clicked=tool==="Hand"?false:true;
            // startx=e.clientX,
            // starty=e.clientY
            startx=(clientX - offsetX)/zoom; // Adjust for current offset  & then for zoom
            starty=(clientY - offsetY)/zoom;
         })
         canvas.addEventListener("mouseup",(e)=>{
            if (isPanning) {
                isPanning = false;
                canvas.style.cursor = getTool() === "Hand" ? "grab" : "crosshair";
                return;
            }
            if(!clicked) return;
            // -b
            clicked=false;
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top;
            //

            let shape:Shape | null=null;
            const adjustedEndX = (clientX - offsetX)/zoom;
            const adjustedEndY = (clientY - offsetY)/zoom;
            const width= adjustedEndX - startx;//e.clientX - startx;
            const height =adjustedEndY - starty; //e.clientY- starty;
            const Tool=getTool();
            const color =getColor();
            const thickness = getStroke();

            if (Tool === "Hand") return; // no shape sending logic for hand
            if(Tool==="Rect"){
               shape={
                  type:"rect",
                  x:startx,
                  y:starty,
                  width,
                  height,
                  strokecolor:color,
                  strokewidth:thickness
               }
            }
            else if(Tool==="Oval"){
               const radiusx = Math.abs(width / 2);
               const radiusy = Math.abs(height / 2);
               shape = {
                type: "oval",
                x:  startx + width / 2,//(startx + e.clientX) / 2,   --b 
                y: starty + height / 2,//(starty + e.clientY) / 2,
                radiusx,
                radiusy,
                strokecolor:color,
                strokeWidth:thickness
            };
            }
            else{     // to statisfy shape is null also
               return ;  
            }
            existingShapes.push(shape)
         if(shape){
            socket.send(JSON.stringify({
               type:"chat",
               message:JSON.stringify({shape}),
               roomId
            }))
         }
           
         })
         canvas.addEventListener("mousemove",(e)=>{
            // -b
            const rect = canvas.getBoundingClientRect();
            const clientX = e.clientX - rect.left;
            const clientY = e.clientY - rect.top;
            zoom = getZoom();
            //
            if (isPanning) {
             offsetX = clientX - panStartX;//offsetX = e.clientX - panStartX;
             offsetY = clientY - panStartY;//offsetY = e.clientY - panStartY;
             clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY,zoom);
             return;
            }
            if(clicked){
                const Tool=getTool();
                const thickness=getStroke();
                const color=getColor();
                clearCanvas(existingShapes,canvas,ctx,offsetX, offsetY,zoom);    // it clears and renders shapes
                // Adjust coordinates with offset
                const adjustedEndX = (clientX - offsetX)/zoom;  // const adjustedX = e.clientX - offsetX;  --b ai
                const adjustedEndY = (clientY - offsetY)/zoom;//const adjustedY = e.clientY - offsetY;  -b ai
                // const width=e.clientX - startx; old one
                // const height =e.clientY -starty;
                const width = adjustedEndX - startx;  // -b ai
                const height = adjustedEndY - starty;
                // zooming
                ctx.save();
                ctx.translate(offsetX, offsetY);
                ctx.scale(zoom, zoom);
                //

                ctx.strokeStyle = Tool === "Eraser" ? "rgba(0,0,0,1)" : color;
                ctx.lineWidth = thickness;
                

                if(Tool==="Rect"){
                   //ctx.lineWidth=thickness
                  //  ctx.strokeRect(startx, starty, adjustedEndX - startx, adjustedEndY - starty);
                  //ctx.strokeRect(startx + offsetX, starty + offsetY, width, height);
                     ctx.strokeRect(startx , starty , width, height); // for zooming removed startx+offsets as we have already used ctx.translate(offsetX, offsetY)
                }
                else if(Tool==="Oval"){
                     ctx.beginPath();
                      //ctx.lineWidth=thickness;
                     ctx.ellipse(
                        startx + width / 2 ,//(startx + adjustedX) / 2,  //adjusted  //edit3- removed + offsetX as translate done early
                        starty + height / 2 ,//(starty + adjustedY) / 2,             // edit 3- removed + offsetY
                        Math.abs(width / 2),//Math.abs((adjustedX - startx) / 2),
                        Math.abs(height / 2),//Math.abs((adjustedY - starty) / 2),
                       0, 0, Math.PI * 2
                     );
                     ctx.stroke();
                }
                 ctx.restore();

            }
         })

          // Handle wheel zoom
         canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const currentZoom = getZoom();
            const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.1), 5);
            
            // Zoom towards mouse position
            const zoomRatio = newZoom / currentZoom;
            offsetX = mouseX - (mouseX - offsetX) * zoomRatio;
            offsetY = mouseY - (mouseY - offsetY) * zoomRatio;
            
            setZoom(newZoom);
            clearCanvas(existingShapes, canvas, ctx, offsetX, offsetY, newZoom);
         });
         
}
function clearCanvas(existingShapes:Shape[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D, offsetX: number, offsetY: number,zoom:number){
   ctx.save();
   ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle="rgba(0,0,0)"
   ctx.fillRect(0,0,canvas.width,canvas.height)
   ctx.restore();
    
   ctx.save();
   ctx.translate(offsetX, offsetY);
   ctx.scale(zoom, zoom);

   existingShapes.map((shape)=>{
      ctx.strokeStyle =  shape.strokecolor;
      if(shape.type==="rect"){
         ctx.lineWidth=shape.strokewidth;
         ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
      }
      else if(shape.type==="oval"){
         ctx.beginPath();
         ctx.lineWidth=shape.strokeWidth;
         ctx.ellipse(shape.x, shape.y, shape.radiusx, shape.radiusy, 0, 0, Math.PI * 2);
         ctx.stroke();
      }
   })
   ctx.restore();
   
}
async function getExistingshapes(roomId:string){
   const res= await axios.get(`${http_backend}/chat/${roomId}`)
   const messageArray=  res.data.message;
   const Shapes= messageArray.map((x: {message:string} ) => {   
      const parsedMessage = JSON.parse(x.message)    // the message attribute of chats table contains message as {shape: {type:..,x:,y:}}
       return parsedMessage.shape;  // as we will send {shape:{}} from websockets
   })
   return Shapes;

}
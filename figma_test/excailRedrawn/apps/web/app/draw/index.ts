
export function initDraw(canvas:HTMLCanvasElement,roomId:string,){



         
         const ctx = canvas.getContext("2d");
         if(!ctx){
            return ;
         }
         let clicked:Boolean;
         let startx=0;
         let starty=0;
         let width;
         let height;
         canvas.addEventListener("mousedown",(e)=>{
            clicked=true;
            startx=e.clientX,
            starty=e.clientY
         })
         canvas.addEventListener("mouseup",(e)=>{
            clicked=false;
           
         })
         canvas.addEventListener("mousemove",(e)=>{
            if(clicked){
                const width=e.clientX - startx;
                const height =e.clientY -starty;
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.strokeStyle="rgba(255,255,255,255)";
                ctx.strokeRect(startx,starty,width,height)

            }
         })

}
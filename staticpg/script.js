let ctr=0;
function callback(){
  const el=document.querySelectorAll("h4")[1];
  org=el.innerHTML;
  el.innerHTML=ctr;
  ctr=ctr+1
  if(ctr>5){
    ctr=0;
      
  }
 
}


setInterval(callback,1000);
const style={width:200,
    "background-color":"white",
     borderRadius:10,borderColor:"gray",
     borderWidth:1,padding:20} // or backgroundColor    //caps C
                                                
export function PostComponent({name,subtitile,time,image,description}){
     return <div style={ style}>
     <div style={{display:"flex"}}  >   
       <img src={image} style={ {
        width:30,
        height:30,
        borderRadius:20
        } }/>
       
       <div style={ {fontSize:15,marginLeft:10}}>
         <b>
          {name}
         </b>
         <div>{subtitile}</div>
         { time!==undefined && <div style={ {display:'flex'}}>
           <div>{time}</div>
           <img src={"https://imgs.search.brave.com/QJXpqfZEFHfir-wYi8Uek_E9B4qBre_K0zqdHkxz3ns/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MDc3ODM3Ni9waG90/by9jbG9jay02LW9j/bG9jay5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9VTZKUXI5/UFdPYmVuY2lOMHVj/QkgycXJFeWd5WlY4/VUdDem1UQ1pVRnVE/cz0"} style={{width:23,height:16}} />
 
         </div> }
 
       </div>
     
     </div>   
     <div style={ {fontSize:13}}>
         {description}
     </div>
   </div>
 
   }
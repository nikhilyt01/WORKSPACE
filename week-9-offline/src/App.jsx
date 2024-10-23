import React , {useState} from 'react';
function App() {
  return (
     <div style={ {backgroundColor:"#dfe6e9",height:"100vh"}}>
      <div>helow</div>
      
      <ToggleMessage />
      <div style={{display:"flex",justifyContent:"center"}}>
        <div>
          <div>
            <PostComponent
            name={"raman"}
            subtitile={"30 follower"}
            time={"3m ago"}
            image={"https://image.freepik.com/free-vector/logo-template-design_23-2147759993.jpg"}
            description={"how to get heired in 2024 ? i lost my job in 2023 this i smy roadmap"}
            />
            <br/>
          </div>
          <div>
            <PostComponent
            name={"naman"}
            subtitile={"promoted"}
            
            image={"https://image.freepik.com/free-vector/logo-template-design_23-2147759993.jpg"}
            description={"how to get heired in 2024 ? i lost my job in 2023 this i smy roadmap"}
            />
          </div>
        </div>
   
        
      </div>
      
     
    </div>
    


    
  )
}
const style={width:200,
   "background-color":"white",
    borderRadius:10,borderColor:"grey",
    borderWidth:1,padding:20} // or backgroundColor    //caps C
                                               
  function PostComponent({name,subtitile,time,image,description}){
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
          <img src={"https://imgs.search.brave.com/QJXpqfZEFHfir-wYi8Uek_E9B4qBre_K0zqdHkxz3ns/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM3/MDc3ODM3Ni9waG90/by9jbG9jay02LW9j/bG9jay5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9VTZKUXI5/UFdPYmVuY2lOMHVj/QkgycXJFeWd5WlY4/VUdDem1UQ1pVRnVE/cz0"} style={{width:12,height:12}} />

        </div> }

      </div>
    
    </div>   
    <div style={ {fontSize:13}}>
        {description}
    </div>
  </div>

  }
  const ToggleMessage =() => {
    let [isvisible,setIsvisible]=useState(false);
    console.log("re render");
    function toggle(){
      setIsvisible(!isvisible)
    }
    return (
      <div>
          <button onClick={toggle}>
             toggle msg
          </button>
          {isvisible && <p>this is due to conditional re-rendering</p>}
      </div>
    )
  }


export default App

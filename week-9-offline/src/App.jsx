import React , {useState} from 'react';
import { PostComponent} from "./post" ;
function App() {
  const [posts,setPosts]=useState([]);

  const postcomponents = posts.map(post => <PostComponent
    name= {post.name}
    subtitle = {post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />)

  function addpost(){

    setPosts([...posts,{
      name:"harkirat",
      subtitle:"1000 followers",
      time:"2m ago",
      image:"https://cdn-icons-png.flaticon.com/128/17734/17734816.png",
      description:"what to know how to earn money? play satta 24/7 "
    }])
  }

  return (
     <div style={ {backgroundColor:"#dfe6e9",height:"100vh"}}>
      <button onClick={addpost}> Add post</button>

      <div style={{display:"flex",justifyContent:"center"}}>
        <div>
          
           { postcomponents }
          
        </div>
   
        
      </div>
      
     
    </div>
    


    
  )
}




export default App

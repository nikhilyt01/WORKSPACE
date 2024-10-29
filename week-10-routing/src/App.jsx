
import {BrowserRouter,Routes,Route,Link,useNavigate,Outlet} from "react-router-dom"

function App() {
  
  const router=[{path:"fdsfdjkfdj",
    element:"fnsdkjf"}]   {/*and use {router instead of children} */}

  return (<div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>  
          <Route path="/neet/online-coaching-class-11" element={<Class11program/>} />
          <Route path="/neet/online-coaching-class-12" element={<Class12program/>} />
          <Route path="/" element={<Landing/>} />
          <Route path="*" element={<Errorpage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
    
  )
}
function Headers(){
  return <div>
    <Link to="/"> allen </Link> 
       |
      <Link to="/neet/online-coaching-class-11" > class11 </Link> 
       |
      <Link to="/neet/online-coaching-class-12"> class12 </Link>

  </div>

}
function Layout(){
  return <div style={{height:"100vh"}}>
       <Headers/>
      <div style={{height:"90vh",background:"grey"}}>
      <Outlet/>
      </div>
    
    footers|contact Us
  </div>

}

function Class11program(){
  return <div>
    NEET programs for class 11
  </div>

}
function Class12program(){
  const nav=useNavigate();
  function redirect(){
    nav("/")
  }
  return <div>
    NEET programs for class 12
    <button onClick={redirect}>go to Home</button>
  </div>
}
function Landing(){
  return <div>
   welcome lodu 
  </div>
}
function Errorpage(){
  return <div>
    something went wrong !!!
  </div>
}

export default App

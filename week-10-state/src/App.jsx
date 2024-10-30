import { useState ,createContext,useContext} from 'react'

const BulbContext=createContext()
function Bulbprovider({children}){
  const [bulbon,setBulbon]=useState(true)
  return (
  
  <BulbContext.Provider value= {{bulbon:bulbon,setBulbon:setBulbon}}>
    {children}
  </BulbContext.Provider>
  )
}
function App() {
  
  return ( <div>
    <Bulbprovider>
        <Light/>
    </Bulbprovider>
    
   
  </div>
  )
}
function Light(){
  
  return <div>
    <LightBulb />
    <LightSwitch  />

  </div>
}
function LightBulb(){
  const {bulbon}=useContext(BulbContext);
  return <div>
    {bulbon?"Bulb on ":"Bulb off"}
    
  </div>
}

function LightSwitch(){
  const {bulbon,setBulbon}=useContext(BulbContext);
  function Toggle(){
    setBulbon(!bulbon)
  }
  return <div>
    <button onClick={Toggle}>Toggle Bulb </button>
  </div>
}

export default App

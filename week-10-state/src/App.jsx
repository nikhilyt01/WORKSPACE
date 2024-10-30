import { useState ,createContext,useContext} from 'react'


function App() {

  return ( <div>
   <Light/>
  </div>
  )
}
function Light(){
  const [bulbon,setBulbon]=useState(true)
  return <div>
    <LightBulb bulbon={bulbon}/>
    <LightSwitch bulbon={bulbon} setBulbon={setBulbon} />

  </div>
}
function LightBulb({bulbon}){
  return <div>
    {bulbon?"Bulb on":"Bulb off"}
  </div>
}

function LightSwitch({bulbon,setBulbon}){
  function Toggle(){
    setBulbon(!bulbon)
  }
  return <div>
    <button onClick={Toggle}>Toggle BUlb </button>
  </div>
}

export default App

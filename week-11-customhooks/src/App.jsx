import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function useCounter(){
  const [count, setCount] = useState(0)

  function increaseCount(){
  setCount(currval => currval+1)
  } 
  return {
    count:count,
    increaseCount:increaseCount
  }
}
function App() {
  const {count,increaseCount} = useCounter();
 
  return (
  <div >
   <Counter/>
   <Counter/>
   <Counter/>
   <Counter/>

  </div>
  )

 
}
function Counter(){
  const {count,increaseCount} = useCounter();
  return <div>
    <button onClick={increaseCount}  >increase {count}</button>
  </div>
}

export default App

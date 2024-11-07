import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/button'
import { Input } from './components/inputs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen bg-blue-700">
      <br/>
      <br/>
     <Input type={"text"} placeholder={"username"}></Input>
     <Button disabled={false} >Sign Up </Button>
     
     
     
    </div>
  )
}

export default App

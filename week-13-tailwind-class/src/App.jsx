import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/button'
import { Input } from './components/inputs'
import { Otpcomponent } from './components/otp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen bg-blue-700">
      <br/>
      <br/>
     
     <Otpcomponent/>
     <Button disabled={true}>
        Signup
     </Button>
     
     
     
    </div>
  )
}

export default App

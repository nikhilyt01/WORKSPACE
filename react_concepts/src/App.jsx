import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserContextProvider from './context/UserContextProvider';
import Login from './components/login';
import Profile from './components/profile';



function App() {
  const [color, setColor] = useState("red");
  const basicc=[
    "red",
    "blue",
    "yellow",
    "green",
  ]


  return (
    <UserContextProvider>
     
        <h1 className='flex justify-center items-center '>React concepts -- prop Drilling</h1>
        <Login />
        <Profile />
      
    </UserContextProvider>
  )
}

export default App

import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {usepostTitle} from "./hooks/usefetch"

function App() {
const postTitle=usepostTitle();

  return (
  <div >
   {postTitle}
  </div>
  )

 
}


export default App

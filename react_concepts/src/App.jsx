import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserContextProvider from './context/UserContextProvider';
import Login from './components/login';
import Profile from './components/profile';
import { ThemeProvider } from './context/theme';
import ThemeBtn from './components/themebtn';
import Card from './components/card';



function App() {
const [thememode,setThememode]=useState("light");

const lighttheme=() =>{
    setThememode("light")
}
const darktheme=()=>{
    setThememode("dark")
}

useEffect(()=>{
  document.querySelector("html").classList.remove("light","dark");
  document.querySelector("html").classList.add(thememode)

},[thememode])

  return (
<ThemeProvider value={{thememode,lighttheme,darktheme}}>
  <div className="flex flex-wrap min-h-screen items-center">
      <div className="w-full">
           <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
             <ThemeBtn/>
           </div>

           <div className="w-full max-w-sm mx-auto">
             <Card/>
           </div>
      </div>
  </div>
</ThemeProvider>

  )
}

export default App

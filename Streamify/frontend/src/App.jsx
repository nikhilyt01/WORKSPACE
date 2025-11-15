import React from 'react'
import {Routes,Route} from "react-router"
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import Callpage from './pages/Callpage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import toast,{Toaster} from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import axios from  "axios"
import axiosInsrtance from './lib/axios.js';
import { Navigate } from 'react-router'

const App = () => {
  const {data:authData,isLoading,error}=useQuery({
    queryKey:["authUser"],
    queryFn:async()=>{
      const res= await axiosInsrtance.get("/auth/me")
      return res.data;
    },
    retry:false, //auth check only once 
  })
  const authUser=authData?.user;
 

  return (
    <div  data-theme="coffee" className="bg-red-500 h-screen  text-5xl">
     
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
        <Route  path="/signup" element={!authUser?<SignupPage/>:<Navigate to="/"/>} />
        <Route path="/login" element={!authUser?<Loginpage/>:<Navigate to="/"/>} />
        <Route path="/chat" element={authUser?<ChatPage/>:<Navigate to="/login"/>} />
        <Route path="/call" element={authUser?<Callpage/>:<Navigate to="/login"/>} />
        <Route path="/notifications" element={authUser?<NotificationPage/>:<Navigate to="/login"/>} /> 
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App

import { Route, Routes } from "react-router"
import SignupPage from "./pages/SignupPage"

const App = () => {
  return ( <div className="h-screen " data-theme="night">
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/call" element={<Callpage />} /> 
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      
    </Routes> 
  </div>
   
  )
}

export default App


import './App.css'
import {Dashboard} from "./pages/dashboard"
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { LandingPage } from './pages/home'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Landingpg } from './landingpage/landing'


function App() {
 
  return (
    <BrowserRouter >
        <Routes>
            <Route  path="/test" element={<Landingpg/>}></Route>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
    </BrowserRouter>
   )
}

export default App

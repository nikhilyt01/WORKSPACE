
import './App.css'
import {Dashboard} from "./pages/dashboard"
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import {BrowserRouter,Routes,Route} from "react-router-dom";


function App() {
 
  return (
    <BrowserRouter >
        <Routes>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
    </BrowserRouter>
   )
}

export default App

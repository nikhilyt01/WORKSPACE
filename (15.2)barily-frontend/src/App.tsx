
import './App.css'
import {Dashboard} from "./pages/dashboard"
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Landingpg } from './landingpage/landing';
import { Errorpage } from './components/UI/404error';
import { UnAuth } from './components/UI/unauthorized';
import { Protected } from './components/UI/protected';
import { Shared } from './components/UI/shared';


function App() {
 
  return (
    <BrowserRouter >
        <Routes>
            <Route path="/brain/:hash" element={<Shared/>} > </Route>
            <Route  path="/test" element={<UnAuth/>}></Route>
            <Route path="/" element={<Landingpg/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/dashboard"
             element={
                     <Protected>
                       <Dashboard />
                     </Protected>
             }>
             </Route>
             
            <Route path="*" element={<Errorpage/>}></Route>
        </Routes>
    </BrowserRouter>
   )
}

export default App

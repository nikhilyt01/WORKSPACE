import {Routes,Route} from "react-router"
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import Callpage from './pages/Callpage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import toast,{Toaster} from "react-hot-toast"
import { Navigate } from 'react-router'
import PageLoader from './components/PageLoader.jsx'
import { useAuthUser } from './hooks/useAuthUser.js'
import OnboardingPage from './pages/onboardingPage.jsx'

const App = () => {
  
const {isLoading,authUser}=useAuthUser();
  if (isLoading) return <PageLoader />;

  const isAuthenticated=Boolean(authUser);
  const isOnboarded= authUser?.isOnboarded;
    
  

  return (
    <div  data-theme="coffee" className="bg-red-500 h-screen  text-5xl">
     
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded?(
          <HomePage/>
        ):(
          <Navigate to={!isAuthenticated?"/login":"/onboarding"} />
        )}/>
        <Route  path="/signup" element={!isAuthenticated?<SignupPage/>:<Navigate to="/"/>} />
        <Route path="/login" element={!isAuthenticated?<Loginpage/>:<Navigate to="/"/>} />
        <Route path="/chat" element={isAuthenticated?<ChatPage/>:<Navigate to="/login"/>} />
        <Route path="/call" element={isAuthenticated?<Callpage/>:<Navigate to="/login"/>} />
        <Route path="/notifications" element={isAuthenticated?<NotificationPage/>:<Navigate to="/login"/>} /> 
        <Route
          path="/onboarding" 
          element={
            isAuthenticated? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App

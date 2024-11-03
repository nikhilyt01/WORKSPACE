import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {networkAtom,jobsAtom,messagingAtom,NotificationAtom,Totalpings} from "./atom"
import {useRecoilValue,useSetRecoilState,RecoilRoot} from "recoil"


function App() {
  
 
  return (
  <>
  <RecoilRoot>
    <Mainapp />
  </RecoilRoot>
   
  </>
  )


}
function Mainapp(){
  const networkcount=useRecoilValue(networkAtom);
  const jobsCount= useRecoilValue(jobsAtom);
  const messagingCount= useRecoilValue(messagingAtom);
  const notificationCount=useRecoilValue(NotificationAtom);
  const sumofall=useRecoilValue(Totalpings);
  return <div>
     <button>Home</button>
    <button>My Network ({networkcount>=100?"99+":networkcount})</button>
    <button> jobs ({jobsCount})</button>
    <button>Messaging ({messagingCount})</button>
    <button>Notification({notificationCount})</button>
    <button>me ({sumofall})</button>
    {/* <ButtonUpdater /> */}
  </div>

}
function ButtonUpdater(){
  const setMessagingCount=useSetRecoilState(messagingAtom)
  return <div>
    <button onClick={()=>{
      setMessagingCount((c )=>c+1);}} >Me</button>
  </div>
}

export default App

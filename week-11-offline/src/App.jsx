
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue,useSetRecoilState} from 'recoil'

import {todosAtomFamily} from "./atom"
function App() {
  return <RecoilRoot>
    <Todo id={1} />
    <Todo id={2} />
    <Todo id={6}/>
  </RecoilRoot>
}

function Todo({id}) {
  const currenttodo=useRecoilValue(todosAtomFamily(id))
  if(!currenttodo){
    return <h2>todo with id {id} not found </h2>
  }
  return <div>
   <h1>{currenttodo.title}</h1>
   <p> {currenttodo.description}</p>
  </div>


}
export default App
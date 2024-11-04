
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { todosAtomFamily } from './atom';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
  //  const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  const todo=useRecoilValueLoadable(todosAtomFamily);
  if(todo.state){
    return <div>
      Loading... or skeleton div
    </div>
  }
  else if(todo.state=="hasValue"){
  return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  )
}
else if (todo.state=="hasError"){
  return <div>
    error while geeting error</div>
  }
}

export default App
import { useSelector,useDispatch } from "react-redux";
import { removetodo } from "../features/todo/todoSlice";
import { Trash2 } from "lucide-react";

export function Todos (){
    const todos= useSelector((state)=>state.todo.todos)
    const dispatch = useDispatch()

    return(
        <div>
            {todos.map((todo)=>(
              <li className="flex justify-between items-center mt-4 bg-zinc-800 px-4 py-2 rounded " key={todo.id}>
                <div className="text-white">{todo.text}</div>
                <button onClick={()=>dispatch(removetodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                    <Trash2 className="w-5 h-5"/>
                </button>

              </li>
            ))}
        </div>
    )
}
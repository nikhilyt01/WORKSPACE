import { useSelector,useDispatch } from "react-redux";
import { removetodo } from "../features/todo/todoSlice";
import { Trash2 ,Pencil,Save} from "lucide-react";
import { useEffect, useState } from "react";


export function Todos (){
    const [editing,setEditing]=useState(false)
    const [input,setInput]=useState("");
    

    function handleEdit(){
      setEditing(true)
    }
    function handleSave(){
      setEditing(false)
    }
    const todos= useSelector((state)=>state.todo.todos)
    const dispatch = useDispatch()

    return(  
        <div>
            {todos.map((todo)=>(
              <li className="flex justify-between items-center mt-4 bg-zinc-800 px-4 py-2 rounded " key={todo.id}>
                <div className="text-white">{editing? 
                  <input 
                    key={todo.id}
                    type="text" 
                    placeholder={todo.text} 
                    
                    onChange={(e)=>setInput(e.target.value)}
                    className="outline-none rounded-lg p-1 hover:ring-2 hover:ring-blue-500"
                    />
                  :todo.text}
                </div>
                <div className="space-x-2">
                { editing ? <button className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-cyan-600 rounded text-md"
                              onClick={handleSave}
                            >
                                <Save className="w-5 h-5"/>
                            </button>:
                            <button className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                              onClick={handleEdit}
                            >
                                 <Pencil className="w-5 h-5"/>
                             </button>
                            
                }
                 <button onClick={()=>dispatch(removetodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                 >
                    <Trash2 className="w-5 h-5"/>
                 </button>
                </div>

              </li>
            ))}
        </div>
    )
}
import { createSlice,nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos:[{id:1,text:"Bakchodiii...."}]
}

export const todoSlice= createSlice({
    name:"todo",
    initialState,
    reducers:{
        addtodo:(state,action)=> {
            const todo = {
                id: nanoid(),
                text:action.payload
            }
            state.todos.push(todo)
        },
        removetodo:(state,action)=>{
           state.todos= state.todos.filter((todo)=>todo.id
           !==action.payload )
        },
        updatetodo:(state,action)=>{
            const {id,newText} = action.payload;
            const todoupdate= state.todos.find((todo)=>todo.id===id)
            
            if(todoupdate){
                todoupdate.text=newText;
            }
            
        }
    }
})

export const {addtodo,removetodo,updatetodo} = todoSlice.actions
export default todoSlice.reducer
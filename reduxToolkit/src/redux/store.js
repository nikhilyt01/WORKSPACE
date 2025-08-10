import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import todoReducer from '../features/todo/todoSlice'


export const store = configureStore({     //This approach creates a global state object where each 
  reducer: {                              //slice's state is nested under a corresponding key.   
    counter:counterReducer ,               // global state object {counter:{value:0} }  key:state of slice 
    todo:todoReducer
  },
})
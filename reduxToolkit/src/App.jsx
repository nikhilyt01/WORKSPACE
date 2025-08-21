import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount, reset } from './features/counter/counterSlice'

import AddTodo from './component/addTodo'
import { Todos } from './component/todos'

function App() {
  const [amount,setAmount]=useState(0)
  const count = useSelector((state)=> state.counter.value)  // this will extract new value
  const dispatch = useDispatch();

  function handleIncrementClick(){
    dispatch(increment())
  }
  function handleDecrementClick(){
    dispatch(decrement())
  }
  function handleResetClick(){
    dispatch(reset())
  }
  function handleIncByAmount(){
    dispatch(incrementByAmount(amount));
    setAmount(0)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-800 to-slate-900 w-screen  flex flex-col  items-center p-8">
      <div className='flex flex-col gap-4 '>
       <div className='border-1  border-white bg-slate-800  p-6 rounded text-center'>
        <button className='bg-blue-500 px-4 py-2 rounded-xl text-white  my-2' onClick={handleIncrementClick} > + </button>
        <h1 className="text-white text-3xl font-semibold">count:{count} </h1>
        <button className='bg-blue-500 px-4 py-2 rounded-xl text-white  mb-2' onClick={handleDecrementClick}> - </button>
        <button className='bg-blue-500 px-4 py-2 rounded-xl text-white ml-2  my-2' onClick={handleResetClick}> Reset</button>
        <div className='py-4 '>
          <input
           type='number'
           value={amount}
           placeholder='Enter amount'
           onChange={(e)=> setAmount(e.target.value)}
           className='bg-slate-700/95  p-2 h-8 rounded-lg'
          />
          <div className='text-center'>
           <button className='bg-red-500 px-4 py-1 rounded-xl text-white ml-2  my-2' onClick={handleIncByAmount}> Increment </button>
          </div>
        </div>
        
        
       </div>
      
       <div className='border-1 border-slate-600 shadow-lg bg-slate-800  p-6 rounded-xl'>
         <AddTodo/>
         <Todos/>
       </div>
      </div>
      
    </div>
  )
}

export default App

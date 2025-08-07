import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from './features/counter/counterSlice'

function App() {
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

  return (
    <div className="">
      <button onClick={handleIncrementClick} > + </button>
      <br/>
      <p>count:{count} </p>
       <br/>
      <button onClick={handleDecrementClick}> - </button>
       <br/>  <br/>
      <button onClick={handleResetClick}> Reset</button>
      <input
       type="number"
       />
    </div>
  )
}

export default App

import { createSlice } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
    value:0
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset:(state)=>{
      state.value =0
    },
    incrementByAmount: (state, action) => {
      state.value += Number(action.payload)
    },
  },
})

export const {increment,decrement,incrementByAmount,reset} = counterSlice.actions
export default counterSlice.reducer// in short register our slice in store
// after creation we have to mention it to store ,, so that to react on that particular actions passsing it to specific reducer
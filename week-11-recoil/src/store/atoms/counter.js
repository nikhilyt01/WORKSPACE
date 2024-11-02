import {atom,selector } from "recoil";

export const CounterAtom=atom({
    default:0,
    key:"counter"
    
})
export const evenSelector=selector({
    key:"isevenSelector",
    get:function({get}){
        const currentCount=get(CounterAtom);
        const isEven=(currentCount %2 ==0);
        return isEven
        
    }
})
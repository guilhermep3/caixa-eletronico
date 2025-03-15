import {create} from "zustand";

export const useATMStore = create((set) => ({
   password: "1234",
   balance: 10000,
   value: 0,

   withdraw: (amount) => {
      set((state) => {
         if(state.balance >= amount){
            return {balance: state.balance - amount}
         }
         return state;
      })
   },

   setValue: (amount) => {
      set((state) => {
         return {value: amount}
      })
   }
}))
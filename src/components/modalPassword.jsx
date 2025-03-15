"use client"
import { useATMStore } from "@/store/ATMstore"
import { Button } from "./button"
import { useRef, useState } from "react";

export const ModalPassword = ({ showModalPassword, setShowModalPassword, onSuccess }) => {
   const [passwordTyped, setPasswordTyped] = useState('');
   const errorMsg = useRef();
   const { password } = useATMStore();

   function handleCheckPassword() {
      if (passwordTyped == password) {
         errorMsg.current.classList.remove('visible');
         setPasswordTyped('');
         onSuccess();
      } else {
         errorMsg.current.classList.add('visible');
      };
   };

   function handleCloseModal() {
      setShowModalPassword(false);
      setPasswordTyped('');
   }
   return (
      <div
         className={`fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center bg-black/50 transition duration-300
         ${showModalPassword ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
         <div className="relative w-11/12 max-w-96 bg-gray-200 p-5 rounded-xl -mt-24 sm:mt-0">
            <span className="absolute top-1 right-2 text-xl text-zinc-800 cursor-pointer"
               onClick={handleCloseModal}>x</span>
            <div className="text-center border-b-2 border-gray-400 mb-4">
               <h1 className="text-lg mb-2">Digite sua senha:</h1>
            </div>
            <div className="text-center">
               <div className="mb-4">
                  <input type="number"
                     className="w-full bg-zinc-300 p-2 rounded-lg border border-gray-400"
                     value={passwordTyped}
                     onChange={(e) => setPasswordTyped(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleCheckPassword()}
                  />
                  <p ref={errorMsg} className="text-sm text-red-700 invisible">Senha inválida</p>
               </div>
               <Button text={'Enviar'} onClick={handleCheckPassword} />
            </div>
         </div>
      </div>
   )
}
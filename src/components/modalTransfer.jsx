import { useRef, useState } from "react"
import { Button } from "./button"
import { useATMStore } from "@/store/ATMstore";

export const ModalTransfer = ({ showModalTransfer, setShowModalTransfer, handleOpenConfirm }) => {
   const errorMsg = useRef();
   const [valueTyped, setValueTyped] = useState('');
   const { balance, withdraw, setValue } = useATMStore();

   function handleCheckWithDraw() {
      if (valueTyped === '') {
         errorMsg.current.classList.add('visible');
         errorMsg.current.innerHTML = 'Digite um valor';
      } else if (balance > valueTyped) {
         withdraw(valueTyped);
         setValue(valueTyped);
         setShowModalTransfer(false);
         setValueTyped('');
         handleOpenConfirm();
      } else {
         errorMsg.current.classList.add('visible');
         errorMsg.current.innerHTML = 'Valor acima do saldo';
      }
   };

   return (
      <div
         className={`fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center bg-black/50 transition duration-300
               ${showModalTransfer ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
         <div className="relative w-11/12 max-w-96 bg-gray-200 p-5 rounded-xl -mt-24 sm:mt-0">
            <span className="absolute top-1 right-2 text-xl text-zinc-800 cursor-pointer"
               onClick={() => setShowModalTransfer(false)}>x</span>
            <div className="text-center border-b-2 border-gray-400 mb-4">
               <h1 className="text-lg mb-2">Digite o valor que será transferido:</h1>
            </div>
            <div className="text-center">
               <div className="mb-4">
                  <input type="number"
                     className="w-full bg-zinc-300 p-2 rounded-lg border border-gray-400"
                     value={valueTyped}
                     onChange={(e) => setValueTyped(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleCheckWithDraw()}
                  />
                  <p ref={errorMsg} className="text-sm text-red-700 invisible">valor acima do saldo</p>
               </div>
               <Button text={'Enviar'} onClick={handleCheckWithDraw} />
            </div>
         </div>
      </div>
   )
}
"use client"
import { useATMStore } from "@/store/ATMstore"
import { Button } from "./button"

export const ModalConfirm = ({ showModalConfirm, setShowModalConfirm, actionModal }) => {
   const { value, withdraw, setValue } = useATMStore();

   function handleConfirm() {
      withdraw(value);
      setShowModalConfirm();
   };

   function handleCloseModal() {
      setShowModalConfirm(false);
      setPasswordTyped('');
      setValue(0);
   }
   return (
      <div
         className={`fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center bg-black/50 transition duration-300
         ${showModalConfirm ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
         <div className="relative w-11/12 max-w-96 bg-gray-200 p-5 rounded-xl -mt-24 sm:mt-0">
            <span className="absolute top-1 right-2 text-xl text-zinc-800 cursor-pointer"
               onClick={handleCloseModal}>x</span>
            <div className="text-center border-b-2 border-gray-400 mb-4">
               <h1 className="text-lg mb-2">
                  {actionModal === 'withdraw' && `Você ira sacar R$ ${value.toLocaleString('pt-BR')}`}
                  {actionModal === 'transfer' && `Você ira transferir R$ ${value.toLocaleString('pt-BR')}`}
               </h1>
            </div>
            <div className="text-center">
               <div className="mb-4">
                  <p>Você confirma este valor?</p>
               </div>
               <Button text={'Confirmar'} onClick={handleConfirm} />
            </div>
         </div>
      </div>
   )
}
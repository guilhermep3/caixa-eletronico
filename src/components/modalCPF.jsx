import { useRef, useState } from "react";
import { Button } from "./button";
import { useATMStore } from "@/store/ATMstore";
import { validateCPF } from "@/utils/cpf";
import { PatternFormat } from "react-number-format";

export const ModalCPF = ({ showModalCPF, setShowModalCPF, handleOpenTransfer }) => {
   const errorMsg = useRef();
   const [cpfTyped, setCpfTyped] = useState('');

   function handleCheckCPF() {
      if (cpfTyped === '') {
         errorMsg.current.classList.add('visible');
         errorMsg.current.innerHTML = 'Digite o CPF';
      } else if (!validateCPF(cpfTyped)) {
         errorMsg.current.classList.add('visible');
         errorMsg.current.innerHTML = 'CPF Inválido';
      } else {
         errorMsg.current.classList.remove('visible');
         handleCloseModal();
         handleOpenTransfer();
      }
   };

   function handleCloseModal() {
      setShowModalCPF(false);
      setCpfTyped('');
   }

   return (
      <div
         className={`fixed top-0 left-0 w-full h-full z-40 flex justify-center items-center bg-black/50 transition duration-300
               ${showModalCPF ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}>
         <div className="relative w-11/12 max-w-96 bg-gray-200 p-5 rounded-xl -mt-24 sm:mt-0">
            <span className="absolute top-1 right-2 text-xl text-zinc-800 cursor-pointer"
               onClick={handleCloseModal}>x</span>
            <div className="text-center border-b-2 border-gray-400 mb-4">
               <h1 className="text-lg mb-2">Digite o CPF da conta que irá receber o dinheiro:</h1>
            </div>
            <div className="text-center">
               <div className="mb-4">
                  <PatternFormat
                     format="###.###.###-##"
                     mask="_"
                     allowEmptyFormatting={false}
                     value={cpfTyped}
                     onValueChange={(e) => setCpfTyped(e.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleCheckCPF()}
                     className="w-full bg-zinc-300 p-2 rounded-lg border border-gray-400"
                  />
                  <p ref={errorMsg} className="text-sm text-red-700 invisible">valor acima do saldo</p>
               </div>
               <Button text={'Enviar'} onClick={handleCheckCPF} />
            </div>
         </div>
      </div>
   )
}
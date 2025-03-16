"use client"
import { ModalPassword } from "@/components/modalPassword";
import { ModalCPF } from "@/components/modalCPF";
import { ModalWithdraw } from "@/components/modalWithdraw";
import { useATMStore } from "@/store/ATMstore";
import { useState } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { ModalTransfer } from "@/components/modalTransfer";
import { ModalConfirm } from "@/components/modalConfirm";
import { FaPlus } from "react-icons/fa";
import { ModalDeposit } from "@/components/modalDeposit";

export default function Home() {
   const [showModalPassword, setShowModalPassword] = useState(false);
   const [showModalDeposit, setShowModalDeposit] = useState(false);
   const [showModalWithdraw, setShowModalWithdraw] = useState(false);
   const [showModalCPF, setShowModalCPF] = useState(false);
   const [showModalTransfer, setShowModalTransfer] = useState(false);
   const [showModalConfirm, setShowModalConfirm] = useState(false);
   const [actionModal, setActionModal] = useState(null); //deposit || withdraw || transfer
   const { balance } = useATMStore();

   function handleOpenDeposit(){
      setActionModal('deposit');
      setShowModalPassword(true);
   }

   function handleOpenWithdraw() {
      setActionModal('withdraw');
      setShowModalPassword(true);
   };

   function handleOpenCPF() {
      setActionModal('transfer');
      setShowModalPassword(true);
   };

   function handleOpenTransfer() {
      setActionModal('transfer');
      setShowModalTransfer(true);
   }

   function handlePasswordSuccess() {
      if(actionModal === 'deposit'){
         setShowModalPassword(false);
         setShowModalDeposit(true);
      } else if (actionModal === 'withdraw') {
         setShowModalPassword(false);
         setShowModalWithdraw(true);
      } else if (actionModal === 'transfer') {
         setShowModalPassword(false);
         setShowModalCPF(true);
      }
   };

   function handleOpenConfirm() {
      setShowModalConfirm(true);
   }

   return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-800">
         <div className="w-11/12 max-w-[640px] bg-zinc-700 p-4 sm:p-6 rounded-xl">
            <div className="flex flex-col w-full h-96 bg-gray-200 p-2 sm:p-4 rounded-md border-2 border-zinc-900">
               <div className="text-center border-b-2 border-gray-400 pb-7 text-black">
                  <h1 className="text-2xl font-bold mb-4">BANCO DIGITAL</h1>
                  <p className="text-xl mb-1">Saldo Disponível:</p>
                  <p className="text-3xl font-bold">R$ {balance.toLocaleString('pt-BR')}</p>
               </div>
               <div className="grid grid-cols-2 items-end gap-3 sm:gap-5 pt-8 h-full">
                  <button className="w-full h-14 bg-blue-900 text-white rounded-xl text-sm sm:text-base flex justify-center items-center cursor-pointer"
                     onClick={() => handleOpenDeposit()}>
                     <FaPlus className="size-5 sm:size-7 mr-1 -ml-1 sm:mr-3 sm:-ml-3" /> DEPOSITAR
                  </button>
                  <button className="w-full h-14 bg-blue-900 text-white rounded-xl text-sm sm:text-base flex justify-center items-center cursor-pointer"
                     onClick={() => handleOpenWithdraw()}>
                     <CiMoneyBill className="size-6 sm:size-7 mr-1 -ml-1 sm:mr-3 sm:-ml-3" /> SACAR
                  </button>
                  <button className="w-full h-14 bg-blue-900 text-white rounded-xl text-sm sm:text-base flex justify-center items-center cursor-pointer"
                     onClick={() => handleOpenCPF()}>
                     <FiSend className="size-5 sm:size-7 mr-1 -ml-1 sm:mr-3 sm:-ml-3" /> TRANSFERIR
                  </button>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-8 px-12 mt-5">
               <div className="space-y-4">
                  <div className="h-3 w-12 bg-zinc-600 rounded-full ml-auto" />
                  <div className="h-3 w-12 bg-zinc-600 rounded-full ml-auto" />
               </div>
               <div className="space-y-4">
                  <div className="h-3 w-12 bg-zinc-600 rounded-full" />
                  <div className="h-3 w-12 bg-zinc-600 rounded-full" />
               </div>
            </div>
         </div>
         <ModalDeposit
            showModalDeposit={showModalDeposit}
            setShowModalDeposit={setShowModalDeposit}
            handleOpenConfirm={handleOpenConfirm}
         />
         <ModalPassword
            showModalPassword={showModalPassword}
            setShowModalPassword={setShowModalPassword}
            onSuccess={handlePasswordSuccess}
         />
         <ModalConfirm
            showModalConfirm={showModalConfirm}
            setShowModalConfirm={setShowModalConfirm}
            actionModal={actionModal}
         />
         <ModalWithdraw
            showModalWithdraw={showModalWithdraw}
            setShowModalWithdraw={setShowModalWithdraw}
            handleOpenConfirm={handleOpenConfirm}
         />
         <ModalCPF
            showModalCPF={showModalCPF}
            setShowModalCPF={setShowModalCPF}
            handleOpenTransfer={handleOpenTransfer}
         />
         <ModalTransfer
            showModalTransfer={showModalTransfer}
            setShowModalTransfer={setShowModalTransfer}
            setShowModalConfirm={setShowModalConfirm}
            handleOpenConfirm={handleOpenConfirm}
            actionModal={actionModal}
         />
         <p className="text-zinc-300 mt-5 sm:mt-10 text-sm">
            Desenvolvido por <a href="https://github.com/guilhermep3" target="_blank" className="underline">Guilherme Pereira</a>
         </p>
      </div>
   );
}

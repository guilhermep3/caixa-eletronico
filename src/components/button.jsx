export const Button = ({text, onClick}) => {

   return (
      <button className={`bg-blue-900 text-white px-4 py-2 rounded-lg cursor-pointer`}
         onClick={onClick}
      >
         {text}
      </button>
   )
}
export default function Button1({ text, ...props }) {
   return (
      <button
         {...props} // repassa onClick, type, disabled, etc.
         className="border border-black w-full text-black py-2.5 font-normal text-center transition-all duration-300 ease-in-out hover:bg-[#1f512b] hover:border-[#1f512b] hover:text-white cursor-pointer"
      >
         {text}
      </button>
   );
}

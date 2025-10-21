export default function Button({ svg }) {
   return (
      <button className="text-[#1f512b] no-underline text-xl font-regular px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:text-[#c6a664] cursor-pointer">
         {svg}
      </button>
   );
}

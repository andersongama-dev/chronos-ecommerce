export default function Button({ text, url }) {
   return (
      <a
         href={url}
         className="inline-flex items-center justify-center p-0 m-0 w-[200px] mx-auto"
      >
         <button className="bg-[#1f512b] w-[200px] text-white px-8 py-4 font-semibold rounded-full text-center transition-all duration-300 ease-in-out hover:bg-[#c6a664] cursor-pointer">
            {text}
         </button>
      </a>
   );
}
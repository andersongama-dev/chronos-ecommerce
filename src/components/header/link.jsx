export default function Link({ href, children }) {
   return (
      <a
         href={href}
         className="text-white text-center no-underline text-xl font-regular px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:text-[#c6a664]"
      >
         {children}
      </a>
   );
}

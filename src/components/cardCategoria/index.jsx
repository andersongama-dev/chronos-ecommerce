"use client";

export default function CardCategoria({ img, principal, text, url }) {
   function redirecionarPara(destino) {
      window.location.href = destino;
   }

   return (
      <article
         className="w-[328px] cursor-pointer"
         onClick={() => redirecionarPara(url)}
      >
         <img
            src={img}
            alt={principal}
            className="w-[328px] h-[202px] object-cover"
         />

         <div className="mt-5 flex flex-col gap-4">
            <h3 className="text-xl text-[#1F512B] font-semibold">
               {principal}
            </h3>
            <p className="text-[#888787] text-base">{text}</p>
         </div>
      </article>
   );
}

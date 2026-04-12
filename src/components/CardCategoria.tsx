"use client";

import {useRef } from "react";

export default function CardCategoria({ img, principal, text, url }) {
   const cardRef = useRef(null);
   const imgRef = useRef(null);
   const contentRef = useRef(null);

   function redirecionarPara(destino) {
      window.location.href = destino;
   }

   return (
      <article
         className="cursor-pointer"
         onClick={() => redirecionarPara(url)}
      >
         <div className="overflow-hidden">
            <img
               ref={imgRef}
               src={img}
               alt={principal}
               className="w-full h-[202px] object-cover"
               style={{ filter: "grayscale(100%)" }}
            />
         </div>

         <div
            className="mt-5 flex flex-col gap-4 text-center"
         >
            <h3 className="text-2xl text-black font-semibold tracking-[0.02em] leading-[1.5]">
               {principal}
            </h3>
            <p className="text-gray-600 text-xl tracking-[0.02em] leading-[1.5]">
               {text}
            </p>
         </div>
      </article>
   );
}
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CardReloj({ id, nomeProd, preco, img }) {
   const router = useRouter();

   const handleClick = () => {
      router.push(`/watch/${id}`);
   };

   return (
      <article className="cursor-pointer">
         <img
            src={img}
            alt={`Imagem do produto ${nomeProd}`}
            className="h-[60dvh] object-cover w-full"
            onClick={handleClick}
         />

         <div className="grid gap-4 mt-4">
            <div className="flex justify-between">
               <h3 className="text-xl tracking-[0.02em] leading-[1.5]">{nomeProd}</h3>
               <button className="text-xl cursor-pointer">+</button>
            </div>

            <h4 className="text-xl tracking-[0.02em] leading-[1.5]">U$ {preco}</h4>
         </div>
      </article>
   );
}

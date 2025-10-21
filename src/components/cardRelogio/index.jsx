"use client";

import { useRouter } from "next/navigation";

export default function CardRelogio({ id, nomeProd, preco, qtdEstrelas, img }) {
   const router = useRouter();
   const estrelas = Array.from({ length: qtdEstrelas }, (_, i) => i + 1);

   const handleClick = () => {
      router.push(`/watch/${id}`);
   };

   return (
      <article className="[344px] h-[468px]">
         <img
            src={img}
            alt={`Imagem do produto ${nomeProd}`}
            className="w-[344px] h-[307px] object-cover"
         />

         <div className="grid gap-4 mt-4 text-center">
            <h3 className="text-xl">{nomeProd}</h3>

            <p className="flex gap-2.5 justify-center">
               {estrelas.map((estrela) => (
                  <span key={estrela}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-star-fill text-[#1F512B]"
                        viewBox="0 0 16 16"
                     >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg>
                  </span>
               ))}
            </p>

            <h4 className="text-xl font-semibold text-[#1F512B]">U$ {preco}</h4>

            <button
               onClick={handleClick}
               className="bg-[#1f512b] mx-16 text-white px-16 py-1.5 font-semibold rounded-full text-center transition-all duration-300 ease-in-out hover:bg-[#c6a664] cursor-pointer"
            >
               Buy
            </button>
         </div>
      </article>
   );
}

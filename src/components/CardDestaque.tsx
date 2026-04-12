"use client";

import { useRouter } from "next/navigation";

export default function CardDestaque({ img, name, watchId }) {
   const router = useRouter();

   const handleClick = () => {
      router.push(`/watch/${watchId}`);
   };

   return (
      <article
         onClick={handleClick}
         className="cursor-pointer w-[280px] text-center transition-transform duration-300 hover:scale-105"
      >
         <img src={img} alt={name} className="h-[327px] object-cover" />
         <div className="mt-4">
            <p className="text-gray-600 text-base">Best sellers</p>
            <h4 className="text-xl font-semibold text-[#4455de]">{name}</h4>
         </div>
      </article>
   );
}

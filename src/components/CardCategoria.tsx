"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CardCategoria({ img, principal, text, url }) {
   const cardRef = useRef(null);
   const imgRef = useRef(null);
   const contentRef = useRef(null);

   function redirecionarPara(destino) {
      window.location.href = destino;
   }

   useEffect(() => {
      const card = cardRef.current;

      const handleEnter = () => {
         // card sobe levemente
         gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
         });

         // imagem ganha cor + zoom
         gsap.to(imgRef.current, {
            filter: "grayscale(0%)",
            scale: 1.06,
            duration: 0.4,
            ease: "power2.out",
         });

         // texto sobe levemente
         gsap.to(contentRef.current, {
            y: -4,
            duration: 0.3,
            ease: "power2.out",
         });
      };

      const handleLeave = () => {
         gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
         });

         gsap.to(imgRef.current, {
            filter: "grayscale(100%)",
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
         });

         gsap.to(contentRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
         });
      };

      card.addEventListener("mouseenter", handleEnter);
      card.addEventListener("mouseleave", handleLeave);

      return () => {
         card.removeEventListener("mouseenter", handleEnter);
         card.removeEventListener("mouseleave", handleLeave);
      };
   }, []);

   return (
      <article
         ref={cardRef}
         className="w-[328px] cursor-pointer overflow-hidden"
         onClick={() => redirecionarPara(url)}
      >
         <div className="overflow-hidden">
            <img
               ref={imgRef}
               src={img}
               alt={principal}
               className="w-[328px] h-[202px] object-cover"
               style={{ filter: "grayscale(100%)" }}
            />
         </div>

         <div
            ref={contentRef}
            className="mt-5 flex flex-col gap-4"
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
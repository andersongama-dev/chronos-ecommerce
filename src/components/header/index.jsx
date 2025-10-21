"use client";

import { useState, useEffect } from "react";
import Link from "./link";
import Button from "./button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
   const { totalItems } = useCart();
   const { isAuthenticated } = useAuth();
   const [isClient, setIsClient] = useState(false);

   // Evita erros de hidratação — só ativa no cliente
   useEffect(() => {
      setIsClient(true);
   }, []);

   // 🚫 Se ainda não estiver no cliente, não renderiza nada
   if (!isClient) return null;

   return (
      <header className="flex justify-between items-center py-8 px-16 fixed w-dvw bg-white z-5000">
         <div>
            <p className="text-3xl font-semibold">
               <a href="/">Chronos</a>
            </p>
         </div>

         <nav className="nav-links">
            <ul className="flex gap-8">
               <li>
                  <Link href="/">Home</Link>
               </li>
               <li>
                  <Link href="/collection">Collection</Link>
               </li>
               <li>
                  <Link href="/about">About</Link>
               </li>
               <li>
                  <Link href="/contact">Contact</Link>
               </li>
            </ul>
         </nav>

         <div className="flex gap-2">
            {/* Botão de busca */}
            <Button
               svg={
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     fill="currentColor"
                     className="bi bi-search"
                     viewBox="0 0 16 16"
                  >
                     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
               }
            />

            {/* Favoritos */}
            <a href="/favorites">
               <Button
                  svg={
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 16 16"
                     >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                     </svg>
                  }
               />
            </a>

            {/* Carrinho */}
            <a href="/bag" className="relative">
               <Button
                  svg={
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-bag-dash"
                        viewBox="0 0 16 16"
                     >
                        <path
                           d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"
                           fillRule="evenodd"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                     </svg>
                  }
               />
               {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1f512b] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                     {totalItems}
                  </span>
               )}
            </a>

            {/* Usuário / Login */}
            <div className="flex items-center gap-4">
               {isAuthenticated ? (
                  <a href="/user">
                     <Button
                        svg={
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="bi bi-person"
                              viewBox="0 0 16 16"
                           >
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                           </svg>
                        }
                     />
                  </a>
               ) : (
                  <a href="/login">
                     <Button
                        svg={
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="bi bi-person"
                              viewBox="0 0 16 16"
                           >
                              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                           </svg>
                        }
                     />
                  </a>
               )}
            </div>
         </div>
      </header>
   );
}

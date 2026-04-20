"use client";

import { useRouter } from "next/navigation";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

import { Heart, ShoppingCart, Eye, MoreHorizontal } from "lucide-react";

export default function CardReloj({ id, nomeProd, preco, img, onRemoveFavorite, }) {
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
            <div className="flex justify-between items-center">

               <h3 className="text-xl tracking-[0.02em] leading-[1.5]">
                  {nomeProd}
               </h3>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="p-1 rounded-md hover:bg-gray-100 transition">
                        <MoreHorizontal size={18} />
                     </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                     side="right"
                     align="start"
                     className="flex items-center gap-2 p-2 rounded-xl border border-gray-100 shadow-md"
                  >
                     <TooltipProvider>

                        <Tooltip>
                           <TooltipTrigger asChild>
                              <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                 <ShoppingCart size={18} />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent>Add to cart</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                           <TooltipTrigger asChild>
                              <button className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                                 <Heart size={18} />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent>Save</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                           <TooltipTrigger asChild>
                              <button
                                 onClick={() => router.push(`/watch/${id}`)}
                                 className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                              >
                                 <Eye size={18} />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent>View</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                           <TooltipTrigger asChild>
                              <button
                                 onClick={() => onRemoveFavorite?.(id)}
                                 className="p-2 rounded-lg hover:bg-gray-100"
                              >
                                 <Heart size={18} className="text-red-500" />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent>Remove</TooltipContent>
                        </Tooltip>

                     </TooltipProvider>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <h4 className="text-xl tracking-[0.02em] leading-[1.5]">
               U$ {preco}
            </h4>
         </div>
      </article>
   );
}
"use client";
import { useState } from "react";
//import Button1 from "@/components/button1";

export default function FilterGroup({
   title,
   items,
   selectedFilters = [],
   onFilterChange,
}) {
   const [showAll, setShowAll] = useState(false);

   // Mostra só os 9 primeiros se showAll for false
   const visibleItems = showAll ? items : items.slice(0, 9);

   const handleCheckboxChange = (item, isChecked) => {
      if (onFilterChange) {
         onFilterChange(item, isChecked);
      }
   };

   return (
      <div className="flex flex-col gap-4">
         <h5 className="text-lg font-semibold mb-2">{title}</h5>
         <ul className="flex flex-col gap-2">
            {visibleItems.map((item) => (
               <li key={item}>
                  <label className="flex items-center gap-2 cursor-pointer">
                     <input
                        type="checkbox"
                        className="accent-[#1f512b]"
                        checked={selectedFilters.includes(item)}
                        onChange={(e) =>
                           handleCheckboxChange(item, e.target.checked)
                        }
                     />
                     <span>{item}</span>
                  </label>
               </li>
            ))}
         </ul>

         {/* Só mostra o botão se tiver mais de 9 itens */}
         {items.length > 9 && (
            <div className="mt-4">
              {/*
                <Button1
                  text={showAll ? "See less" : "See more"}
                  onClick={() => setShowAll((prev) => !prev)}
               /> */
              }
            </div>
         )}
      </div>
   );
}

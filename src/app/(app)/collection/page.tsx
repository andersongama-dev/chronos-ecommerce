"use client";

import { FC } from "react";
import FilterGroup from "../../../components/filterGroup";
//import CardRelogio from "@/components/cardRelogio";
//import Paginacao from "@/components/paginacao";

const Collection: FC = () => {
   return (
      <>
         <aside className="sticky top-[124px] self-start h-[calc(100vh-124px)] overflow-y-auto pt-8 pb-8 pr-4">
            <div className="flex flex-col gap-4">
               <FilterGroup
                  title="Brand"
                  items={[]}
                  selectedFilters={[]}
                  onFilterChange={() => {}}
               />
               <FilterGroup
                  title="Gender"
                  items={[]}
                  selectedFilters={[]}
                  onFilterChange={() => {}}
               />
            </div>
         </aside>

         <main className="min-h-screen pt-8">
            <div className="mb-8 flex justify-between gap-2 pr-16">
               <div className="text-sm text-gray-600">
                  0 watch(es) found
               </div>

               <div className="flex flex-wrap gap-2">
                  <button className="text-xs text-gray-500 underline">
                     Clear filters
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-4 gap-16">
               {/* Cards vão aqui */}
            </div>
         </main>

         <div className="flex justify-center mt-16 col-span-2">
            { /* <Paginacao
               currentPage={1}
               totalPages={1}
               onPageChange={() => {}}
            /> */}
         </div>
      </>
   );
};

export default Collection;
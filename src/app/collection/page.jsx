"use client";

import { useState, useEffect, useMemo } from "react";
import FilterGroup from "../../components/filterGroup";
import CardRelogio from "@/components/cardRelogio";
import Paginacao from "@/components/paginacao";

export default function Collection() {
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedBrands, setSelectedBrands] = useState([]);
   const [selectedGenders, setSelectedGenders] = useState([]);
   const itemsPerPage = 16;

   const [watches, setWatches] = useState([]);
   const [selectedStars, setSelectedStars] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("http://localhost:5000/watches/list")
         .then((res) => res.json())
         .then((data) => {
            setWatches(data);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Erro ao buscar relógios:", err);
            setLoading(false);
         });
   }, []);

   const brandsAvailable = useMemo(() => {
      const uniqueBrands = new Set(
         watches.map((w) => w.brand_name).filter(Boolean)
      );
      return Array.from(uniqueBrands).sort();
   }, [watches]);

   const gendersAvailable = useMemo(() => {
      const uniqueGenders = new Set(
         watches.map((w) => w.gender).filter(Boolean)
      );
      return Array.from(uniqueGenders).sort();
   }, [watches]);

   const starsAvailable = useMemo(() => {
      const uniqueStars = new Set(
         watches
            .map((w) => w.stars)
            .filter((s) => s !== null && s !== undefined)
            .map((s) => Math.floor(s))
      );

      return Array.from(uniqueStars).sort((a, b) => b - a);
   }, [watches]);

   const filteredWatches = useMemo(() => {
      let filtered = watches;

      if (selectedBrands.length > 0) {
         filtered = filtered.filter((w) =>
            selectedBrands.includes(w.brand_name)
         );
      }

      if (selectedGenders.length > 0) {
         filtered = filtered.filter((w) => selectedGenders.includes(w.gender));
      }

      return filtered;
   }, [watches, selectedBrands, selectedGenders]);

   const paginatedWatches = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredWatches.slice(startIndex, endIndex);
   }, [filteredWatches, currentPage]);

   const totalPages = Math.ceil(filteredWatches.length / itemsPerPage);

   const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const handleBrandFilter = (brand, isChecked) => {
      setSelectedBrands((prev) =>
         isChecked ? [...prev, brand] : prev.filter((b) => b !== brand)
      );
      setCurrentPage(1);
   };

   const handleGenderFilter = (gender, isChecked) => {
      setSelectedGenders((prev) =>
         isChecked ? [...prev, gender] : prev.filter((g) => g !== gender)
      );
      setCurrentPage(1);
   };

   const handleStarsFilter = (star, isChecked) => {
      setSelectedStars((prev) =>
         isChecked
            ? [...prev, parseInt(star)]
            : prev.filter((s) => s !== parseInt(star))
      );
      setCurrentPage(1);
   };

   return (
      <section className="pt-[124px] grid grid-cols-[274px_1fr] gap-[60px] pl-16">
         {loading ? (
            <p>Carregando relógios...</p>
         ) : (
            <>
               <aside className="sticky top-[124px] self-start h-[calc(100vh-124px)] overflow-y-auto pt-8 pb-8 pr-4">
                  <div className="flex flex-col gap-4">
                     <FilterGroup
                        title="Brand"
                        items={brandsAvailable}
                        selectedFilters={selectedBrands}
                        onFilterChange={handleBrandFilter}
                     />
                     <FilterGroup
                        title="Gender"
                        items={gendersAvailable}
                        selectedFilters={selectedGenders}
                        onFilterChange={handleGenderFilter}
                     />
                  </div>
               </aside>

               <main className="min-h-screen pt-8">
                  <div className="mb-8 flex justify-between gap-2 pr-16">
                     <div className="text-sm text-gray-600">
                        {filteredWatches.length} watch(es) found
                        {filteredWatches.length !== watches.length &&
                           ` of ${watches.length} total`}
                     </div>

                     {(selectedBrands.length > 0 ||
                        selectedGenders.length > 0) && (
                        <div className="flex flex-wrap gap-2">
                           {selectedBrands.map((brand) => (
                              <span
                                 key={brand}
                                 className="bg-[#1f512b] text-white px-2 py-1 rounded-full text-xs"
                              >
                                 {brand} ×
                              </span>
                           ))}
                           {selectedGenders.map((gender) => (
                              <span
                                 key={gender}
                                 className="bg-[#1f512b] text-white px-2 py-1 rounded-full text-xs"
                              >
                                 {gender} ×
                              </span>
                           ))}
                           <button
                              onClick={() => {
                                 setSelectedBrands([]);
                                 setSelectedGenders([]);
                                 setCurrentPage(1);
                              }}
                              className="text-xs text-gray-500 hover:text-gray-700 underline"
                           >
                              Clear filters
                           </button>
                        </div>
                     )}
                  </div>

                  <div className="grid grid-cols-4 gap-16">
                     {paginatedWatches.map((watch) => (
                        <CardRelogio
                           key={watch.id}
                           id={watch.id}
                           nomeProd={watch.name}
                           preco={watch.price}
                           qtdEstrelas={Math.round(watch.stars || 0)}
                           img={watch.image}
                        />
                     ))}
                  </div>
               </main>

               <div className="flex justify-center mt-16 col-span-2">
                  <Paginacao
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={handlePageChange}
                  />
               </div>
            </>
         )}
      </section>
   );
}

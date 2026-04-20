"use client";

import CardReloj from "@/components/CardReloj";
import FiltersBar from "@/components/Filters";
import { useState } from "react";
import { useWatches } from "@/hooks/useWatches";

export default function Collection() {
  const [filters, setFilters] = useState({
    brand: [],
    gender: [],
    style: [],
    caseMaterial: [],
    strapMaterial: [],
    strapColor: [],
  });

  const { data: watches, loading } = useWatches();

  const handleRemove = (id) => {
    console.log("remove favorite", id);
  };

  return (
    <main className="pb-16">

      <FiltersBar filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-3 mt-32 gap-12 ml-[22dvw] mr-16">

        {loading && <p>Loading...</p>}

        {!loading && watches.length === 0 && (
          <p className="text-gray-500">No watches found</p>
        )}

        {!loading &&
          watches.map((watch: any) => (
            <CardReloj
              key={watch.id}
              id={watch.id}
              img={watch.imageUrl}
              nomeProd={watch.name}
              preco={Number(watch.price)}
              onRemoveFavorite={handleRemove}
            />
          ))}
      </div>
    </main>
  );
}
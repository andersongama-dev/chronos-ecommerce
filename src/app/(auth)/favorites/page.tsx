"use client";

import Sidebar from "@/components/Sidebar";
import CardReloj from "@/components/CardReloj";
import { useWatches } from "@/hooks/useWatches";

export default function Favorites() {
  const { data: watches, loading } = useWatches();

  const favoriteIds = [1, 3];

  const favorites = watches?.filter((watch) =>
    favoriteIds.includes(watch.id)
  );

  const handleRemove = (id) => {
    console.log("remove favorite", id);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-6">
        <h1 className="text-xl font-semibold tracking-[0.02em] leading-[1.5]">
          Favorites
        </h1>

        {loading && (
          <p className="text-gray-500 tracking-[0.02em] leading-[1.5]">
            Loading...
          </p>
        )}

        {!loading && (!favorites || favorites.length === 0) && (
          <p className="text-gray-500 tracking-[0.02em] leading-[1.5]">
            You don’t have any favorites yet.
          </p>
        )}

        {!loading && favorites?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {favorites.map((watch) => (
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
        )}
      </main>
    </div>
  );
}
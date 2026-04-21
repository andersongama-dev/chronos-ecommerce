"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWatchById } from "@/services/watch";
import { useCart } from "@/hooks/useCart";

type Watch = {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  gender: string;
  style: string;
};

export default function WatchDetails() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [watch, setWatch] = useState<Watch | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getWatchById(id as string);
        setWatch(data);
      } catch (err) {
        setWatch(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  async function handleAddToCart() {
    if (!watch) return;

    try {
      setAdding(true);
      await addItem(watch.id, 1);
    } catch (err) {
      console.error("Error adding to cart", err);
    } finally {
      setAdding(false);
    }
  }

  if (loading) {
    return <main className="p-16">Loading...</main>;
  }

  if (!watch) {
    return <main className="p-16">Relógio não encontrado</main>;
  }

  return (
    <main className="px-16 pt-32 pb-16">
      <div className="grid grid-cols-2 gap-16">

        <div>
          <img
            src={watch.imageUrl}
            alt={watch.name}
            className="w-full h-[70vh] object-cover"
          />
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-6">

          <div>
            <h1 className="text-4xl tracking-[0.02em]">
              {watch.name}
            </h1>

            <p className="text-gray-500 mt-2">
              {watch.brand}
            </p>
          </div>

          <h2 className="text-3xl">
            U$ {Number(watch.price)}
          </h2>

          <div className="flex gap-4 text-sm text-gray-600">
            <span>{watch.gender}</span>
            <span>•</span>
            <span>{watch.style}</span>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="px-6 py-3 bg-black text-white rounded-lg disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add to cart"}
            </button>

            <button className="px-6 py-3 border border-black rounded-lg">
              Favorite
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
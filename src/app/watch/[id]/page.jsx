"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";

export default function WatchDetail() {
   const params = useParams();
   const router = useRouter();
   const { addToCart } = useCart();
   const watchId = params.id;

   const [watchData, setWatchData] = useState(null);
   const [quantidade, setQuantidade] = useState(1);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // 🔹 Busca os dados do relógio pela rota backend (URL fixa)
   useEffect(() => {
      async function fetchWatch() {
         try {
            setLoading(true);

            // 🔸 AQUI ALTERAMOS:
            const res = await fetch(
               `http://localhost:5000/watches/list/${watchId}`
            );

            if (!res.ok) throw new Error("Erro ao carregar relógio.");
            const data = await res.json();
            setWatchData(data);
         } catch (err) {
            console.error(err);
            setError("Não foi possível carregar os detalhes do relógio.");
         } finally {
            setLoading(false);
         }
      }

      if (watchId) fetchWatch();
   }, [watchId]);

   // 🔸 Adiciona ao carrinho
   const handleComprar = () => {
      if (!watchData) return;
      addToCart({
         id: watchData.id,
         nomeProd: watchData.name,
         preco: watchData.price,
         img: watchData.images?.[0]?.image_url || "/images/placeholder.jpg",
         quantity: quantidade,
      });
      alert(`Adicionado ao carrinho: ${watchData.name} x${quantidade}`);
   };

   const handleVoltar = () => router.back();

   if (loading)
      return (
         <div className="pt-[124px] min-h-screen flex justify-center items-center">
            <p className="text-gray-600 text-lg">Carregando detalhes...</p>
         </div>
      );

   if (error)
      return (
         <div className="pt-[124px] min-h-screen flex justify-center items-center">
            <p className="text-red-600 text-lg">{error}</p>
         </div>
      );

   if (!watchData)
      return (
         <div className="pt-[124px] min-h-screen flex justify-center items-center">
            <p className="text-gray-600 text-lg">Relógio não encontrado.</p>
         </div>
      );

   const estrelas = Array.from(
      { length: Math.round(watchData.stars || 0) },
      (_, i) => i + 1
   );

   return (
      <div className="pt-[124px] min-h-screen">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Botão voltar */}
            <button
               onClick={handleVoltar}
               className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
               >
                  <path
                     fillRule="evenodd"
                     d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
               </svg>
               Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Imagem do relógio */}
               <div className="space-y-4">
                  <div className="aspect-square bg-white rounded-lg shadow-lg p-8">
                     <img
                        src={
                           watchData.images?.[0]?.image_url ||
                           "/images/placeholder.jpg"
                        }
                        alt={watchData.images?.[0]?.alt_text || watchData.name}
                        className="w-full h-full object-contain"
                     />
                  </div>
               </div>

               {/* Informações do relógio */}
               <div className="space-y-6">
                  <div>
                     <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {watchData.name}
                     </h1>
                     <p className="text-lg text-gray-600">
                        {watchData.brand_name}
                     </p>
                  </div>

                  {/* Avaliações */}
                  <div className="flex items-center gap-2">
                     <div className="flex gap-1">
                        {estrelas.map((estrela) => (
                           <svg
                              key={estrela}
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-star-fill text-[#1F512B]"
                              viewBox="0 0 16 16"
                           >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                           </svg>
                        ))}
                     </div>
                     <span className="text-gray-600">
                        ({watchData.stars || 0} reviews)
                     </span>
                  </div>

                  {/* Preço */}
                  <div className="text-3xl font-bold text-[#1F512B]">
                     U$ {Number(watchData.price).toFixed(2)}
                  </div>

                  {/* Descrição */}
                  <div>
                     <h3 className="text-lg font-semibold mb-2">Description</h3>
                     <p className="text-gray-600">{watchData.description}</p>
                  </div>

                  {/* Especificações */}
                  {watchData.specifications && (
                     <div>
                        <h3 className="text-lg font-semibold mb-2">
                           Specifications
                        </h3>
                        <p className="text-gray-600 whitespace-pre-line">
                           {watchData.specifications}
                        </p>
                     </div>
                  )}

                  {/* Disponibilidade */}
                  <div className="flex items-center gap-2">
                     <span className="text-sm font-medium">Availability:</span>
                     <span
                        className={
                           watchData.availability
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                        }
                     >
                        {watchData.availability ? "In stock" : "Unavailable"}
                     </span>
                  </div>

                  {/* Quantidade e compra */}
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium mb-2">
                           Quantity:
                        </label>
                        <div className="flex items-center gap-4">
                           <button
                              onClick={() =>
                                 setQuantidade(Math.max(1, quantidade - 1))
                              }
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                           >
                              -
                           </button>
                           <span className="text-lg font-medium w-8 text-center">
                              {quantidade}
                           </span>
                           <button
                              onClick={() => setQuantidade(quantidade + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                           >
                              +
                           </button>
                        </div>
                     </div>

                     <button
                        onClick={handleComprar}
                        disabled={!watchData.availability}
                        className={`w-full py-4 px-6 cursor-pointer rounded-lg font-semibold text-lg transition-colors ${
                           watchData.availability
                              ? "bg-[#1f512b] text-white hover:bg-[#c6a664]"
                              : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                     >
                        Buy Now
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WatchesAdmin() {
   const [watches, setWatches] = useState([]);

   // 🔹 Carrega os relógios
   const fetchWatches = () => {
      fetch("http://localhost:5000/watches/list", {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
         .then((res) => res.json())
         .then(setWatches)
         .catch(console.error);
   };

   useEffect(() => {
      fetchWatches();
   }, []);

   // 🔹 Deleta um relógio
   const handleDelete = async (id) => {
      if (!confirm("Deseja realmente excluir este relógio?")) return;

      try {
         const res = await fetch(`http://localhost:5000/watches/delete/${id}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         if (res.ok) {
            alert("Relógio excluído com sucesso!");
            fetchWatches(); // Atualiza a lista
         } else {
            const data = await res.json();
            alert("Erro ao excluir: " + (data.error || res.statusText));
         }
      } catch (err) {
         console.error(err);
         alert("Erro de conexão com o servidor");
      }
   };

   return (
      <div>
         <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Relógios</h1>
            <Link
               href="/admin/watches/new"
               className="bg-[#1F512B] text-white px-4 py-2 rounded"
            >
               + Novo Relógio
            </Link>
         </div>

         <table className="w-full border-collapse">
            <thead className="bg-gray-100">
               <tr>
                  <th className="p-2 text-left">Nome</th>
                  <th className="p-2 text-left">Marca</th>
                  <th className="p-2 text-left">Preço</th>
                  <th className="p-2 text-left">Estoque</th>
                  <th className="p-2 text-left">Ações</th>
               </tr>
            </thead>
            <tbody>
               {watches.map((w) => (
                  <tr key={w.id} className="border-b">
                     <td className="p-2">{w.name}</td>
                     <td className="p-2">{w.brand_name || "—"}</td>
                     <td className="p-2">R${w.price.toLocaleString()}</td>
                     <td className="p-2">{w.stock_quantity}</td>
                     <td className="p-2 flex gap-2">
                        <Link
                           href={`/admin/watches/edit/${w.id}`}
                           className="text-blue-600 hover:underline"
                        >
                           Editar
                        </Link>
                        <button
                           onClick={() => handleDelete(w.id)}
                           className="text-red-600 hover:underline"
                        >
                           Excluir
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

"use client"; // ⚠️ ESSENCIAL

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditWatchPage() {
   const router = useRouter();
   const { id } = useParams(); // pega o ID da URL
   const [form, setForm] = useState({
      name: "",
      brand_id: "",
      description: "",
      specifications: "",
      price: "",
      stars: "",
      stock_quantity: "",
      gender: "Unisex",
      style: "",
      case_material: "",
      strap_material: "",
      strap_color: "",
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch(`http://localhost:5000/watches/list/${id}`)
         .then((res) => res.json())
         .then((data) => {
            setForm({
               name: data.name || "",
               brand_id: data.brand_id || "",
               description: data.description || "",
               specifications: data.specifications || "",
               price: data.price || "",
               stars: data.stars || "",
               stock_quantity: data.stock_quantity || "",
               gender: data.gender || "Unisex",
               style: data.style || "",
               case_material: data.case_material || "",
               strap_material: data.strap_material || "",
               strap_color: data.strap_color || "",
            });
            setLoading(false);
         });
   }, [id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
         ...form,
         price: Number(form.price),
         stars: Number(form.stars),
         stock_quantity: Number(form.stock_quantity),
         brand_id: Number(form.brand_id),
      };

      try {
         const res = await fetch(`http://localhost:5000/watches/upd/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(payload),
         });

         if (res.ok) {
            alert("Relógio atualizado com sucesso!");
            router.push("/admin/watches");
         } else {
            const errorData = await res.json();
            alert("Erro ao atualizar: " + (errorData.error || res.statusText));
         }
      } catch (err) {
         console.error(err);
         alert("Erro de conexão com o servidor");
      }
   };

   if (loading) return <p>Carregando...</p>;

   return (
      <form
         onSubmit={handleSubmit}
         className="flex flex-col gap-3 max-w-lg p-6 bg-[#121212] rounded-2xl text-white"
      >
         <h2 className="text-xl font-semibold mb-2">Editar Relógio</h2>
         <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="description"
            placeholder="Descrição"
            value={form.description}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="specifications"
            placeholder="Especificações"
            value={form.specifications}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="price"
            type="number"
            placeholder="Preço"
            value={form.price}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="stars"
            type="number"
            min="0"
            max="5"
            placeholder="Estrelas"
            value={form.stars}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="stock_quantity"
            type="number"
            min="0"
            placeholder="Estoque"
            value={form.stock_quantity}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="style"
            placeholder="Estilo"
            value={form.style}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="case_material"
            placeholder="Material da Caixa"
            value={form.case_material}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="strap_material"
            placeholder="Material da Pulseira"
            value={form.strap_material}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="strap_color"
            placeholder="Cor da Pulseira"
            value={form.strap_color}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <button
            type="submit"
            className="bg-[#1F512B] hover:bg-[#2C6B3C] transition p-2 rounded mt-2"
         >
            Atualizar Relógio
         </button>
      </form>
   );
}

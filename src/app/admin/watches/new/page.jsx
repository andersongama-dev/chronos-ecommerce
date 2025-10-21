"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewWatch() {
   const router = useRouter();
   const [brands, setBrands] = useState([]);
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

   // 🔹 Carrega as marcas do backend
   useEffect(() => {
      fetch("http://localhost:5000/brands")
         .then((res) => {
            if (!res.ok) throw new Error("Erro ao buscar marcas");
            return res.json();
         })
         .then(setBrands)
         .catch((err) => {
            console.error(err);
            alert("Não foi possível carregar as marcas");
         });
   }, []);

   // 🔹 Atualiza o estado do formulário
   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   // 🔹 Envia o formulário
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
         const res = await fetch("http://localhost:5000/watches", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(payload),
         });

         if (res.ok) {
            alert("Relógio criado com sucesso!");
            router.push("/admin/watches");
         } else {
            const errorData = await res.json();
            console.error(errorData);
            alert(
               "Erro ao criar relógio: " +
                  (errorData.error || errorData.message || res.statusText)
            );
         }
      } catch (error) {
         console.error(error);
         alert("Erro de conexão com o servidor");
      }
   };

   return (
      <form
         className="flex flex-col gap-3 max-w-lg bg-[#121212] p-6 rounded-2xl text-white"
         onSubmit={handleSubmit}
      >
         <h2 className="text-xl font-semibold mb-2">Novo Relógio</h2>

         <input
            name="name"
            placeholder="Nome do Relógio"
            onChange={handleChange}
            value={form.name}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <select
            name="brand_id"
            onChange={handleChange}
            value={form.brand_id}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         >
            <option value="">Selecione a marca</option>
            {brands.map((b) => (
               <option key={b.id} value={b.id}>
                  {b.name}
               </option>
            ))}
         </select>

         <textarea
            name="description"
            placeholder="Descrição do relógio"
            onChange={handleChange}
            value={form.description}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <textarea
            name="specifications"
            placeholder="Especificações técnicas"
            onChange={handleChange}
            value={form.specifications}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="price"
            type="number"
            placeholder="Preço (R$)"
            onChange={handleChange}
            value={form.price}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="stars"
            type="number"
            min="0"
            max="5"
            placeholder="Estrelas (0 a 5)"
            onChange={handleChange}
            value={form.stars}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="stock_quantity"
            type="number"
            min="0"
            placeholder="Quantidade em Estoque"
            onChange={handleChange}
            value={form.stock_quantity}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <select
            name="gender"
            onChange={handleChange}
            value={form.gender}
            className="bg-[#1E1E1E] p-2 rounded"
         >
            <option value="Male">Masculino</option>
            <option value="Female">Feminino</option>
            <option value="Unisex">Unissex</option>
            <option value="Kids">Infantil</option>
         </select>

         <input
            name="style"
            placeholder="Estilo (ex: Luxo, Esportivo...)"
            onChange={handleChange}
            value={form.style}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="case_material"
            placeholder="Material da Caixa"
            onChange={handleChange}
            value={form.case_material}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="strap_material"
            placeholder="Material da Pulseira"
            onChange={handleChange}
            value={form.strap_material}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="strap_color"
            placeholder="Cor da Pulseira"
            onChange={handleChange}
            value={form.strap_color}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <button
            type="submit"
            className="bg-[#1F512B] hover:bg-[#2C6B3C] transition p-2 rounded text-white font-semibold mt-2"
         >
            Criar Relógio
         </button>
      </form>
   );
}

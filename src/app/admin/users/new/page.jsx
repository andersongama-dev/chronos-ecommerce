"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IMaskInput } from "react-imask";


export default function NewUser() {
   const router = useRouter();
   const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      role: "user",
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(form),
         });

         if (res.ok) {
            alert("Usuário criado com sucesso!");
            router.push("/admin/users");
         } else {
            const data = await res.json();
            alert("Erro ao criar usuário: " + (data.error || res.statusText));
         }
      } catch (err) {
         console.error(err);
         alert("Erro de conexão com o servidor");
      } finally {
         setLoading(false);
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="flex flex-col gap-3 max-w-lg bg-[#121212] p-6 rounded-2xl text-white"
      >
         <h2 className="text-xl font-semibold mb-2">Novo Usuário</h2>

         <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <IMaskInput
            mask="+0 (000) 000-0000"
            value={form.phone}
            onAccept={(value) => setForm({ ...form, phone: value })}
            placeholder="Telefone"
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <input
            name="password"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
         </select>

         <button
            type="submit"
            disabled={loading}
            className="bg-[#1F512B] hover:bg-[#2C6B3C] transition p-2 rounded mt-2"
         >
            {loading ? "Criando..." : "Criar Usuário"}
         </button>
      </form>
   );
}

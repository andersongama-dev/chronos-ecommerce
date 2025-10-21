"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // ajuste o path se necessário

export default function EditUserPage() {
   const router = useRouter();
   const { id } = useParams();
   const { user, isAuthenticated } = useAuth(); // pega o user e token do contexto
   const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "user",
   });
   const [loading, setLoading] = useState(true);

   // 🔹 Redireciona se não estiver autenticado
   useEffect(() => {
      if (isAuthenticated === false) router.push("/login");
   }, [isAuthenticated, router]);

   // 🔹 Carrega os dados do usuário
   useEffect(() => {
      if (!isAuthenticated) return;

      const fetchUser = async () => {
         try {
            const token = localStorage.getItem("token"); // ou useAuth pode fornecer
            const res = await fetch(`http://localhost:5000/users/${id}`, {
               headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
               alert("Usuário não encontrado");
               router.push("/admin/users");
               return;
            }

            const data = await res.json();
            setForm({
               name: data.user.name || "",
               email: data.user.email || "",
               phone: data.user.phone || "",
               address: data.user.address || "",
               role: data.user.role || "user",
            });
            setLoading(false);
         } catch (err) {
            console.error(err);
            alert("Erro ao carregar dados do usuário");
            router.push("/admin/users");
         }
      };

      fetchUser();
   }, [id, isAuthenticated, router]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const token = localStorage.getItem("token");
         const res = await fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
         });

         if (res.ok) {
            alert("Usuário atualizado com sucesso!");
            router.push("/admin/users");
         } else {
            const errorData = await res.json();
            alert(
               "Erro ao atualizar usuário: " +
                  (errorData.error || res.statusText)
            );
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
         <h2 className="text-xl font-semibold mb-2">Editar Usuário</h2>
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
         <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
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
            className="bg-[#1F512B] hover:bg-[#2C6B3C] transition p-2 rounded mt-2"
         >
            Atualizar Usuário
         </button>
      </form>
   );
}

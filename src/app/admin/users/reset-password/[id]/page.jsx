"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ResetPasswordPage() {
   const router = useRouter();
   const { id } = useParams(); // ID do usuário
   const [form, setForm] = useState({
      password: "",
      confirmPassword: "",
   });
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (form.password !== form.confirmPassword) {
         alert("As senhas não coincidem!");
         return;
      }

      setLoading(true);

      try {
         const res = await fetch(
            `http://localhost:5000/users/reset-password/${id}`,
            {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
               body: JSON.stringify({ password: form.password }),
            }
         );

         if (res.ok) {
            alert("Senha atualizada com sucesso!");
            router.push("/admin/users");
         } else {
            const data = await res.json();
            alert("Erro ao atualizar senha: " + (data.error || res.statusText));
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
         className="flex flex-col gap-3 max-w-lg p-6 bg-[#121212] rounded-2xl text-white"
      >
         <h2 className="text-xl font-semibold mb-2">Redefinir Senha</h2>

         <input
            type="password"
            name="password"
            placeholder="Nova Senha"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />
         <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Senha"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="bg-[#1E1E1E] p-2 rounded"
         />

         <button
            type="submit"
            disabled={loading}
            className="bg-[#1F512B] hover:bg-[#2C6B3C] transition p-2 rounded mt-2"
         >
            {loading ? "Atualizando..." : "Redefinir Senha"}
         </button>
      </form>
   );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UsersAdmin() {
   const [users, setUsers] = useState([]);

   const fetchUsers = () => {
      fetch("http://localhost:5000/users/list", {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
         .then((res) => res.json())
         .then(setUsers)
         .catch(console.error);
   };

   useEffect(() => {
      fetchUsers();
   }, []);

   const handleDelete = async (id) => {
      if (!confirm("Deseja realmente excluir este usuário?")) return;

      try {
         const res = await fetch(`http://localhost:5000/users/delete/${id}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         });

         if (res.ok) {
            alert("Usuário excluído com sucesso!");
            fetchUsers();
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
            <h1 className="text-2xl font-bold">Usuários</h1>
            <Link
               href="/admin/users/new"
               className="bg-[#1F512B] text-white px-4 py-2 rounded"
            >
               + Novo Usuário
            </Link>
         </div>

         <table className="w-full border-collapse">
            <thead className="bg-gray-100">
               <tr>
                  <th className="p-2 text-left">Nome</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Telefone</th>
                  <th className="p-2 text-left">Endereço</th>
                  <th className="p-2 text-left">Ações</th>
               </tr>
            </thead>
            <tbody>
               {users.map((u) => (
                  <tr key={u.id} className="border-b">
                     <td className="p-2">{u.name}</td>
                     <td className="p-2">{u.email}</td>
                     <td className="p-2">{u.phone || "—"}</td>
                     <td className="p-2">{u.address || "—"}</td>
                     <td className="p-2 flex gap-2">
                        <Link
                           href={`/admin/users/edit/${u.id}`}
                           className="text-blue-600 hover:underline"
                        >
                           Editar
                        </Link>
                        <Link
                           href={`/admin/users/reset-password/${u.id}`}
                           className="text-orange-600 hover:underline"
                        >
                           Redefinir Senha
                        </Link>
                        <button
                           onClick={() => handleDelete(u.id)}
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

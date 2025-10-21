"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout({ children }) {
   const { isAuthenticated, user, logout } = useAuth();

   if (!isAuthenticated) return <p>Carregando...</p>;
   if (!user || user.role !== "admin") return <p>Acesso negado</p>;

   return (
      <div className="flex min-h-screen">
         <aside className="w-64 bg-[#1F512B] text-white p-6 flex flex-col">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <nav className="flex flex-col gap-4">
               <Link href="/admin">Dashboard</Link>
               <Link href="/admin/watches">Relógios</Link>
               <Link href="/admin/users">Usuarios</Link>
               <button
                  onClick={logout}
                  className="mt-auto bg-red-500 p-2 rounded text-sm"
               >
                  Logout
               </button>
            </nav>
         </aside>
         <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
   );
}

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuth";

export default function User() {
   const { user, logout, updateProfile } = useAuth();
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
   });
   const [success, setSuccess] = useState("");

   // Hook de redirecionamento SEM condicional
   const loadingAuthRedirect = useAuthRedirect(false);

   // Atualiza formData quando o user estiver definido
   useEffect(() => {
      if (user) {
         setFormData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
         });
      }
   }, [user]);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleLogout = () => logout();

   const handleSubmit = (e) => {
      e.preventDefault();
      const result = updateProfile?.(formData);
      if (result?.success) {
         setSuccess("Perfil atualizado com sucesso!");
         setIsEditing(false);
         setTimeout(() => setSuccess(""), 3000);
      }
   };

   // Renderiza somente quando a autenticação estiver carregada
   if (loadingAuthRedirect || user === undefined || user === null) {
      return <p>Carregando...</p>;
   }

   return (
      <div className="pt-[124px] min-h-screen bg-gray-50">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               {/* Header do perfil */}
               <div className="bg-[#1f512b] px-6 py-8 text-white flex items-center justify-between">
                  <div>
                     <h1 className="text-3xl font-bold">My Profile</h1>
                     <p className="text-gray-200 mt-2">
                        Manage your personal information
                     </p>
                  </div>
                  <div className="flex gap-4">
                     <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-white text-[#1f512b] px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                     >
                        {isEditing ? "Cancel" : "Edit"}
                     </button>
                     <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
                     >
                        Logout
                     </button>
                  </div>
               </div>

               {/* Conteúdo do perfil */}
               <div className="p-6">
                  {success && (
                     <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                     </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                           </label>
                           <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f512b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                           </label>
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f512b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone
                           </label>
                           <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f512b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                              Address
                           </label>
                           <textarea
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              rows={3}
                              disabled={!isEditing}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f512b] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                           />
                        </div>
                     </div>

                     {isEditing && (
                        <div className="flex justify-end gap-4">
                           <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition-colors"
                           >
                              Cancel
                           </button>
                           <button
                              type="submit"
                              className="px-6 py-2 bg-[#1f512b] text-white rounded-md font-semibold hover:bg-[#c6a664] transition-colors"
                           >
                              Save Changes
                           </button>
                        </div>
                     )}
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

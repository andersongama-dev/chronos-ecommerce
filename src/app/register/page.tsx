"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Register() {
   useAuthRedirect(true);

   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
   });
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { register } = useAuth();
   const router = useRouter();

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      if (formData.password !== formData.confirmPassword) {
         setError("As senhas não coincidem");
         setIsLoading(false);
         return;
      }

      if (formData.password.length < 6) {
         setError("A senha deve ter pelo menos 6 caracteres");
         setIsLoading(false);
         return;
      }

      const result = await register({
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         password: formData.password,
         address: formData.address,
      });

      if (result.success) {
         router.push("/login");
      } else {
         setError(result.message);
      }

      setIsLoading(false);
   };

   const inputClass =
      "border-b border-gray-400 p-4 text-gray-400 placeholder-gray-400 w-full focus:border-[#1F512B] focus:text-[#1F512B] focus:placeholder-[#1F512B] outline-none";

   return (
      <div className="grid grid-cols-2 gap-8 h-dvh px-16 py-16">
         <img
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
         />

         <div className="flex flex-col gap-4">
            <div className="">
               <h1 className="text-6xl font-extrabold text-[#1f512b] text-center">
                  Welcome to Chronos
               </h1>
               <p className="text-base text-[#888787] text-center">
                  Fill in your details to sign up
               </p>
            </div>

            {error && (
               <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
               </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
               <div>
                  <label
                     htmlFor="name"
                     className="block text-sm font-medium text-gray-700 mb-2"
                  >
                     Full Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                     placeholder="Your full name"
                     className={inputClass}
                  />
               </div>

               <div>
                  <label
                     htmlFor="email"
                     className="block text-sm font-medium text-gray-700 mb-2"
                  >
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     placeholder="nome@chronos.com"
                     className={inputClass}
                  />
               </div>

               <div>
                  <label
                     htmlFor="phone"
                     className="block text-sm font-medium text-gray-700 mb-2"
                  >
                     Phone
                  </label>
                  <input
                     type="tel"
                     id="phone"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     placeholder="(11) 99999-9999"
                     className={inputClass}
                  />
               </div>

               <div>
                  <label
                     htmlFor="address"
                     className="block text-sm font-medium text-gray-700 mb-2"
                  >
                     Address
                  </label>
                  <textarea
                     id="address"
                     name="address"
                     value={formData.address}
                     onChange={handleChange}
                     rows={3}
                     placeholder="Seu endereço completo"
                     className={inputClass}
                  />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                     >
                        Senha
                     </label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Minimum 6 characters"
                        className={inputClass}
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-2"
                     >
                        Confirm Password
                     </label>
                     <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Enter password again"
                        className={inputClass}
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1f512b] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#c6a664] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {isLoading ? "Creating account..." : "Create Account"}
               </button>
            </form>

            <div className="flex justify-between mt-6 text-gray-600">
               <Link
                  href="/login"
                  className="text-[#1f512b] hover:underline font-semibold"
               >
                  Already have an account? Sign In
               </Link>
               <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-700 text-sm"
               >
                  ← Back to homepage
               </Link>
            </div>
         </div>
      </div>
   );
}

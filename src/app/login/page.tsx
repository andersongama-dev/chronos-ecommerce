"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Login() {
   useAuthRedirect(true);

   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const { login } = useAuth();
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

      const result = await login({
         email: formData.email,
         password: formData.password,
      });

      if (result.success) {
         router.push("/user");
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
            <div className="text-center mb-8">
               <h1 className="text-6xl font-extrabold text-[#1f512b] text-center">
                  Welcome back to Chronos
               </h1>
               <p className="text-gray-600">
                  Sign in to your account to continue
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
                     placeholder="Your password"
                     className={inputClass}
                  />
               </div>

               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1f512b] text-white py-3 px-4 rounded-md font-semibold hover:bg-[#c6a664] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  {isLoading ? "Signing in..." : "Sign In"}
               </button>
            </form>

            <div className="mt-6 text-center">
               <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                     href="/register"
                     className="text-[#1f512b] hover:underline font-semibold"
                  >
                     Sign Up
                  </Link>
               </p>
            </div>

            <div className="mt-6 text-center">
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

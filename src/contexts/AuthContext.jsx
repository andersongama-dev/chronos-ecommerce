"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
         setIsAuthenticated(false);
         return;
      }

      const fetchProfile = async () => {
         try {
            const res = await fetch("http://localhost:5000/users/profile", {
               headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
               setIsAuthenticated(false);
               return;
            }

            const data = await res.json();
            setUser(data.user);
            setIsAuthenticated(true);
         } catch (err) {
            console.error(err);
            setIsAuthenticated(false);
         }
      };

      fetchProfile();
   }, []);

   const register = async ({ name, email, phone, password, address }) => {
      try {
         const res = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, password, address }),
         });
         const data = await res.json();

         if (!res.ok)
            return {
               success: false,
               message: data.error || "Erro ao cadastrar",
            };

         return { success: true, data };
      } catch (err) {
         console.error(err);
         return { success: false, message: "Erro de conexão com o servidor" };
      }
   };

   const login = async ({ email, password }) => {
      try {
         const res = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
         });

         const data = await res.json();
         if (!res.ok)
            return { success: false, message: data.error || "Erro no login" };

         localStorage.setItem("token", data.token);
         setUser(data.user);
         setIsAuthenticated(true);

         return { success: true, data };
      } catch (err) {
         console.error(err);
         return { success: false, message: "Erro de conexão com o servidor" };
      }
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/login";
   };

   return (
      <AuthContext.Provider
         value={{ user, isAuthenticated, register, login, logout }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);

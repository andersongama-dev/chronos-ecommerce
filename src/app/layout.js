"use client";

import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
   const pathname = usePathname();

   const hideHeaderFooter =
      pathname === "/login" ||
      pathname === "/register" ||
      pathname.startsWith("/admin");

   return (
      <html lang="en">
         <body>
            <AuthProvider>
               <CartProvider>
                  {!hideHeaderFooter && <Header />}
                  {children}
                  {!hideHeaderFooter && <Footer />}
               </CartProvider>
            </AuthProvider>
         </body>
      </html>
   );
}

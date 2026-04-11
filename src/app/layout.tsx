"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "../components/Header";

export default function RootLayout({ children }) {
   const pathname = usePathname();

   return (
      <html lang="en">
         <body>
            <Header />
            {children}
         </body>
      </html>
   );
}

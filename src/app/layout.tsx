"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }) {
   const pathname = usePathname();

   return (
      <html lang="en" className={cn("font-sans", geist.variable)}>
         <body>
            <Header />
            {children}
         </body>
      </html>
   );
}

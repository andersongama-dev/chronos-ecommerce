"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const hideFooter = pathname === "/collection";

    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
                <Header />
                {children}
                {!hideFooter && <Footer />}
            </body>
        </html>
    );
}
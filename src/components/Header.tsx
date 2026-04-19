"use client";

import { useEffect, useRef } from "react";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
   const headerRef = useRef(null);

   useEffect(() => {
      const header = headerRef.current;

      gsap.set(header, {
         backgroundColor: "transparent",
      });

      gsap.to(header, {
         scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=200",
            scrub: true,
         },
         backdropFilter: "blur(20px)",
         backgroundColor: "rgba(255,255,255,0.7)",
         borderBottom: "0px solid rgba(0,0,0,0.05)",
         paddingTop: "16px",
         paddingBottom: "16px",
         ease: "none",
      });

      let lastScroll = 0;

      ScrollTrigger.create({
         start: 0,
         end: "max",
         onUpdate: (self) => {
            const current = self.scroll();

            if (current > lastScroll && current > 100) {
               gsap.to(header, {
                  y: -100,
                  duration: 0.3,
               });
            } else {
               gsap.to(header, {
                  y: 0,
                  duration: 0.3,
               });
            }

            lastScroll = current;
         },
      });

   }, []);

   return (
      <header
         ref={headerRef}
         className="flex justify-between items-center py-6 px-16 fixed top-0 w-full z-50 transition-all"
      >
         <div>
            <p className="text-3xl font-semibold text-black tracking-[0.01em] leading-[1.2]">
               <Link href="/">Chronos</Link>
            </p>
         </div>

         <nav className="backdrop-blur-xl bg-[#1F512B]/10 border border-white/20 rounded-full px-8 py-3 shadow-sm">
            <ul className="flex gap-8 text-black">
               <li><Link href="/" className="hover:opacity-70 transition tracking-[0.02em] leading-[1.5]">Home</Link></li>
               <li><Link href="/collection" className="hover:opacity-70 transition tracking-[0.02em] leading-[1.5]">Collection</Link></li>
               <li><Link href="/about" className="hover:opacity-70 transition tracking-[0.02em] leading-[1.5]">About</Link></li>
            </ul>
         </nav>

         <div className="flex gap-6 items-center text-black">
            <button className="hover:opacity-70 transition cursor-pointer">
               <Search />
            </button>

            <Link href="/favorites">
               <button className="hover:opacity-70 transition cursor-pointer">
                  <Heart />
               </button>
            </Link>

            <Link href="/bag">
               <button className="hover:opacity-70 transition cursor-pointer">
                  <ShoppingBag />
               </button>
            </Link>

            <Link href="/login">
               <button className="hover:opacity-70 transition cursor-pointer">
                  <User />
               </button>
            </Link>
         </div>
      </header>
   );
}
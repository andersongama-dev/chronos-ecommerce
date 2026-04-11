"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextField } from "@mui/material";
import Particles from "../components/Particles";
import SplitText from "../components/SplitText";
import CardCategoria from "../components/CardCategoria";
import CardDestaque from "../components/CardDestaque";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
   const heroRef = useRef(null);
   const promoRef = useRef(null);
   const newsletterRef = useRef(null);

   useEffect(() => {
      const ctx = gsap.context(() => {

         const tl = gsap.timeline();

         tl.from(".hero-title", {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
         })
            .from(".hero-sub", {
               y: 40,
               opacity: 0,
               duration: 0.8,
            }, "-=0.6")
            .from(".hero-cta", {
               scale: 0.9,
               opacity: 0,
               duration: 0.6,
               ease: "back.out(1.7)"
            }, "-=0.5");

         gsap.utils.toArray(".animate-group").forEach((container: any) => {
            const items = container.querySelectorAll(".animate-item");

            gsap.from(items, {
               scrollTrigger: {
                  trigger: container,
                  start: "top 80%",
               },
               y: 80,
               opacity: 0,
               duration: 1,
               stagger: 0.2,
               ease: "power3.out",
            });
         });

         gsap.to(promoRef.current, {
            scrollTrigger: {
               trigger: promoRef.current,
               start: "top bottom",
               end: "bottom top",
               scrub: true,
            },
            y: -100,
            ease: "none",
         });

         gsap.from(newsletterRef.current.querySelectorAll("*"), {
            scrollTrigger: {
               trigger: newsletterRef.current,
               start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
         });

      });

      return () => ctx.revert();
   }, []);

   const handleAnimationComplete = () => {
      console.log("SplitText animation done");
   };

   return (
      <main>

         <section className="h-dvh flex items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
               <Particles
                  particleColors={["#1f512b"]}
                  particleCount={200}
                  particleSpread={15}
                  speed={0.3}
                  particleBaseSize={100}
                  moveParticlesOnHover={true}
                  alphaParticles={false}
                  disableRotation={false}
                  pixelRatio={1}
               />
            </div>

            <div ref={heroRef} className="flex flex-col gap-4 justify-center">
               <h1 className="hero-title text-7xl font-extrabold text-black tracking-[0.01em] leading-[1.3]">
                  <SplitText
                     text="Discover Watches That"
                     delay={50}
                     duration={1.25}
                     ease="power3.out"
                     splitType="chars"
                     from={{ opacity: 0, y: 40 }}
                     to={{ opacity: 1, y: 0 }}
                     onLetterAnimationComplete={handleAnimationComplete}
                  />
                  <span className="block text-[#1F512B]">Define You</span>
               </h1>

               <p className="hero-sub text-xl text-gray-600">
                  Where luxury and modern design meet.
               </p>

               <button
                  className="hero-cta bg-[#1f512b] text-white px-8 py-4 rounded-full mt-6 w-64 mx-auto"
                  onMouseEnter={(e) =>
                     gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })
                  }
                  onMouseLeave={(e) =>
                     gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })
                  }
               >
                  Explore Collection
               </button>
            </div>
         </section>

         <section className="flex gap-8 justify-center mt-16 animate-group">

            <div className="animate-item">
               <CardCategoria
                  img="https://http2.mlstatic.com/D_NQ_NP_918472-MLA89948232053_082025-O.webp"
                  principal="Elite Collection"
                  text="Selected models from the most prestigious brands."
                  url=""
               />
            </div>

            <div className="animate-item">
               <CardCategoria
                  img="https://http2.mlstatic.com/D_Q_NP_922448-CBT88208101500_072025-O.webp"
                  principal="Sophistication"
                  text="Timeless design with modern precision."
                  url=""
               />
            </div>

            <div className="animate-item">
               <CardCategoria
                  img="https://idealjoyeros.com/wp-content/uploads/mejores-relojes-titanio.jpeg"
                  principal="Exclusivity"
                  text="Rare and unique timepieces."
                  url=""
               />
            </div>

         </section>

         <section className="flex gap-8 justify-center mt-32 animate-group">

            <div className="animate-item">
               <CardDestaque
                  img="https://dryzun.vteximg.com.br/arquivos/ids/173319/m126613lb-0002--1-.jpg"
                  name="Rolex Submariner"
                  watchId={3}
               />
            </div>

            <div className="animate-item">
               <CardDestaque
                  img="https://cdn.awsli.com.br/2500x2500/568/568258/produto/306361021/orient-ra-tx0207r.png"
                  name="Orient Mako Solar"
                  watchId={2}
               />
            </div>

            <div className="animate-item">
               <CardDestaque
                  img="https://montecarlo.vtexassets.com/arquivos/ids/729948/NIM030784_1.jpg"
                  name="Seiko Presage"
                  watchId={1}
               />
            </div>

         </section>

         <section className="px-16 mt-16">
            <img
               ref={promoRef}
               src="https://www.marketing91.com/wp-content/uploads/2015/05/Rolex-Marketing-Strategy-1024x655.png"
               className="w-dvw h-[600px] object-cover rounded-4xl"
            />

            <div className="mt-8 animate-group">
               <div className="animate-item">
                  <h3 className="text-[#1F512B] text-xl font-semibold">
                     Exclusive Promotion
                  </h3>
               </div>

               <div className="animate-item">
                  <p className="text-[#898989] text-base w-1/4 mt-4">
                     Special highlight on selected models with promotional values
                     for a limited time.
                  </p>
               </div>
            </div>
         </section>

         <section
            ref={newsletterRef}
            className="text-center mt-16 border-t border-[#898989] mx-16 py-16 flex flex-col items-center"
         >
            <h2 className="text-[#1F512B] text-6xl font-extrabold">
               Newsletter
            </h2>

            <p className="text-xl text-[#898989] mt-8">
               Sign up and receive exclusive offers.
            </p>

            <form className="mt-16 flex flex-col w-[405px]">
               <TextField label="E-mail" variant="standard" type="email" />

               <button
                  type="submit"
                  className="bg-[#1f512b] mt-8 text-white px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:bg-[#c6a664]"
               >
                  To send
               </button>
            </form>
         </section>

      </main>
   );
}
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Particles from "../components/Particles";
import SplitText from "../components/SplitText";
import { TextField } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
   const heroRef = useRef(null);
   const promoRef = useRef(null);
   const newsletterRef = useRef(null);

   useEffect(() => {
      gsap.from(heroRef.current, {
         opacity: 0,
         y: 80,
         duration: 1.2,
         ease: "power3.out",
      });

      gsap.from(promoRef.current, {
         scrollTrigger: {
            trigger: promoRef.current,
            start: "top 80%",
         },
         scale: 1.2,
         opacity: 0,
         duration: 1.2,
         ease: "power3.out",
      });

      gsap.from(newsletterRef.current, {
         scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 85%",
         },
         y: 100,
         opacity: 0,
         duration: 1,
         ease: "power3.out",
      });

      gsap.utils.toArray(".animate-on-scroll").forEach((el: any) => {
         gsap.from(el, {
            scrollTrigger: {
               trigger: el,
               start: "top 85%",
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
         });
      });

   }, []);

   const handleAnimationComplete = () => {
      console.log('All letters have animated!');
   };

   return (
      <main>
         <section className="h-dvh flex items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
               <Particles
                  particleColors={["#1f512b"]}
                  particleCount={200}
                  particleSpread={10}
                  speed={0.1}
                  particleBaseSize={100}
                  moveParticlesOnHover={false}
                  alphaParticles={false}
                  disableRotation={false}
                  pixelRatio={1}
               />
            </div>

            <div ref={heroRef} className="flex flex-col gap-4">
               <h1 className="text-7xl font-extrabold text-black tracking-[0.01em] leading-[1.3]">
                  <SplitText
                     text="Discover Watches That"
                     className="text-center"
                     delay={50}
                     duration={1.25}
                     ease="power3.out"
                     splitType="chars"
                     from={{ opacity: 0, y: 40 }}
                     to={{ opacity: 1, y: 0 }}
                     threshold={0.1}
                     rootMargin="-100px"
                     textAlign="center"
                     onLetterAnimationComplete={handleAnimationComplete}
                  />

                  <span className="block text-[#1F512B]">Define You</span>
               </h1>
               <p className="text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Where luxury and modern design meet.
               </p>
            </div>
         </section>

         <section className="flex gap-8 justify-center mt-16 animate-on-scroll">
         </section>

         <section className="flex gap-8 justify-center mt-32 animate-on-scroll">
         </section>

         <section className="px-16 mt-16">
            <img
               ref={promoRef}
               src="https://www.marketing91.com/wp-content/uploads/2015/05/Rolex-Marketing-Strategy-1024x655.png"
               alt="Promotion img"
               className="w-dvw h-[600px] object-cover rounded-4xl"
            />
            <div className="mt-8 animate-on-scroll">
               <h3 className="text-[#1F512B] text-xl font-semibold">
                  Exclusive Promotion
               </h3>
               <p className="text-[#898989] text-base w-1/4 mt-4">
                  Special highlight on selected models with promotional values
                  for a limited time.
               </p>
            </div>
         </section>

         <section
            ref={newsletterRef}
            className="text-center mt-16 border-t border-[#898989] mx-16 py-16 flex flex-col items-center"
         >
            <div>
               <h2 className="text-[#1F512B] text-6xl font-extrabold">
                  Newsletter
               </h2>
               <p className="text-xl text-[#898989] mt-8">
                  Sign up and receive exclusive offers.
               </p>
            </div>

            <form className="mt-16 flex flex-col w-[405px]">
               <TextField id="standard-basic" label="E-mail" variant="standard" type="email" />
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
"use client";

import Particles from "@/components/Particles";
import SplitText from "@/components/SplitText";
import CardCategoria from "@/components/CardCategoria";
import CardDestaque from "@/components/CardDestaque";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";


export default function Home() {


   const handleAnimationComplete = () => {
      console.log("SplitText animation done");
   };

   return (
      <main>

         <section className="h-dvh flex items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
               <Particles
                  particleColors={["#4455de"]}
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

            <div className="flex flex-col gap-4 justify-center">
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
                  <span className="block text-[#4455de]">Define You</span>
               </h1>

               <p className="hero-sub text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Where luxury and modern design meet.
               </p>

               <Button type="submit" className="mt-6 w-64 mx-auto bg-[#4455de] transition-all duration-200 rounded-full h-12 font-semibold cursor-pointer hover:bg-[#616ce6]">
                  Explore Collection
               </Button>
            </div>
         </section>

         <section className="grid grid-cols-3 mx-16 gap-8 justify-center mt-12 animate-group">

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
                  img="https://cdn.awsli.com.br/568/568258/produto/212023029/1-uprplc.jpg"
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

            <div className="animate-item">
               <CardDestaque
                  img="https://montecarlo.vtexassets.com/arquivos/ids/729948/NIM030784_1.jpg"
                  name="Seiko Presage"
                  watchId={1}
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

         <section className="px-16 mt-32">
            <img
               src="https://www.marketing91.com/wp-content/uploads/2015/05/Rolex-Marketing-Strategy-1024x655.png"
               className="w-dvw h-[600px] object-cover rounded-4xl"
            />

            <div className="mt-8 animate-group">
               <div className="animate-item">
                  <h3 className="text-[#4455de] text-2xl font-semibold tracking-[0.02em] leading-[1.5]">
                     Exclusive Promotion
                  </h3>
               </div>

               <div className="animate-item">
                  <p className="text-gray-600 text-xl w-1/4 mt-4 tracking-[0.02em] leading-[1.5]">
                     Special highlight on selected models with promotional values
                     for a limited time.
                  </p>
               </div>
            </div>
         </section>

         <section
            className="text-center mt-12 border-t border-gray-300 mx-16 py-16 flex flex-col items-center">
            <h2 className="text-[#4455de] text-3xl font-semibold tracking-[0.01em] leading-[1.3]">
               Newsletter
            </h2>

            <p className="text-xl text-gray-600 mt-4 tracking-[0.02em] leading-[1.5]">
               Sign up and receive exclusive offers.
            </p>

            <form className="mt-8 flex flex-col w-[20dvw]">
               <Input placeholder="E-mail" type="email" />

               <Button type="submit" className="mt-6 bg-[#4455de] transition-all duration-200 rounded-full h-12 font-semibold cursor-pointer hover:bg-[#616ce6]">
                  To send
               </Button>
            </form>
         </section>

      </main>
   );
}
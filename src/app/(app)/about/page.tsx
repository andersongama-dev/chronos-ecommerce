"use client";

import Particles from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { AudioLinesIcon } from "lucide-react";

export default function About() {
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
               <h1 className="text-7xl font-extrabold text-black tracking-[0.01em] leading-[1.3]">
                  Exclusivity in every detail.
               </h1>
               <p className="text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Every watch tells a story. This is ours.
               </p>

               <Button type="submit" className="mt-6 w-64 mx-auto bg-[#4455de] transition-all duration-200 rounded-full h-12 font-semibold cursor-pointer hover:bg-[#616ce6]">
                  Get to know the brand
               </Button>
            </div>
         </section>

         <section className="h-[70dvh] flex items-center justify-between pl-16 mt-12">
            <div className="w-[60%] mr-16 flex flex-col gap-4">
               <h5 className="text-black text-3xl font-bold tracking-[0.01em] leading-[1.3]">
                  Our Story
               </h5>
               <p className="hero-sub text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio illum praesentium laborum, reprehenderit debitis facilis temporibus tempore, animi nisi corporis neque, quia necessitatibus qui officiis eum sequi maiores? Sint!
               </p>
            </div>

            <img src="https://images.pexels.com/photos/28447039/pexels-photo-28447039.jpeg" alt="" className="w-[60dvw] object-cover h-full rounded-l-3xl" />
         </section>

         <section className="h-[70dvh] flex items-center justify-between pr-16 mt-12">
            <img src="https://images.pexels.com/photos/36713528/pexels-photo-36713528.jpeg" alt="" className="w-[60dvw] object-cover h-full rounded-r-3xl" />

            <div className="w-[60%] ml-16 flex flex-col gap-4">
               <h5 className="text-black text-3xl font-bold tracking-[0.01em] leading-[1.3]">
                  Our Story
               </h5>
               <p className="hero-sub text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio illum praesentium laborum, reprehenderit debitis facilis temporibus tempore, animi nisi corporis neque, quia necessitatibus qui officiis eum sequi maiores? Sint!
               </p>
            </div>
         </section>

         <section className="mt-16">

            <h4 className="text-black text-3xl font-bold tracking-[0.01em] leading-[1.3] text-center">Our values</h4>

            <div className="flex justify-between mx-16 gap-8 mt-8">
               <div className="border-gray-300 border flex gap-4 flex-col p-8 rounded-2xl">
                  <AudioLinesIcon className="text-[#4455de]" />
                  <h5 className="text-black text-2xl font-bold tracking-[0.01em] leading-[1.3]">
                     Quality
                  </h5>
                  <p className="hero-sub text-base text-gray-600 tracking-[0.02em] leading-[1.5]">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam consectetur reiciendis alias debitis amet cumque nesciunt harum corrupti assumenda at. Eius quasi magnam dignissimos vel voluptatum aperiam error velit officiis.
                  </p>
               </div>

               <div className="border-gray-300 border flex gap-4 flex-col p-8 rounded-2xl">
                  <AudioLinesIcon className="text-[#4455de]" />
                  <h5 className="text-black text-2xl font-bold tracking-[0.01em] leading-[1.3]">
                     Quality
                  </h5>
                  <p className="hero-sub text-base text-gray-600 tracking-[0.02em] leading-[1.5]">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam consectetur reiciendis alias debitis amet cumque nesciunt harum corrupti assumenda at. Eius quasi magnam dignissimos vel voluptatum aperiam error velit officiis.
                  </p>
               </div>

               <div className="border-gray-300 border flex gap-4 flex-col p-8 rounded-2xl">
                  <AudioLinesIcon className="text-[#4455de]" />
                  <h5 className="text-black text-2xl font-bold tracking-[0.01em] leading-[1.3]">
                     Quality
                  </h5>
                  <p className="hero-sub text-base text-gray-600 tracking-[0.02em] leading-[1.5]">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam consectetur reiciendis alias debitis amet cumque nesciunt harum corrupti assumenda at. Eius quasi magnam dignissimos vel voluptatum aperiam error velit officiis.
                  </p>
               </div>
            </div>
         </section>

         <section className="h-[70dvh] flex items-center justify-between pl-16 mt-16">
            <div className="w-[60%] mr-16 flex flex-col gap-4">
               <h5 className="text-black text-3xl font-bold tracking-[0.01em] leading-[1.3]">
                  Our Story
               </h5>
               <p className="hero-sub text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio illum praesentium laborum, reprehenderit debitis facilis temporibus tempore, animi nisi corporis neque, quia necessitatibus qui officiis eum sequi maiores? Sint!
               </p>
            </div>

            <img src="https://images.pexels.com/photos/28447039/pexels-photo-28447039.jpeg" alt="" className="w-[60dvw] object-cover h-full rounded-l-3xl" />
         </section>

         <section className="h-[70dvh] flex items-center justify-between pr-16 mt-12">
            <img src="https://images.pexels.com/photos/36713528/pexels-photo-36713528.jpeg" alt="" className="w-[60dvw] object-cover h-full rounded-r-3xl" />

            <div className="w-[60%] ml-16 flex flex-col gap-4">
               <h5 className="text-black text-3xl font-bold tracking-[0.01em] leading-[1.3]">
                  Our Story
               </h5>
               <p className="hero-sub text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit odio illum praesentium laborum, reprehenderit debitis facilis temporibus tempore, animi nisi corporis neque, quia necessitatibus qui officiis eum sequi maiores? Sint!
               </p>
            </div>
         </section>

         <section className="mt-16 flex items-center justify-center text-center relative overflow-hidden">

            <div className="flex flex-col gap-4 justify-center">
               <h3 className="text-2xl font-extrabold text-black tracking-[0.01em] leading-[1.3]">
                  Exclusivity in every detail.
               </h3>
               <p className="text-xl text-gray-600 tracking-[0.02em] leading-[1.5]">
                  Every watch tells a story. This is ours.
               </p>

               <Button type="submit" className="mt-6 w-64 mx-auto bg-[#4455de] transition-all duration-200 rounded-full h-12 font-semibold cursor-pointer hover:bg-[#616ce6]">
                  Get to know the brand
               </Button>
            </div>
         </section>

      </main>
   );
}

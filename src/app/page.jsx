"use client";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import CardCategoria from "@/components/cardCategoria";
import CardDestaque from "@/components/cardDestaque";

export default function Home() {
   const [watches, setWatches] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch("http://localhost:5000/watches/list")
         .then((res) => res.json())
         .then((data) => {
            setWatches(data);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Erro ao buscar relógios:", err);
            setLoading(false);
         });
   }, []);

   // Pega apenas os 5 primeiros relógios (ou o número que quiser)
   const featuredWatches = watches.slice(0, 5);

   return (
      <main>
         {/* HERO */}
         <section className="h-dvh flex items-center justify-center text-center">
            <div className="flex flex-col gap-4">
               <h1 className="text-7xl font-extrabold">
                  Discover Watches That{" "}
                  <span className="block text-[#1F512B]">Define You</span>
               </h1>
               <p className="text-xl text-[#898989]">
                  Where luxury and modern design meet.
               </p>
               <Button text={"Shop Now"} url={"/collection"} />
            </div>
         </section>

         {/* CATEGORIAS */}
         <section className="flex gap-8 justify-center mt-16">
            <CardCategoria
               img="https://platinumjewelersms.com/wp-content/uploads/2024/06/mas318-ih9zzjrpjt.jpeg"
               principal="Elite Collection"
               text="Selected models from the most prestigious brands, celebrating design and heritage."
               url="/collection"
            />
            <CardCategoria
               img="https://http2.mlstatic.com/D_NQ_NP_613047-CBT76629791676_062024-O.webp"
               principal="Sophistication"
               text="Noble materials, impeccable finishing and attention to every detail."
               url="/collection"
            />
            <CardCategoria
               img="https://www.montredo.com/wp-content/uploads/2025/01/Linked-In-Post-Multi-Portrait-%E2%80%93-3.jpg"
               principal="Exclusivity"
               text="Limited pieces that elevate the status and style of the wearer."
               url="/collection"
            />
         </section>

         {/* DESTAQUES */}
         <section className="flex gap-8 justify-center mt-32">
            {loading ? (
               <p>Loading featured watches...</p>
            ) : featuredWatches.length > 0 ? (
               featuredWatches.map((watch) => (
                  <CardDestaque
                     key={watch.id}
                     img={watch.image}
                     name={watch.name}
                     watchId={watch.id}
                  />
               ))
            ) : (
               <p>No watches found.</p>
            )}
         </section>

         {/* PROMOÇÃO */}
         <section className="px-16 mt-16">
            <img
               src="https://www.marketing91.com/wp-content/uploads/2015/05/Rolex-Marketing-Strategy-1024x655.png"
               alt="Promotion img"
               className="w-dvw h-[600px] object-cover rounded-4xl"
            />
            <div className="mt-8">
               <h3 className="text-[#1F512B] text-xl font-semibold">
                  Exclusive Promotion
               </h3>
               <p className="text-[#898989] text-base w-1/4 mt-4">
                  Special highlight on selected models with promotional values
                  ​​for a limited time. Take the opportunity to invest in a
                  classic of haute horlogerie, with unmissable discounts and
                  conditions!
               </p>
            </div>
         </section>

         {/* NEWSLETTER */}
         <section className="text-center mt-16 border-y border-[#898989] mx-16 py-16 flex flex-col items-center">
            <div>
               <h2 className="text-[#1F512B] text-6xl font-extrabold">
                  Newsletter
               </h2>
               <p className="text-xl text-[#898989] mt-8">
                  Sign up and receive exclusive offers.
               </p>
            </div>
            <form action="/" className="mt-16 flex flex-col w-[405px]">
               <input
                  type="text"
                  placeholder="nome@chronos.com"
                  className="border-b border-gray-400 p-4 text-gray-400 placeholder-gray-400 focus:border-[#1F512B] focus:text-[#1F512B] focus:placeholder-[#1F512B] outline-none"
               />
               <button
                  type="submit"
                  className="bg-[#1f512b] mt-8 text-white px-8 py-4 font-semibold rounded-full text-center transition-all duration-300 ease-in-out hover:bg-[#c6a664] cursor-pointer"
               >
                  To send
               </button>
            </form>
         </section>
      </main>
   );
}

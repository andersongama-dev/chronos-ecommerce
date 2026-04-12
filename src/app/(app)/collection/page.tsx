"use client";

import CardReloj from "@/components/CardReloj";
import FiltersBar from "@/components/Filters";
import { FC } from "react";

export default function Collection() {
   return (
      <main className="pb-16">

         <FiltersBar />

         <div className="grid grid-cols-3 mt-32 gap-12 ml-[22dvw] mr-16">
            <CardReloj id={1} img={"https://static.zara.net/assets/public/bdfb/1973/376e41dc8759/48ca952cc6da/T9598807308-p/T9598807308-p.jpg?ts=1775426959214&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/5139/a8e8/95a341edb0a2/8f81239debe1/T9533749871-p/T9533749871-p.jpg?ts=1775426891821&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/f1e4/ac11/a7874c5d96a0/c75cdd42ee2e/T9944633222-p/T9944633222-p.jpg?ts=1775426902148&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/54e1/ee20/0b3340e7baae/fd99bc3ab743/08491405802-p/08491405802-p.jpg?ts=1759240364661&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/eb5d/9309/b9754362a114/2eb2a9dbafe5/08491405800-p/08491405800-p.jpg?ts=1759240361441&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/3e49/93ed/18fb4f90ae98/4d28fcdcdc3d/05951551707-p/05951551707-p.jpg?ts=1758115878010&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/ebab/b10b/83c74a7d9ea3/8231f2a9961c/05862304020-p/05862304020-p.jpg?ts=1770914403766&w=418"} nomeProd={"Reloj"} preco={20.00} />
            <CardReloj id={1} img={"https://static.zara.net/assets/public/7f4b/b4ff/052a47f98d06/0588b68660c6/08281760506-p/08281760506-p.jpg?ts=1756202745502&w=418"} nomeProd={"Reloj"} preco={20.00} />
         </div>
      </main>
   );
};


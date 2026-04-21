"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmit: (data: any) => void;
};

export default function WatchModal({
  open,
  onClose,
  initialData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    gender: "",
    style: "",
    caseMaterial: "",
    strapMaterial: "",
    strapColor: "",
    imageUrl: "",
    slug: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        name: "",
        brand: "",
        price: "",
        gender: "",
        style: "",
        caseMaterial: "",
        strapMaterial: "",
        strapColor: "",
        imageUrl: "",
        slug: "",
      });
    }
  }, [initialData]);

  function handleSubmit() {
    onSubmit({
      
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[60dvw] p-12 rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit watch" : "New watch"}
          </h2>

          <Button className="w-11 h-11 cursor-pointer" variant="outline" onClick={onClose}><X></X></Button>
        </div>

        <div className="h-[2px] bg-gray-100 mt-6 mb-12" ></div>

        <div className="flex flex-col gap-4">
          <Input placeholder="Name" />
          <div className="flex justify-between gap-4">
            <Input placeholder="Brand" />
            <Input placeholder="Price" />
          </div>
          <div className="flex justify-between gap-4">
            <Input placeholder="Gender" />
            <Input placeholder="Style" />
          </div>
          <div className="flex justify-between gap-4">
            <Input placeholder="Case material" />
            <Input placeholder="Strap material" />
          </div>
          <div className="flex justify-between gap-4">
            <Input placeholder="Strap color" />
            <Input placeholder="Image (URL)" />
          </div>
          <Input placeholder="Slug" />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" onClick={onClose} className="px-6 py-4 font-medium h-11 rounded-full cursor-pointer">
            Cancel
          </Button>

          <Button className="bg-[#4455de] text-white px-6 py-4 font-medium hover:bg-[#616ce6] transition-all duration-200 rounded-full h-11 cursor-pointer" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Input } from "./ui/input";

const BRAND_OPTIONS = ["ROLEX", "CASIO", "SEIKO", "OMEGA", "TAG_HEUER", "TISSOT"];

const GENDER_OPTIONS = ["MEN", "WOMEN", "UNISEX"];

const STYLE_OPTIONS = ["CASUAL", "SPORT", "LUXURY", "CLASSIC", "DIVER"];

const MATERIAL_OPTIONS = [
  "STAINLESS_STEEL",
  "GOLD",
  "TITANIUM",
  "CERAMIC",
  "LEATHER",
  "RUBBER",
  "METAL",
  "NYLON",
];

const COLOR_OPTIONS = ["BLACK", "BROWN", "SILVER", "GOLD", "BLUE"];

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
      setForm({
        ...initialData,
        price: String(initialData.price ?? ""),
      });
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

  function handleChange(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function cleanPayload(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== "" && v !== null)
    );
  }

  function handleSubmit() {
    const payload = cleanPayload({
      ...form,
      price: form.price ? Number(form.price) : undefined,
    });

    onSubmit(payload);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[60dvw] p-12 rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit watch" : "New watch"}
          </h2>

          <Button className="w-11 h-11 cursor-pointer" variant="outline" onClick={onClose}>
            <X />
          </Button>
        </div>

        <div className="h-[2px] bg-gray-100 mt-6 mb-12"></div>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <div className="flex justify-between gap-4">
            <select
              className="w-full border rounded-md px-3 py-2"
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
            >
              <option value="">Brand</option>
              {BRAND_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <Input
              placeholder="Price"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-4">
            <select
              className="w-full border rounded-md px-3 py-2"
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Gender</option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <select
              className="w-full border rounded-md px-3 py-2"
              value={form.style}
              onChange={(e) => handleChange("style", e.target.value)}
            >
              <option value="">Style</option>
              {STYLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between gap-4">
            <select
              className="w-full border rounded-md px-3 py-2"
              value={form.caseMaterial}
              onChange={(e) => handleChange("caseMaterial", e.target.value)}
            >
              <option value="">Case material</option>
              {MATERIAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <select
              className="w-full border rounded-md px-3 py-2"
              value={form.strapMaterial}
              onChange={(e) => handleChange("strapMaterial", e.target.value)}
            >
              <option value="">Strap material</option>
              {MATERIAL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between gap-4">
            <select
              className="w-full border rounded-md px-3 py-2"
              value={form.strapColor}
              onChange={(e) => handleChange("strapColor", e.target.value)}
            >
              <option value="">Strap color</option>
              {COLOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <Input
              placeholder="Image (URL)"
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
            />
          </div>

          <Input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-4 font-medium h-11 rounded-full cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            className="bg-[#4455de] text-white px-6 py-4 font-medium hover:bg-[#616ce6] transition-all duration-200 rounded-full h-11 cursor-pointer"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      ...form,
      price: Number(form.price),
    });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4">
        <h2 className="text-lg font-semibold">
          {initialData ? "Edit watch" : "New watch"}
        </h2>

        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key] || ""}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        ))}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button className="bg-[#4455de]" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
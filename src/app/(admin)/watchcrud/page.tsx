"use client";

import { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import WatchModal from "@/components/WatchModal";

type Watch = {
    id: number;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    gender: string;
    style: string;
};

const mockWatches: Watch[] = [
    {
        id: 1,
        name: "Classic Silver",
        brand: "Rolex",
        price: 1200,
        imageUrl: "https://via.placeholder.com/300x200",
        gender: "Male",
        style: "Classic",
    },
    {
        id: 2,
        name: "Modern Gold",
        brand: "Omega",
        price: 980,
        imageUrl: "https://via.placeholder.com/300x200",
        gender: "Female",
        style: "Modern",
    },
    {
        id: 3,
        name: "Sport Black",
        brand: "Casio",
        price: 250,
        imageUrl: "https://via.placeholder.com/300x200",
        gender: "Unisex",
        style: "Sport",
    },
];

export default function WatchCrud() {
    const [watches, setWatches] = useState<Watch[]>(mockWatches);

    const [openModal, setOpenModal] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

    function handleDelete(id: number) {
        if (!confirm("Delete this watch?")) return;
        setWatches((prev) => prev.filter((w) => w.id !== id));
    }

    return (
        <main className="flex-1 p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                    Watches
                </h1>

                <Button
                    onClick={() => {
                        setSelectedWatch(null);
                        setOpenModal(true);
                    }}
                    className="bg-[#4455de] hover:opacity-90"
                >
                    <Plus size={16} />
                    Add watch
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {watches.map((watch) => (
                    <Card
                        key={watch.id}
                        className="border-gray-100 hover:shadow-md transition"
                    >
                        <CardContent className="p-4 space-y-4">
                            <img
                                src={watch.imageUrl}
                                className="w-full h-40 object-cover rounded-lg"
                            />

                            <div>
                                <p className="font-medium text-gray-900">
                                    {watch.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {watch.brand}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">
                                    ${watch.price}
                                </span>

                                <Badge className="bg-[#eef0ff] text-[#4455de]">
                                    {watch.gender}
                                </Badge>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => {
                                        setSelectedWatch(watch);
                                        setOpenModal(true);
                                    }}
                                >
                                    <Pencil size={14} />
                                </Button>

                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    onClick={() => handleDelete(watch.id)}
                                >
                                    <Trash size={14} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <WatchModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                initialData={selectedWatch}
                onSubmit={(data) => {
                }}
            />
        </main>
    );
}
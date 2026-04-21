"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import WatchModal from "@/components/WatchModal";

import { Watch } from "@/types/watch-types";
import { mockWatches } from "@/mock/watch-data";
import WatchTableContent from "@/components/WatchTableContent";

export default function WatchTable() {
    const [watches, setWatches] = useState<Watch[]>(mockWatches);
    const [openModal, setOpenModal] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

    function handleDelete(id: number) {
        if (!confirm("Delete this watch?")) return;
        setWatches((prev) => prev.filter((w) => w.id !== id));
    }

    return (
        <div className="w-full h-full p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Watches</h1>

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

            <WatchTableContent
                watches={watches}
                onEdit={(watch) => {
                    setSelectedWatch(watch);
                    setOpenModal(true);
                }}
                onDelete={handleDelete}
            />

            <WatchModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                initialData={selectedWatch}
                onSubmit={(data) => {
                    if (selectedWatch) {
                        setWatches((prev) =>
                            prev.map((w) =>
                                w.id === selectedWatch.id
                                    ? { ...w, ...data }
                                    : w
                            )
                        );
                    } else {
                        setWatches((prev) => [
                            ...prev,
                            { id: Date.now(), ...data },
                        ]);
                    }

                    setOpenModal(false);
                }}
            />
        </div>
    );
}
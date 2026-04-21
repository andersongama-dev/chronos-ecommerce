"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import WatchModal from "@/components/WatchModal";
import WatchTableContent from "@/components/WatchTableContent";

import { Watch } from "@/types/watch-types";
import { useWatches } from "@/hooks/useWatches";

export default function WatchTable() {
  const {
    data: watches,
    loading,
    addWatch,
    editWatch,
    removeWatch,
  } = useWatches();

  const [openModal, setOpenModal] = useState(false);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Delete this watch?")) return;
    await removeWatch(id);
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
          className="bg-[#4455de] hover:opacity-90 h-11 w-11 rounded-full"
        >
          <Plus size={24} />
        </Button>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <WatchTableContent
          watches={watches}
          onEdit={(watch) => {
            setSelectedWatch(watch);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <WatchModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={selectedWatch}
        onSubmit={async (data) => {
          if (selectedWatch) {
            await editWatch(selectedWatch.id, data);
          } else {
            await addWatch(data);
          }

          setOpenModal(false);
        }}
      />
    </div>
  );
}
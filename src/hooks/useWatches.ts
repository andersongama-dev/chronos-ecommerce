import { useEffect, useState } from "react";
import {
  getWatches,
  createWatch,
  updateWatch,
  deleteWatch,
} from "@/services/watch";

export function useWatches() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchWatches() {
    try {
      setLoading(true);
      const res = await getWatches();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addWatch(watch: any) {
    const created = await createWatch(watch);
    setData((prev) => [...prev, created]);
  }

  async function editWatch(id: number, watch: any) {
    const updated = await updateWatch(id, watch);

    setData((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, ...watch }
          : w
      )
    );

    return updated;
  }

  async function removeWatch(id: number) {
    await deleteWatch(id);
    setData((prev) => prev.filter((w) => w.id !== id));
  }

  useEffect(() => {
    fetchWatches();
  }, []);

  return {
    data,
    loading,
    addWatch,
    editWatch,
    removeWatch,
    refetch: fetchWatches,
  };
}
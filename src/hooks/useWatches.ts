import { useEffect, useState } from "react";
import { getWatches } from "../services/watch";

export function useWatches() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const watches = await getWatches();
        setData(watches);
      } catch (err) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { data, loading };
}
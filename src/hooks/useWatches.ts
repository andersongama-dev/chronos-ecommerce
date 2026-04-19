import { useEffect, useState } from "react";
import { getWatches } from "../services/watch";

type Filters = Record<string, string[]>;

export function useWatches(filters: Filters) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const watches = await getWatches(filters);
        setData(watches);
      } catch (err) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters]);

  return { data, loading };
}
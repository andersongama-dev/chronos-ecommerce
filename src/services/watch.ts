const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Filters = Record<string, string[]>;

export async function getWatches(filters?: Filters) {
  const query = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, values]) => {
      values.forEach((value) => {
        query.append(key, value);
      });
    });
  }

  const res = await fetch(`${API_URL}/watches`);

  if (!res.ok) {
    throw new Error("Failed to fetch watches");
  }

  return res.json();
}
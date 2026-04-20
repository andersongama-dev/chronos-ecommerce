const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWatches() {
  const res = await fetch(`${API_URL}/watches`);

  if (!res.ok) {
    throw new Error("Failed to fetch watches");
  }

  return res.json();
}
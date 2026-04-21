const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getWatches() {
  const res = await fetch(`${API_URL}/watches`);

  if (!res.ok) throw new Error("Failed to fetch watches");

  return res.json();
}

export async function getWatchById(id: string) {
  const res = await fetch(`${API_URL}/watches/${id}`);

  if (!res.ok) throw new Error("Failed to fetch watch");

  return res.json();
}

export async function createWatch(data: any) {
  const res = await fetch(`${API_URL}/watches`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create watch");

  return res.json();
}

export async function updateWatch(id: number, data: any) {
  const res = await fetch(`${API_URL}/watches/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update watch");

  return res.json();
}

export async function deleteWatch(id: number) {
  const res = await fetch(`${API_URL}/watches/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete watch");

  return true;
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}
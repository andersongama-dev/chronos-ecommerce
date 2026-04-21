const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCart(token: string) {
  const response = await fetch(`${API_URL}/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to fetch cart");
  }

  return response.json();
}

export async function addItemToCart(
  token: string,
  watchId: number,
  quantity = 1
) {
  const response = await fetch(`${API_URL}/carts/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ watchId, quantity }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to add item");
  }

  return response.json();
}

export async function updateCartItem(
  token: string,
  itemId: number,
  quantity: number
) {
  const response = await fetch(`${API_URL}/carts/items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to update item");
  }

  return response.json();
}

export async function removeCartItem(token: string, itemId: number) {
  const response = await fetch(`${API_URL}/carts/items/${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to remove item");
  }

  return response.json();
}

export async function clearCart(token: string) {
  const response = await fetch(`${API_URL}/carts`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to clear cart");
  }

  return response.json();
}
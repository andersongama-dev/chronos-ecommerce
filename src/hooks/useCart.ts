import { useEffect, useState } from "react";
import {
    getCart,
    addItemToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "@/services/cart";

export function useCart() {
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    function getToken() {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("token");
    }

    async function fetchCart() {
        const token = getToken();

        if (!token) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await getCart(token);
            setCart(res);
        } catch (err) {
            setError("Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    }

    async function addItem(watchId: number, quantity = 1) {
        const token = getToken();
        if (!token || !cart) return;

        const previousCart = cart;

        setCart((prev: any) => {
            const existing = prev.items.find((i: any) => i.watchId === watchId);

            if (existing) {
                return {
                    ...prev,
                    items: prev.items.map((i: any) =>
                        i.watchId === watchId
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    ),
                };
            }

            return prev;
        });

        try {
            const updated = await addItemToCart(token, watchId, quantity);
            setCart(updated);
        } catch (err) {
            setCart(previousCart);
        }
    }

    async function updateItem(itemId: number, quantity: number) {
        const token = getToken();
        if (!token || !cart) return;

        const previousCart = cart;

        setCart((prev: any) => ({
            ...prev,
            items: prev.items.map((item: any) =>
                item.id === itemId
                    ? { ...item, quantity }
                    : item
            ),
        }));

        try {
            await updateCartItem(token, itemId, quantity);
        } catch (err) {
            setCart(previousCart);
        }
    }

    async function removeItem(itemId: number) {
        const token = getToken();
        if (!token || !cart) return;

        const previousCart = cart;

        setCart((prev: any) => ({
            ...prev,
            items: prev.items.filter((item: any) => item.id !== itemId),
        }));

        try {
            await removeCartItem(token, itemId);
        } catch (err) {
            setCart(previousCart);
        }
    }

    async function clear() {
        const token = getToken();
        if (!token) return;

        const updatedCart = await clearCart(token);
        setCart(updatedCart);
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const total =
        cart?.items?.reduce((acc: number, item: any) => {
            return acc + Number(item.priceAtAddition) * item.quantity;
        }, 0) || 0;

    return {
        cart,
        loading,
        error,
        total,
        addItem,
        updateItem,
        removeItem,
        clear,
        refetch: fetchCart,
    };
}
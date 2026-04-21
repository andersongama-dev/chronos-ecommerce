"use client";

import { useCart } from "@/hooks/useCart";

export default function Bag() {
  const { cart, loading, error, total, updateItem, removeItem, clear } = useCart();

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p className="p-6">Your cart is empty</p>;
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">Your Bag</h1>

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.watch.imageUrl}
                alt={item.watch.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div>
                <p className="font-medium">{item.watch.name}</p>
                <p className="text-sm text-gray-500">
                  R$ {Number(item.priceAtAddition).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (item.quantity === 1) {
                    removeItem(item.id);
                  } else {
                    updateItem(item.id, item.quantity - 1);
                  }
                }}
                className="px-3 py-1 border rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() =>
                  updateItem(item.id, item.quantity + 1)
                }
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-medium">
                R${" "}
                {(Number(item.priceAtAddition) * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: R$ {total.toFixed(2)}
        </p>

        <div className="flex gap-3">
          <button
            onClick={clear}
            className="px-4 py-2 border rounded"
          >
            Clear
          </button>

          <button className="px-4 py-2 bg-black text-white rounded">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
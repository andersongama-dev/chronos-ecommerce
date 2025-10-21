"use client";

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Bag() {
   const {
      items: cartItems,
      removeFromCart,
      updateQuantity,
      clearCart,
   } = useCart();

   const router = useRouter();
   const [isCheckingOut, setIsCheckingOut] = useState(false);

   const [items, setItems] = useState(cartItems);
   const [totalItemsState, setTotalItemsState] = useState(0);
   const [totalPriceState, setTotalPriceState] = useState(0);

   useEffect(() => {
      setItems(cartItems);
      const newTotalItems = cartItems.reduce(
         (total, item) => total + item.quantity,
         0
      );
      const newTotalPrice = cartItems.reduce(
         (total, item) => total + Number(item.price) * item.quantity,
         0
      );
      setTotalItemsState(newTotalItems);
      setTotalPriceState(newTotalPrice);
   }, [cartItems]);

   const handleQuantityChange = (cartItemId, newQuantity) => {
      if (newQuantity < 1) return;

      const updatedItems = items.map((item) =>
         item.cart_item_id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
      );
      setItems(updatedItems);

      const newTotalItems = updatedItems.reduce(
         (total, item) => total + item.quantity,
         0
      );
      const newTotalPrice = updatedItems.reduce(
         (total, item) => total + Number(item.price) * item.quantity,
         0
      );
      setTotalItemsState(newTotalItems);
      setTotalPriceState(newTotalPrice);

      updateQuantity(cartItemId, newQuantity);
   };

   const handleRemoveItem = (cartItemId) => {
      const updatedItems = items.filter(
         (item) => item.cart_item_id !== cartItemId
      );
      setItems(updatedItems);

      const newTotalItems = updatedItems.reduce(
         (total, item) => total + item.quantity,
         0
      );
      const newTotalPrice = updatedItems.reduce(
         (total, item) => total + Number(item.price) * item.quantity,
         0
      );
      setTotalItemsState(newTotalItems);
      setTotalPriceState(newTotalPrice);

      removeFromCart(cartItemId);
   };

   // 🔹 Checkout
   const handleCheckout = () => {
      if (items.length === 0) return alert("Seu carrinho está vazio!");
      setIsCheckingOut(true);

      setTimeout(() => {
         alert("Compra realizada com sucesso!");
         setItems([]);
         setTotalItemsState(0);
         setTotalPriceState(0);
         clearCart();
         setIsCheckingOut(false);
         router.push("/");
      }, 2000);
   };

   // 🔹 Continuar comprando
   const handleContinueShopping = () => {
      router.push("/collection");
   };

   // 🔹 Carrinho vazio
   if (items.length === 0) {
      return (
         <div className="pt-[124px] min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
               <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Your cart is empty
               </h1>
               <button
                  onClick={handleContinueShopping}
                  className="bg-[#1f512b] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#c6a664] transition-colors"
               >
                  Continue Shopping
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="pt-[124px] min-h-screen bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
               Shopping Cart
            </h1>
            <p className="text-gray-600 mb-8">
               {totalItemsState} {totalItemsState === 1 ? "item" : "items"} in
               your cart
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Lista de itens */}
               <div className="lg:col-span-2 space-y-6">
                  {items.map((item) => (
                     <div
                        key={item.cart_item_id}
                        className="bg-white rounded-lg shadow-sm p-6"
                     >
                        <div className="flex items-start gap-6">
                           <img
                              src={item.image_url || "/images/placeholder.jpg"}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg"
                           />
                           <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                 {item.name}
                              </h3>
                              <p className="text-gray-600 mb-2">
                                 {item.brand_name}
                              </p>
                              <div className="text-xl font-bold text-[#1F512B]">
                                 U$ {Number(item.price).toFixed(2)}
                              </div>
                           </div>

                           <div className="flex flex-col items-end gap-4">
                              <div className="flex items-center gap-3">
                                 <button
                                    onClick={() =>
                                       handleQuantityChange(
                                          item.cart_item_id,
                                          item.quantity - 1
                                       )
                                    }
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                    disabled={item.quantity <= 1}
                                 >
                                    -
                                 </button>
                                 <span className="text-lg font-medium w-8 text-center">
                                    {item.quantity}
                                 </span>
                                 <button
                                    onClick={() =>
                                       handleQuantityChange(
                                          item.cart_item_id,
                                          item.quantity + 1
                                       )
                                    }
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                                 >
                                    +
                                 </button>
                              </div>

                              <div className="text-right">
                                 <div className="text-lg font-bold text-gray-900">
                                    U${" "}
                                    {(
                                       Number(item.price) * item.quantity
                                    ).toFixed(2)}
                                 </div>
                                 <div className="text-sm text-gray-500">
                                    U$ {Number(item.price).toFixed(2)} each
                                 </div>
                              </div>

                              <button
                                 onClick={() =>
                                    handleRemoveItem(item.cart_item_id)
                                 }
                                 className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                 Remove
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Resumo do pedido */}
               <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                     <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Order Summary
                     </h2>
                     <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600">
                           <span>Subtotal ({totalItemsState} items)</span>
                           <span>U$ {totalPriceState.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                           <span>Shipping</span>
                           <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-4">
                           <div className="flex justify-between text-lg font-bold text-gray-900">
                              <span>Total</span>
                              <span>U$ {totalPriceState.toFixed(2)}</span>
                           </div>
                        </div>
                     </div>

                     <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full bg-[#1f512b] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#c6a664] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                     >
                        {isCheckingOut ? "Processing..." : "Checkout"}
                     </button>

                     <button
                        onClick={handleContinueShopping}
                        className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-4"
                     >
                        Continue Shopping
                     </button>

                     <button
                        onClick={() => {
                           setItems([]);
                           setTotalItemsState(0);
                           setTotalPriceState(0);
                           clearCart();
                        }}
                        className="w-full text-red-600 hover:text-red-800 text-sm font-medium"
                     >
                        Clear Cart
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

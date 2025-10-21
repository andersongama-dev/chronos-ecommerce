"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const CartContext = createContext();

const cartReducer = (state, action) => {
   switch (action.type) {
      case "SET_CART":
         return { ...state, items: action.payload };

      case "ADD_TO_CART":
         const existing = state.items.find(
            (item) => item.cart_item_id === action.payload.cart_item_id
         );
         if (existing) {
            return {
               ...state,
               items: state.items.map((item) =>
                  item.cart_item_id === action.payload.cart_item_id
                     ? { ...item, quantity: action.payload.quantity }
                     : item
               ),
            };
         } else {
            return { ...state, items: [...state.items, action.payload] };
         }

      case "REMOVE_FROM_CART":
         return {
            ...state,
            items: state.items.filter(
               (item) => item.cart_item_id !== action.payload
            ),
         };

      case "UPDATE_QUANTITY":
         return {
            ...state,
            items: state.items.map((item) =>
               item.cart_item_id === action.payload.cart_item_id
                  ? { ...item, quantity: action.payload.quantity }
                  : item
            ),
         };

      case "CLEAR_CART":
         return { ...state, items: [] };

      default:
         return state;
   }
};

export function CartProvider({ children }) {
   const { user } = useAuth();
   const [state, dispatch] = useReducer(cartReducer, { items: [] });

   useEffect(() => {
      if (!user) return;

      fetch(`http://localhost:5000/cart/${user.id}`)
         .then((res) => res.json())
         .then((data) => dispatch({ type: "SET_CART", payload: data }))
         .catch((err) => console.error(err));
   }, [user]);

   const addToCart = async (watch) => {
      if (!user) return alert("Você precisa estar logado!");

      const res = await fetch("http://localhost:5000/cart", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            user_id: user.id,
            watch_id: watch.id,
            quantity: watch.quantity || 1,
         }),
      });

      const newItem = await res.json();
      dispatch({ type: "ADD_TO_CART", payload: newItem });
   };

   const removeFromCart = async (cartItemId) => {
      await fetch(`http://localhost:5000/cart/${cartItemId}`, {
         method: "DELETE",
      });
      dispatch({ type: "REMOVE_FROM_CART", payload: cartItemId });
   };

   const updateQuantity = async (cartItemId, quantity) => {
      dispatch({
         type: "UPDATE_QUANTITY",
         payload: { cart_item_id: cartItemId, quantity },
      });

      try {
         // Atualiza no backend
         await fetch(`http://localhost:5000/cart/${cartItemId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity }),
         });
      } catch (err) {
         console.error("Erro ao atualizar no backend:", err);
      }
   };

   const clearCart = async () => {
      for (const item of state.items) {
         await fetch(`http://localhost:5000/cart/${item.cart_item_id}`, {
            method: "DELETE",
         });
      }
      dispatch({ type: "CLEAR_CART" });
   };

   const totalItems = state.items.reduce(
      (total, item) => total + item.quantity,
      0
   );
   const totalPrice = state.items.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
   );

   return (
      <CartContext.Provider
         value={{
            items: state.items,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
         }}
      >
         {children}
      </CartContext.Provider>
   );
}

export function useCart() {
   const context = useContext(CartContext);
   if (!context)
      throw new Error("useCart deve ser usado dentro de CartProvider");
   return context;
}

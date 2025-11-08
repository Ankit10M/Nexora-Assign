import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getCart,
  addToCart as addAPI,
  removeFromCart as removeAPI,
  updateQtyAPI,
} from "../api/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const { data } = await getCart();
        if (data?.cart && data.cart.length > 0) {
          setCart(data.cart);
          localStorage.setItem("cart", JSON.stringify(data.cart)); // ✅ Save to localStorage
        } else {
          // fallback to localStorage if backend empty
          const local = localStorage.getItem("cart");
          if (local) setCart(JSON.parse(local));
        }
      } catch (error) {
        console.error("error fetching cart", error);
        const local = localStorage.getItem("cart");
        if (local) setCart(JSON.parse(local));
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);
  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = async (product) => {
    try {
      const { data } = await addAPI({
        productId: product._id || product.id,
        qty: 1,
      });
      setCart(data.items || []);
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Error adding to cart");
      console.error(error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await removeAPI(id);
      setCart((prev) => prev.filter((i) => i.product?._id !== id));
      toast.error("Removed from cart");
    } catch (error) {
      toast.error("Error removing item");
      console.error(error);
    }
  };

  const updateQty = async (id, qty) => {
    try {
      // ✅ Update immediately in UI
      setCart((prev) =>
        prev.map((i) => (i.product?._id === id ? { ...i, qty } : i))
      );

      // ✅ Then persist to backend
      const { data } = await updateQtyAPI({ productId: id, qty });
      if (data?.items) {
        setCart(data.items);
        localStorage.setItem("cart", JSON.stringify(data.items));
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Could not update quantity");
    }
  };

  const clearCart = () => setCart([]);

  const total = (cart || []).reduce(
    (sum, i) => sum + (i.product?.price || 0) * (i.qty || 0),
    0
  );
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

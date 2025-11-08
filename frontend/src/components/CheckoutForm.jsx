import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function CheckoutForm({ onSuccess }) {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Please fill in all fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Mock checkout
    const receipt = {
      id: Math.floor(Math.random() * 1000000),
      name: form.name,
      email: form.email,
      total: total.toFixed(2),
      date: new Date().toLocaleString(),
      items: cart,
    };

    clearCart();
    toast.success("Order placed successfully!");
    onSuccess(receipt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">Checkout</h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <p className="font-medium text-gray-800">
          Total: <span className="text-indigo-600">${total.toFixed(2)}</span>
        </p>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Confirm Order
        </button>
      </div>
    </form>
  );
}

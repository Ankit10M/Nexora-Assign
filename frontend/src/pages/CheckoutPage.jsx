import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkoutCart } from "../api/api";

const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("All fields required");
    if (!cart.length) return toast.error("your cart is empty Add Items First");
    try {
      setLoading(true);
      const { data } = await checkoutCart();
      toast.success("Order placed successfully!");
      // console.log('checkout response',data);

      clearCart();
      navigate("/receipt", { state: { receipt: data.receipt } });
    } catch (error) {
      console.error("checkout failed", error);
      toast.error("Something Went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div className=" bg-green-200 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-gray-300 p-6 rounded-lg shadow-xl ">
        <h2 className="text-xl font-semibold mb-4 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className=" font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mt-1 border rounded-full px-3 py-2 hover:border-2 hover:border-blue-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <label className=" font-semibold">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mt-1 border rounded-full px-3 py-2 hover:border-2 hover:border-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <label className="font-semibold">Shipping Address</label>
          <textarea
            placeholder="Enter your complete address"
            className="w-full mt-1 border rounded-2xl px-3 py-2 hover:border-2 hover:border-blue-500 resize-none"
            rows="2"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          ></textarea>
          <p className="font-medium mt-2">Total: ₹ {total.toFixed(2)}</p>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer hover:scale-[1.05] transition-transform duration-300 bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CheckoutPage;

import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, total, loading } = useCart();

  if (loading)
    return <p className=" text-center mt-10">loading your cart...</p>;

  if (!cart?.length)
    return (
      <div className=" bg-green-200 min-h-screen w-full flex justify-center items-center">
        <div className="text-center ">
          <p>Your cart is empty </p>
          <Link to="/" className="text-indigo-600 hover:font-bold">
            Go shopping
          </Link>
        </div>
      </div>
    );

  return (
    <div className=" bg-green-200 min-h-screen">
      <section>
        <h1 className="text-2xl font-semibold mb-4 ">Your Cart</h1>
        <div className="space-y-4">
          {cart.map((item) => {
            if (!item || !item.product) return null;
            return (
              <CartItem
                key={item?.product?._id || item?._id || index}
                item={item}
              />
            );
          })}
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-lg font-medium">Total: ₹ {total.toFixed(2)}</p>
          <Link
            to="/"
            className="bg-indigo-600 text-white py-2 px-4 rounded-xl hover:scale-[1.05] transition-transform duration-300 hover:bg-indigo-700 mr-10"
          >
            Shop More
          </Link>
          <Link
            to="/checkout"
            className="bg-indigo-600 text-white rounded-r-xl hover:scale-[1.05] transition-transform duration-300 py-2 px-4  hover:bg-indigo-700 mr-10"
          >
            Checkout
          </Link>
        </div>
      </section>
    </div>
  );
};
export default CartPage;

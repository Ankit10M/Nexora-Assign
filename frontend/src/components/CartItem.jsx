import React from "react";
import { useCart } from "../context/CartContext";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();
  if (!item?.product) return null;

  const handleIncrease = () => {
    updateQty(item.product._id, item.qty + 1);
  };

  const handleDecrease = () => {
    if (item.qty > 1) {
      updateQty(item.product._id, item.qty - 1);
    } 
  };

  return (
    <div className="flex justify-between items-center bg-indigo-300 p-4 rounded shadow-xl">
      <div>
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-gray-900">
          ₹{Number(item.product.price || 0).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrease}
          className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        >
          <FaMinus />
        </button>

        {/* Current quantity */}
        <span className="font-semibold">{item.qty}</span>

        {/* Increase quantity */}
        <button
          onClick={handleIncrease}
          className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        >
          <FaPlus />
        </button>
        <button
          onClick={() => removeFromCart(item.product._id)}
          className="text-red-500 hover:text-red-700 cursor-pointer hover:scale-[1.05] transition-transform duration-300"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
export default CartItem;

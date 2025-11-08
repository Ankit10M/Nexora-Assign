import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../context/CartContext";

 const ProductCard=({ product })=> {
  const { addToCart } = useCart();
  const handleAdd =()=>{
    if(!product || !product._id) return;
    addToCart(product)
  }

  return (
     <div className="bg-gray-300 rounded-xl shadow-lg mr-1 hover:scale-[1.01] transition-transform duration-300 p-4 flex flex-col justify-between hover:shadow-md ">
      <div>
        <div className="h-35 bg-gray-100 rounded  flex items-center justify-center text-gray-400">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full object-cover rounded"
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-3 truncate">{product.name}</h3>
        <p className="text-indigo-600 font-medium">
          ₹{Number(product.price || 0).toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleAdd}
        className="mt-4 bg-indigo-600 text-white hover:scale-[1.05] transition-transform duration-300 rounded-xl cursor-pointer py-2 flex items-center justify-center gap-2 hover:bg-indigo-700 ease-in-out"
      >
        <FaCartPlus /> Add to Cart
      </button>
    </div>
  );
}
export default ProductCard;
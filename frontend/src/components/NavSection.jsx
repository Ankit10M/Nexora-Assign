import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

 function NavSection() {
  const { cart } = useCart();
  const location = useLocation();

  return (
    <nav className="bg-indigo-500 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link to="/" className="text-xl font-bold text-white">
          MOCCOM
        </Link>
        <div className="flex items-center gap-6">
          {/* <Link
            to="/"
            className={`hover:text-indigo-600 ${
              location.pathname === "/" ? "text-indigo-600" : ""
            }`}
          >
            Products */}
          {/* </Link> */}
          <Link to="/cart" className="relative  text-white">
            <FaShoppingCart size={22} />
            {cart?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-black text-xs rounded-full px-1.5">
                {cart?.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavSection;

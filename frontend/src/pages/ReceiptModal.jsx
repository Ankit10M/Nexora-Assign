import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaRegCircleCheck } from "react-icons/fa6";

const ReceiptModal = () => {
  const location = useLocation();
  const receipt = location.state?.receipt;

  if (!receipt) {
    return (
      <div className="text-center mt-10">
        <p>No receipt found. Please complete checkout again.</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          Go Home
        </Link>
      </div>
    );
  }
  const calculatedTotal = receipt.items?.reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 1),
    0
  );

  return (
    <div className=" bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="max-w-lg mx-auto bg-green-300 p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-semibold mb-5 text-center">
          <FaRegCircleCheck size={30} />
          Order Receipt
        </h1>

        {/*  Order details */}
        <div className="space-y-2 mb-6">
          <p>
            <strong>Order ID:</strong> {receipt.orderId}
          </p>
          <p>
            <strong>Total Items:</strong> {receipt.items?.length || 0}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹
            {Number(calculatedTotal || receipt.total).toFixed(2)}
          </p>
          <p>
            <strong>Date & Time:</strong>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
        </div>

        {/*  Item list */}
        <div>
          <h2 className="font-semibold mb-2">Items Purchased:</h2>
          <ul className="divide-y">
            {receipt.items?.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>
                  ₹{Number(item.price || 0).toFixed(2)} × {item.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/*  Total */}
        <div className="mt-6 border-t pt-4 flex justify-between text-lg font-medium">
          <span>Total Paid:</span>
          <span>₹{Number(calculatedTotal || receipt.total).toFixed(2)}</span>
        </div>

        {/* 🔁 Continue shopping */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;

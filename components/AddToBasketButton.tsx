"use client";
import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}
function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-1.5">
      {/* Remove Item Button */}
      <button
        onClick={() => removeItem(product._id)}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 
          ${
            itemCount === 0
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 active:scale-95"
          }`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-sm font-bold ${
            itemCount === 0 ? "text-gray-400" : "text-gray-700"
          }`}
        >
          −
        </span>
      </button>

      {/* Item Count */}
      <span className="w-5 text-center text-sm font-medium text-gray-700">
        {itemCount}
      </span>

      {/* Add Item Button */}
      <button
        onClick={() => addItem(product)}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 
          ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-[#008080] hover:bg-[#006666] text-white  hover:scale-105 active:scale-95"
          }`}
        disabled={disabled}
      >
        <span className="text-sm font-bold">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;

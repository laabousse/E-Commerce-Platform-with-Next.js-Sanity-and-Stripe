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

  {
    /* Use useEffect to set isClient to true after component mounts
    this ensures that the component only renders on the client-side,
    preventing hydration errors due to server/client mismatch */
  }
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-3">
      {/* Remove Item Button */}
      <button
        onClick={() => removeItem(product._id)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
      ${itemCount === 0 ? "bg-gray-200 cursor-not-allowed shadow-none" : "bg-gray-200 text-gray-600 hover:bg-gray-300 shadow-lg"}`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-semibold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}
        >
          -
        </span>
      </button>

      {/* Item Count */}
      <span className="w-10 text-center font-semibold text-[#333333]">
        {itemCount}
      </span>

      {/* Add Item Button */}
      <button
        onClick={() => addItem(product)}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 
      ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-[#008080] text-white hover:bg-[#006666] shadow-lg"}`}
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;

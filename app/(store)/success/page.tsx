"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/store/store";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  // const sessionId = searchParams.get("session_Id");

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);
  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-green-50 via-gray-50 to-green-50 pt-12 md:pt-16 pb-4">
      <div className="bg-white/70 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-4 border border-green-100/20">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative h-16 w-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center animate-fade-in">
              <svg
                className="h-8 w-8 text-green-600 animate-check"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-transparent bg-clip-text animate-gradient">
          Order Confirmed!
        </h1>

        <div className="border-t border-b border-green-100 py-6 mb-6 space-y-4 backdrop-blur-sm">
          <p className="text-base text-gray-700 text-center font-medium">
            Your order has been confirmed and will be shipped shortly
          </p>
          <div className="space-y-3">
            {orderNumber && (
              <div className="transform hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 flex items-center justify-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-gray-50 rounded-xl shadow-sm">
                  <span className="font-medium">Order Number:</span>
                  <span className="font-mono text-sm text-green-600 bg-white px-4 py-1.5 rounded-lg shadow-inner">
                    {orderNumber}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <svg
              className="w-4 h-4 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <p className="text-sm text-center">
              Check your email for the confirmation details
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg px-6 py-2 rounded-lg text-base"
            >
              <Link href={"/orders"}>View Order</Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="hover:bg-green-50 transition-all duration-300 transform hover:scale-105 border-green-200 px-6 py-2 rounded-lg text-base"
            >
              <Link href={"/"}>Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SuccessPage;

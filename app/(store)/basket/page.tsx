"use client";

import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import Loader from "@/components/Loader";
import imageUrl from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //wait for client to mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto p-12 flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl"
      >
        <h1 className="text-5xl font-black mb-8 text-gray-800 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
          Your Basket
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Your basket is waiting to be filled
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          Start Shopping
        </button>
      </motion.div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl pb-[calc(4rem+18rem)] lg:pb-8">
      <h1 className="text-4xl font-bold mb-12 text-gray-800 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent text-center">
        Your Basket
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-grow space-y-6">
          <AnimatePresence>
            {groupedItems?.map((item) => (
              <motion.div
                key={item.product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="group p-6 border border-gray-100 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.05)] 
                  hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] transition-all duration-300 
                  flex items-center justify-between bg-white/80 backdrop-blur-sm"
              >
                <div
                  className="flex items-center cursor-pointer flex-1 min-w-0 gap-8"
                  onClick={() =>
                    router.push(`/product/${item.product.slug?.current}`)
                  }
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 overflow-hidden rounded-xl">
                    {item.product.image && (
                      <Image
                        src={imageUrl(item.product.image).url()}
                        alt={item.product.name ?? "Product image"}
                        width={144}
                        height={144}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold truncate text-gray-900 mb-3">
                      {item.product.name}
                    </h2>
                    <p className="text-xl bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent font-semibold">
                      ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center ml-8 flex-shrink-0">
                  <AddToBasketButton product={item.product} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-[400px] lg:sticky lg:top-4 h-fit bg-white/80 
            backdrop-blur-md p-8 border border-gray-100 rounded-2xl shadow-xl 
            order-first lg:order-last fixed bottom-0 left-0"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            Order Summary
          </h3>
          <div className="space-y-6">
            <p className="flex justify-between text-xl text-gray-700">
              <span>Items:</span>
              <span className="font-semibold">
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <div className="h-px bg-gradient-to-r from-teal-500 to-blue-500 my-6"></div>
            <p className="flex justify-between text-2xl font-bold text-gray-900">
              <span>Total:</span>
              <span className="text-gray-800 bg-clip-text">
                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-8 w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] transform hover:-translate-y-1"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
                  Processing...
                </span>
              ) : (
                "Checkout"
              )}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-8 w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-xl transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] transform hover:-translate-y-1">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </motion.div>
        <div className="h-72 lg:h-0">
          {/* Spacer for fixed checkout on mobile */}
        </div>
      </div>
    </div>
  );
}

export default BasketPage;

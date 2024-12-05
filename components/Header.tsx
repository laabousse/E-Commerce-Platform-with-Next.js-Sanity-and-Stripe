"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";
import { toast } from "sonner";

const Header = () => {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      if (response) {
        toast.success("Passkey created successfully!");
      }
    } catch (err) {
      if (err && typeof err === "object" && "code" in err) {
        const errorObj = err as {
          message?: string;
          code: string;
          name?: string;
        };
        const errorMessage = errorObj.message || "";
        switch (errorObj.code) {
          case "passkey_registration_cancelled":
            if (errorMessage.includes("timeout")) {
              toast.error("Passkey registration timed out. Please try again");
            } else {
              toast.error("Passkey registration was cancelled");
            }
            break;
          case "passkey_already_exists":
            toast.error("A passkey already exists for this device");
            break;
          case "passkey_operation_failed":
            toast.error("Failed to create passkey. Please try again");
            break;
          case "not_allowed":
            toast.error("Your browser or device doesn't support passkeys");
            break;
          default:
            toast.error("Something went wrong. Please try again later");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-[#008080] to-[#006666] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Trendy
          </Link>

          {/* Search Bar */}
          <Form
            action="/search"
            className="hidden md:block flex-1 max-w-xl mx-8"
          >
            <div className="relative">
              <input
                type="text"
                name="query"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-[#008080] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008080]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </Form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/basket"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <TrolleyIcon className="w-6 h-6 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#008080] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <ClerkLoaded>
              <SignedIn>
                <Link
                  href="/orders"
                  className="hidden sm:flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <PackageIcon className="w-6 h-6 text-gray-700" />
                </Link>
              </SignedIn>

              <div className="flex items-center space-x-3">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="hidden sm:block text-right">
                        <p className="text-xs text-gray-500">Welcome back</p>
                        <p className="text-sm font-medium text-gray-700">
                          {user.fullName}
                        </p>
                      </div>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-9 h-9",
                          },
                        }}
                      />
                    </div>
                    {user.passkeys.length === 0 && (
                      <button
                        onClick={createClerkPasskey}
                        className="px-4 py-2 text-sm font-medium text-[#008080] border border-[#008080] rounded-full hover:bg-[#008080] hover:text-white transition-colors animate-pulse"
                      >
                        Create passkey
                      </button>
                    )}
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#008080] rounded-full hover:bg-[#006666] transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </div>
            </ClerkLoaded>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <Form action="/search" className="flex-1">
            <div className="relative">
              <input
                type="text"
                name="query"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-[#008080] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008080]"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </header>
  );
};

export default Header;

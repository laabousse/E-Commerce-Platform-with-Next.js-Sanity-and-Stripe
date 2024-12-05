import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Trendy",
  description: "E-Commerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className="h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-gray-50`}
        >
          <Toaster position="top-center" richColors />
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[2000px] mx-auto">{children}</div>
          </main>
          <footer className="mt-auto border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Laabousse. All rights reserved.
              </div>
            </div>
          </footer>
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}

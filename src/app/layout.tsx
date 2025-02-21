import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import { AuthProvider } from "@/lib/AuthContext";
// import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Infinitum</title>
      </head>
      <body className={`${inter.className} no-scrollbar`}>
        <AuthProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
              </div>
            }
          >
            {/* <Navbar /> */}
            {children}
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import "@/app/login/animations.css";

export default function LoginPage() {

  const handleGoogleLogin = async () => {
    try {
        console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/callback`);

        // Log the response text to see what is returned
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        if (!response.ok) {
            console.error("Failed to fetch:", response.statusText);
            return;
        }

        let data;
        try {
            data = JSON.parse(responseText); // Parse the text manually
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
        }

        console.log(data); // Inspect the response

        if (data?.authUrl) {
            window.location.href = data.authUrl; // Redirect user to Google OAuth
        } else {
            console.error("Failed to get auth URL:", data?.message || "Unknown error");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Google Sign-in Error:", error.message);
        } else {
            console.error("Google Sign-in Error:", error);
        }
    }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="background-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="dot"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content Box */}
      <div className="relative z-10 bg-zinc-900 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white text-center">Login</h1>

        {/* Google Sign-In Button */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full bg-pink-600 hover:bg-pink-700"
        >
          Sign in with Google
        </Button>

        {/* Register Link */}
        <p className="text-gray-400 text-center mt-4 text-sm md:text-base">
          Haven't registered yet?{" "}
          <Link href="/register" className="text-pink-500 hover:underline">
            Register here
          </Link>
        </p>

        {/* Back to Home Button */}
        <Button asChild className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}

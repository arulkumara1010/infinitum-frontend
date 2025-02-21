"use client";
import { useState, useEffect } from "react";
import type React from "react";

import FormField from "./FormField";
import "./animation.css";
import Navbar from "../components/navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

const BACKEND_URL = "https://infinitum-website.onrender.com";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthState } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    year: "1",
    phnNo: "",
    source: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }

    const storedName =
      searchParams.get("name") || localStorage.getItem("name") || "";
    const storedRollNo =
      searchParams.get("roll_no") || localStorage.getItem("roll_no") || "";

    setFormData((prev) => ({
      ...prev,
      name: storedName,
      rollNo: storedRollNo,
    }));

    if (searchParams.get("showForm") === "true") {
      setShowForm(true);
    }
  }, [router, searchParams]);

  const handleGoogleRegister = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/google`);
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        console.error("Failed to get auth URL:", data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google Sign-in Error:", error.message);
      } else {
        console.error("Google Sign-in Error:", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Check for required fields
    if (
      !formData.name ||
      !formData.rollNo ||
      !formData.department ||
      !formData.year ||
      !formData.phnNo
    ) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://infinitum-website.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            roll_no: formData.rollNo,
            department: formData.department,
            year: formData.year,
            phn_no: formData.phnNo,
            source: formData.source,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        if (result.token) {
          await setAuthState(result.token);
          router.push("/dashboard");
        } else {
          setMessage("Registration successful! Please login.");
          router.push("/login");
        }
      } else {
        setMessage(`Error: ${result.message || "Something went wrong"}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      {!showForm && <Navbar />}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-xl w-full max-w-md space-y-6 animate__animated animate__fadeIn">
          <h1 className="form-title text-4xl font-extrabold text-white text-center">
            Register for the Event
          </h1>

          {message && (
            <div className="text-white text-center mb-4">
              <p>{message}</p>
            </div>
          )}

          {!showForm ? (
            <button
              onClick={handleGoogleRegister}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Register with Google
            </button>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <FormField
                label="Full Name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              <FormField
                label="Roll Number"
                name="rollNo"
                value={formData.rollNo}
                handleChange={handleChange}
                placeholder="Enter your roll number"
                required
              />
              <FormField
                label="Department"
                name="department"
                value={formData.department}
                handleChange={handleChange}
                placeholder="Enter your department"
                required
              />

              <div className="flex flex-col">
                <label className="text-white mb-2">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <FormField
                label="Phone Number"
                name="phnNo"
                value={formData.phnNo}
                handleChange={handleChange}
                placeholder="Enter your phone number"
                required
              />

              <div className="flex flex-col mb-6">
                <label className="text-white mb-2">
                  How did you hear about us?
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
                >
                  <option value="">Select an option</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Friends">Friends</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="form-button w-full mt-4 px-8 py-4 rounded-md bg-[#fc1464] text-white text-lg font-semibold hover:bg-[#f41d72] focus:outline-none focus:ring-4 focus:ring-[#fc1464] transition duration-300 scale-100 hover:scale-105"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

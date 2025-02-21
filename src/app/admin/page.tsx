"use client";
const url = "https://infinitum-website.onrender.com";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
interface LoginResponse {
  token: string;
}
const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post<LoginResponse>(
        `${url}/api/auth/admin/login`,
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("isAdminLoggedIn", "true");
      localStorage.setItem("auth_token", token);
      router.push("/admin/admindashboard");
    } catch (error: unknown) {
      setError("Invalid username or password" + error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E] text-white">
      <div className="bg-[#16213E] p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col">
          <label className="mb-2 font-semibold">Username:</label>
          <input
            type="text"
            className="p-2 mb-4 bg-[#CCD6E0FC] text-black rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="mb-2 font-semibold">Password:</label>
          <input
            type="password"
            className="p-2 mb-4 bg-[#CCD6E0FC] text-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[#E94560] text-white p-2 rounded hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

"use client"
import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FormField from "./FormField"
import './animation.css'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    department: '',
    year: '1',
    phnNo: '',
    source: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Replace the URL with backend endpoint
      const response = await fetch('https://your-backend-endpoint.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          rollNo: formData.rollNo,
          department: formData.department,
          year: formData.year,
          phnNo: formData.phnNo,
          source: formData.source,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Please login.');
      } else {
        setMessage(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      setMessage('Network error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 animate-background-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3e3e3e] to-[#fc1464] opacity-80 animate-gradient"></div>
        <div className="absolute inset-0 bg-noise opacity-15 animate-noise"></div>
        <div className="absolute inset-0 bg-opacity-20 backdrop-blur-xl animate-blur"></div>
      </div>

      <div className="relative z-10 bg-zinc-900 p-8 rounded-lg shadow-xl max-w-md w-full space-y-6 animate__animated animate__fadeIn mt-16 md:mt-24 md:max-w-sm custom-scrollbar">
        <h1 className="form-title text-4xl font-extrabold text-white text-center">
          Register for the Event
        </h1>

        {message && (
          <div className="text-white text-center mb-4">
            <p>{message}</p>
          </div>
        )}

        <button
          className="form-button w-full mt-4 px-6 py-3 rounded-md bg-gray-800 text-white text-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 transition duration-300 scale-100 hover:scale-105 flex items-center justify-center"
        >
          Google Login
        </button>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="Full Name" name="name" value={formData.name} handleChange={handleChange} placeholder="Enter your full name" />
          <FormField label="Roll Number" name="rollNo" value={formData.rollNo} handleChange={handleChange} placeholder="Enter your roll number" />
          <FormField label="Department" name="department" value={formData.department} handleChange={handleChange} placeholder="Enter your department" />

          <div className="flex flex-col">
            <label className="text-white mb-2">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="form-input bg-zinc-800 text-white p-3 rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-[#fc1464] transition duration-300"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <FormField label="Phone Number" name="phnNo" value={formData.phnNo} handleChange={handleChange} placeholder="Enter your phone number" />

          <div className="flex flex-col mb-6"> {/* Added margin-bottom to create space */}
            <label className="text-white mb-2">How did you hear about us?</label>
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
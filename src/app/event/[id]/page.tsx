"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useParams
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const events = [
  { id: "1", title: "Event 1", image: "/e1.jpg", description: "----Event Description----", date: "March 6, 2025", location: "XYZ Auditorium" },
  { id: "2", title: "Event 2", image: "/e2.jpg", description: "----Event Description----", date: "March 7, 2025", location: "ABC Hall" },
  { id: "3", title: "Event 3", image: "/e3.jpg", description: "----Event Description----", date: "March 6, 2025", location: "DEF Center" },
  { id: "4", title: "Event 4", image: "/e4.jpg", description: "----Event Description----", date: "March 7, 2025", location: "DEF Center" },
  { id: "5", title: "Event 5", image: "/e5.jpg", description: "----Event Description----", date: "March 6, 2025", location: "DEF Center" },
  { id: "6", title: "Event 6", image: "/e6.jpg", description: "----Event Description----", date: "March 7, 2025", location: "DEF Center" },
];

export default function EventPage() {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the event ID
  const [loading, setLoading] = useState(true);

  const event = events.find((e) => e.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || !event) {
    return <div className="text-white text-center">Loading Event...</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Floating Dots Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 6 + 4}px`,
              height: `${Math.random() * 6 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Event Details */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-8 bg-zinc-900 rounded-xl shadow-lg text-center max-w-lg"
      >
        {/* Event Image */}
        <img src={event.image} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-6" />

        <h1 className="text-4xl font-bold">{event.title}</h1>
        <p className="mt-4 text-lg text-gray-300">{event.description}</p>
        <p className="mt-2 text-sm text-gray-500">📅 {event.date}</p>
        <p className="text-sm text-gray-500">📍 {event.location}</p>

        {/* Register Button */}
        <Button className="mt-6 bg-[#ff0074] hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">
          Register Now
        </Button>
      </motion.div>
    </div>
  );
}

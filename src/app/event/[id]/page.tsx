"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  MapPin,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import axios from "axios";

const events = [
  {
    id: "1",
    title: "Hackathon: Code for Change",
    image: "/e1.jpg",
    description:
      "Join us for a 24-hour coding marathon where innovation meets social impact. Build solutions that address real-world challenges in healthcare, education, or environmental sustainability.",
    date: "March 6, 2025",
    time: "9:00 AM - March 7, 9:00 AM",
    location: "PSG Tech Main Auditorium",
    teamSize: "2-4 members",
    prizes: [
      "₹50,000 First Prize",
      "₹30,000 Second Prize",
      "₹20,000 Third Prize",
    ],
    prerequisites: [
      "Laptop with required software",
      "Student ID",
      "Basic coding knowledge",
    ],
    registrationDeadline: "March 1, 2025",
    status: "Upcoming",
  },
  {
    id: "2",
    title: "AI Story Quest",
    image: "/e2.jpg",
    description:
      "AI Story Quest is a technical and non-technical event that combines AI tools with storytelling. Participants use AI to generate text and images while adapting to unexpected challenges.\nObjective:\nDevelop skills in prompt engineering and AI-assisted content creation. Improve critical thinking and adaptability by responding to dynamic challenges.Enhance presentation abilities in a competitive setting.",
    date: "March 8, 2025",
    time: "1.30 PM - 3.30 PM",
    location: "3AI Lab",
    teamSize: "2-3 members",
    prizes: ["Winner : ₹2000", "Runner : ₹1000"],
    prerequisites: [
      "Basic Python knowledge",
      "Laptop",
      "Mathematics background",
    ],
    registrationDeadline: "March 3, 2025",
    status: "Upcoming",
  },
  {
    id: "3",
    title: "Family Feud",
    image: "/e3.jpg",
    description:
      "This event brings friends together for an engaging and interactive experience, fostering teamwork and strategic thinking. Participants will compete in teams, answering survey-based questions to identify the most popular responses. The game encourages collaboration, quick decision-making, and a spirit of friendly competition. The event aims to create a dynamic and enjoyable environment where participants can test their knowledge, interact meaningfully, and strengthen social bonds through structured gameplay.",
    date: "March 8, 2025",
    time: "9.30 AM - 12.00 PM",
    location: "AIR Lab",
    teamSize: "4-6 members",
    prizes: ["Winner : ₹2000", "Runner : ₹1000"],
    prerequisites: ["Basic networking knowledge"],
    registrationDeadline: "March 8, 2025",
    status: "Upcoming",
  },
  {
    id: "4",
    title: "The Pandemic That Never Happened",
    image: "/e4.jpg",
    description:
      "'The Pandemic That Never Happened' is an immersive cybersecurity and digital forensics event where participants must navigate through a fabricated global crisis, analyze digital evidence, and uncover the truth behind the misinformation campaign. The event will simulate a high-stakes investigative scenario in which teams will utilize forensic techniques, threat analysis, and cybersecurity skills to solve the mystery.",
    date: "March 7, 2025",
    time: "9:30 AM - 12:00 PM",
    location: "AIR Lab",
    teamSize: "2-4 members",
    prizes: ["Winner : ₹2000", "Runner : ₹1000"],
    prerequisites: ["JavaScript knowledge", "Laptop", "MetaMask wallet"],
    registrationDeadline: "March 4, 2025",
    status: "Upcoming",
  },
];

interface RegisteredEvent {
  event_id: string;
  event: {
    event_name: string;
  };
}

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  const event = events.find((e) => e.id === id);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(
          'https://infinitum-website.onrender.com/api/student/registeredEvents',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setRegisteredEvents(response.data);
        setIsAlreadyRegistered(response.data.some((e: RegisteredEvent) => e.event_id === id));
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    if (isAuthenticated) {
      fetchRegisteredEvents();
    }
  }, [isAuthenticated, id]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setShowConfirmation(true);
  };

  const confirmRegistration = async () => {
    setIsRegistering(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.post(
        `https://infinitum-website.onrender.com/api/event/register`,
        {"event_id": id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.status === 200) {
        setIsAlreadyRegistered(true);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    } finally {
      setIsRegistering(false);
      setShowConfirmation(false);
    }
  };

  if (loading || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Event Details...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b text-white px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ["0%", "-100%"],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 7 + 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Login Required</h3>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="p-1 hover:bg-zinc-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-6">Please login to register for this event.</p>
            <div className="space-y-4">
              <Button
                onClick={() => router.push('/login')}
                className="w-full bg-[#fc1464] hover:bg-[#d1004f]"
              >
                Login
              </Button>
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <button
                  onClick={() => router.push('/register')}
                  className="text-[#fc1464] hover:underline"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Confirm Registration</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="p-1 hover:bg-zinc-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-400">Event</p>
                <p className="font-medium">{event.title}</p>
              </div>
              <div>
                <p className="text-gray-400">Date & Time</p>
                <p className="font-medium">{event.date}, {event.time}</p>
              </div>
              <div>
                <p className="text-gray-400">Your Details</p>
                <p className="font-medium">{userProfile?.name}</p>
                <p className="text-sm text-gray-300">{userProfile?.roll_no}</p>
                <p className="text-sm text-gray-300">{userProfile?.phn_no}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowConfirmation(false)}
                variant="outline"
                className="w-full"
              >
                Back
              </Button>
              <Button
                onClick={confirmRegistration}
                className="w-full bg-[#fc1464] hover:bg-[#d1004f]"
                disabled={isRegistering}
              >
                {isRegistering ? "Registering..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Event Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Event Header */}
        <div className="relative h-[250px] sm:h-[350px] w-full rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="inline-block px-3 py-1 rounded-full bg-[#fc1464] text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
              {event.status}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-shadow">
              {event.title}
            </h1>
            <p className="text-gray-200 text-sm sm:text-base hidden sm:block">
              {event.description}
            </p>
          </div>
        </div>

        {/* Mobile Event Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sm:hidden bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#fc1464]">
            Event Description
          </h2>
          <div className="relative">
            <p
              className={`text-gray-200 text-sm ${
                showFullDescription ? "" : "line-clamp-3"
              }`}
            >
              {event.description}
            </p>
            {!showFullDescription && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent" />
            )}
          </div>
          <Button
            onClick={() => setShowFullDescription(!showFullDescription)}
            variant="ghost"
            size="sm"
            className="mt-2 p-0 h-auto text-gray-300 hover:text-white"
          >
            {showFullDescription ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                Read More
              </>
            )}
          </Button>
        </motion.div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Left Column - Event Information */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#fc1464]">
                Event Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#fc1464]" />
                  <div>
                    <p className="text-gray-400 text-sm">Team Size</p>
                    <p className="font-medium">{event.teamSize}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#fc1464]">
                Prerequisites
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-200 text-sm sm:text-base">
                {event.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Prizes and Registration */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-6 h-6 text-[#fc1464]" />
                <h2 className="text-xl sm:text-2xl font-semibold text-[#fc1464]">
                  Prizes
                </h2>
              </div>
              <ul className="space-y-3">
                {event.prizes.map((prize, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-[#fc1464] text-lg">•</span>
                    <span className="text-gray-200">{prize}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-sm shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#fc1464]">
                Registration
              </h2>
              <p className="text-gray-200 text-sm sm:text-base mb-4">
                Registration Deadline:{" "}
                <span className="font-semibold">
                  {event.registrationDeadline}
                </span>
              </p>
              <Button
                onClick={handleRegister}
                disabled={isRegistering || isAlreadyRegistered}
                className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-lg ${
                  isAlreadyRegistered
                    ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
                    : "bg-[#fc1464] hover:bg-[#d1004f] text-white"
                }`}
              >
                {isRegistering
                  ? "Processing..."
                  : isAlreadyRegistered
                  ? "Already Registered"
                  : "Register Now"}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
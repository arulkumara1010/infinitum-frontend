import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import axios from "axios";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegisteredEvent {
  event_id: string;
  event: {
    event_name: string;
  };
}

export default function ProfileSidebar({
  isOpen,
  onClose,
}: ProfileSidebarProps) {
  const { userProfile } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await axios.get(
          "https://infinitum-website.onrender.com/api/student/registeredEvents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchRegisteredEvents();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed right-0 top-0 h-full w-80 bg-zinc-900 shadow-lg z-50 border-l border-zinc-800 overflow-y-auto"
    >
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
        <h2 className="text-xl font-bold text-white">Profile</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {userProfile ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <p className="text-white font-medium">{userProfile.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Roll Number</label>
                <p className="text-white font-medium">{userProfile.roll_no}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Department</label>
                <p className="text-white font-medium">
                  {userProfile.department}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Year</label>
                <p className="text-white font-medium">{userProfile.year}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Phone Number</label>
                <p className="text-white font-medium">{userProfile.phn_no}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-zinc-800 pb-2">
                Registered Events
              </h3>

              {loading ? (
                <div className="text-center text-gray-400">
                  Loading events...
                </div>
              ) : registeredEvents.length > 0 ? (
                <div className="space-y-4">
                  {registeredEvents.map((event) => (
                    <div
                      key={event.event_id}
                      className="bg-zinc-800 rounded-lg p-4 space-y-2"
                    >
                      <h4 className="text-white font-medium">
                        {event.event.event_name}
                      </h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-4">
                  No events registered
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-400">Loading profile...</div>
        )}
      </div>
    </motion.div>
  );
}

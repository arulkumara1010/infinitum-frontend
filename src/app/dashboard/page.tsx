"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar";

interface Event {
  date: string;
  name: string;
  startTime: string;
  endTime: string;
  id: string;
  offset?: number;
}

const events: Event[] = [
  {
    id: "1",
    date: "2025-03-07",
    name: "Inauguration and Hackathon Briefing",
    startTime: "09:00",
    endTime: "10:00",
  },
  {
    id: "2",
    date: "2025-03-07",
    name: "Nexus: Hackathon - Session 1",
    startTime: "09:30",
    endTime: "16:30",
    offset: 1,
  },
  {
    id: "3",
    date: "2025-03-07",
    name: "The Pandemic That Never Happened - Cybersecurity Tech Event",
    startTime: "09:30",
    endTime: "12:00",
    offset: 4,
  },
  {
    id: "4",
    date: "2025-03-07",
    name: "Workshop: Ikigai in AI - Balancing Passion, Purpose, and Authenticity in Engineering",
    startTime: "13:30",
    endTime: "15:30",
  },
  {
    id: "5",
    date: "2025-03-08",
    name: "Family Feud",
    startTime: "09:30",
    endTime: "12:00",
  },
  {
    id: "6",
    date: "2025-03-08",
    name: "Nexus: Hackathon Final Presentation",
    startTime: "10:00",
    endTime: "13:00",
  },
  {
    id: "7",
    date: "2025-03-08",
    name: "AI Story Quest",
    startTime: "13:30",
    endTime: "15:30",
  },
  {
    id: "8",
    date: "2025-03-08",
    name: "Valedictory",
    startTime: "15:45",
    endTime: "16:30",
  },
];

const timeSlots1 = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

export default function ScheduleDisplay() {
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

  const toggleEvent = (eventId: string) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const filteredEvents =
    selectedEvents.size > 0
      ? events.filter((event) => selectedEvents.has(event.id))
      : events;

  return (
    <div className="w-full p-4 py-8 min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Table View */}
        <div className="rounded-lg overflow-hidden border border-pink-600">
          <Table>
            <TableHeader className="bg-pink-600/10">
              <TableRow>
                <TableHead className="text-pink-500 font-bold">
                  Date & Event
                </TableHead>
                <TableHead className="text-pink-500 font-bold">
                  Start Time
                </TableHead>
                <TableHead className="text-pink-500 font-bold">
                  End Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow
                  key={event.id}
                  className={`cursor-pointer transition-colors ${
                    selectedEvents.has(event.id)
                      ? "bg-pink-600/25 hover:bg-pink-600/30"
                      : "hover:bg-gray-800/50"
                  }`}
                  onClick={() => toggleEvent(event.id)}
                >
                  <TableCell className="font-medium">
                    {event.date.split("-").slice(1).join("-")}: {event.name}
                  </TableCell>
                  <TableCell>{event.startTime}</TableCell>
                  <TableCell>{event.endTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Timeline View */}
        <div className="border border-pink-600 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <div className="grid grid-cols-[200px_repeat(11,1fr)] bg-pink-600/10 border-b border-pink-600">
                <div className="p-4 text-pink-500 font-bold">Event</div>
                {timeSlots1.map((time) => (
                  <div
                    key={time}
                    className="p-4 text-pink-500 font-bold text-center"
                  >
                    {time}
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    key={`${event.date}-${event.name}`}
                    className="grid grid-cols-[200px_repeat(11,1fr)] border-b border-gray-800 relative"
                  >
                    <div className="p-4">{event.name}</div>
                    {timeSlots1.map((time) => (
                      <div
                        key={time}
                        className="p-4 border-l border-gray-800"
                      ></div>
                    ))}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`absolute left-[200px] h-full ${
                        selectedEvents.has(event.id)
                          ? "bg-pink-600/25"
                          : "bg-gray-700/25"
                      }`}
                      style={{
                        left: `calc(200px + ${
                          (Number.parseInt(event.startTime) -
                            9 +
                            Number.parseInt(event.startTime.split(":")[1]) /
                              85) *
                          (100 / 10)
                        }% `,
                        width: `${
                          ((Number.parseInt(event.endTime) -
                            Number.parseInt(event.startTime)) *
                            100) /
                            13 -
                          (event.offset ?? 0)
                        }%`,
                        transformOrigin: "left",
                      }}
                    >
                      <div className="p-2 truncate">{event.name}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredEvents.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center text-gray-400"
                >
                  Click on events in the table above to view their timelines
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

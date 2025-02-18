"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

export default function Portfolio() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "GHCC", "The Eye", "CSEA"];

  const works = useMemo(
    () => [
      {
        id: 1,
        title: "Hackathon: Code for Change",
        category: "GHCC",
        image: "/e1.jpg",
        date: "March 6, 2025",
        location: "Main Auditorium",
        teamSize: "2-4 members",
        shortDescription: "24-hour coding marathon for social impact",
      },
      {
        id: 2,
        title: "AI Workshop: Future of ML",
        category: "GHCC",
        image: "/e2.jpg",
        date: "March 7, 2025",
        location: "CS Seminar Hall",
        teamSize: "Individual",
        shortDescription: "Deep dive into AI with industry experts",
      },
      {
        id: 3,
        title: "Cybersecurity Challenge",
        category: "The Eye",
        image: "/e3.jpg",
        date: "March 6, 2025",
        location: "Networks Lab",
        teamSize: "1-2 members",
        shortDescription: "Test your security skills in CTF",
      },
      {
        id: 4,
        title: "Web3 Development",
        category: "The Eye",
        image: "/e4.jpg",
        date: "March 7, 2025",
        location: "Innovation Center",
        teamSize: "Individual",
        shortDescription: "Build your first DApp",
      },
      {
        id: 5,
        title: "Game Development",
        category: "CSEA",
        image: "/e5.jpg",
        date: "March 6, 2025",
        location: "Graphics Lab",
        teamSize: "2-3 members",
        shortDescription: "Create games in 12 hours",
      },
      {
        id: 6,
        title: "IoT Innovation",
        category: "CSEA",
        image: "/e6.jpg",
        date: "March 7, 2025",
        location: "IoT Lab",
        teamSize: "2-4 members",
        shortDescription: "Build smart solutions",
      },
    ],
    []
  );

  useEffect(() => {
    works.forEach((work) => {
      router.prefetch(`/event/${work.id}`);
    });
  }, [works, router]);

  const filteredWorks = works.filter((work) =>
    selectedCategory === "All" ? true : work.category === selectedCategory
  );

  return (
    <section id="portfolio" className="bg-black py-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Discover our exciting lineup of tech events and competitions
          </motion.p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Button
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#fc1464] text-white shadow-lg shadow-[#fc1464]/20"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          layout
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onHoverStart={() => setHoveredId(work.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Card
                  className="group relative overflow-hidden bg-zinc-900 border-zinc-800 h-[400px] cursor-pointer"
                  onClick={() => router.push(`/event/${work.id}`)}
                >
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full">
                      <motion.img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />

                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-[#fc1464] text-white text-sm">
                              {work.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {work.title}
                          </h3>
                          <p className="text-gray-300">
                            {work.shortDescription}
                          </p>

                          <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#fc1464]" />
                              <span>{work.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#fc1464]" />
                              <span>{work.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#fc1464]" />
                              <span>{work.teamSize}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}

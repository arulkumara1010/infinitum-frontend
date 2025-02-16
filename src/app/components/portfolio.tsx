"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Portfolio() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "GHCC", "The Eye", "CSEA"];

  const works = [
    { id: 1, title: "Event 1", category: "GHCC", image: "/e1.jpg", year: "2025" },
    { id: 2, title: "Event 2", category: "GHCC", image: "/e2.jpg", year: "2025" },
    { id: 3, title: "Event 3", category: "The Eye", image: "/e3.jpg", year: "2025" },
    { id: 4, title: "Event 4", category: "The Eye", image: "/e4.jpg", year: "2025" },
    { id: 5, title: "Event 5", category: "CSEA", image: "/e5.jpg", year: "2025" },
    { id: 6, title: "Event 6", category: "CSEA", image: "/e6.jpg", year: "2025" },
  ];

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
        {/* Category Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
            <motion.div key={category} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setSelectedCategory(category)}
                className={`text-xs sm:text-sm md:text-base capitalize px-3 sm:px-4 py-2 transition-transform duration-300
                  ${
                    selectedCategory === category
                      ? "bg-[#ff0074] text-white"
                      : "bg-gray-200 text-black hover:bg-gray-400 hover:text-white"
                  }
                `}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
              >
                <Card
                  className="overflow-hidden bg-zinc-900 hover:scale-105 transition-transform duration-300 cursor-pointer w-full h-72 sm:h-80 md:h-96 relative"
                  onClick={() => router.push(`/event/${work.id}`)}
                >
                  <CardContent className="p-0 flex flex-col items-center justify-center w-full h-full relative">
                    <motion.img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 p-3 sm:p-4 text-center">
                      <motion.h3
                        className="text-xs sm:text-sm md:text-lg font-semibold text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {work.title}
                      </motion.h3>
                      <motion.p
                        className="mt-1 text-xs sm:text-sm text-gray-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {work.year}
                      </motion.p>
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

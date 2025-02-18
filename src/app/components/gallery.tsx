"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import ReactCardFlip from "react-card-flip";
import { Trophy, Calendar, MapPin } from "lucide-react";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [flippedStates, setFlippedStates] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const images = [
    {
      src: "/csea.jpeg",
      alt: "CSEA Events",
      title: "CSEA",
      description:
        "The Computer Science and Engineering Association (CSEA) at PSG Tech organizes cutting-edge technical events, workshops, and competitions throughout the year. Join us for hands-on learning experiences in AI, web development, cybersecurity, and more.",
      highlights: [
        "24-hour Hackathons",
        "Technical Workshops",
        "Industry Expert Sessions",
        "Coding Competitions",
      ],
      nextEvent: "March 6, 2025",
      venue: "CS Department",
    },
    {
      src: "/eye.jpeg",
      alt: "The Eye Events",
      title: "The Eye",
      description:
        "The Eye is PSG Tech's premier technical symposium that brings together the brightest minds in technology. Experience a fusion of innovation, creativity, and technical excellence through our carefully curated events and workshops.",
      highlights: [
        "Tech Talks",
        "Project Showcase",
        "Innovation Challenges",
        "Networking Sessions",
      ],
      nextEvent: "March 7, 2025",
      venue: "Main Auditorium",
    },
    {
      src: "/github.jpeg",
      alt: "Github Campus Club",
      title: "Github Campus Club",
      description:
        "PSG Tech's Github Campus Club is your gateway to open source development and collaboration. Learn version control, contribute to real-world projects, and connect with the global developer community.",
      highlights: [
        "Open Source Workshops",
        "Collaboration Events",
        "Git Training",
        "Project Management",
      ],
      nextEvent: "March 8, 2025",
      venue: "Innovation Hub",
    },
  ];

  const handleFlip = (index: number) => {
    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);
  };

  return (
    <section className="relative py-20 bg-black">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Featured Organizations
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the technical clubs and organizations driving innovation at
            PSG Tech
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {images.map((image, index) => (
            <ReactCardFlip
              key={index}
              isFlipped={flippedStates[index]}
              flipDirection="horizontal"
            >
              {/* Front Side */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="w-96 h-[500px] cursor-pointer overflow-hidden rounded-xl relative group"
                onClick={() => handleFlip(index)}
              >
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold text-white mb-3">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {image.description.substring(0, 100)}...
                  </p>
                  <span className="text-[#fc1464] text-sm">
                    Click to learn more →
                  </span>
                </div>
              </motion.div>

              {/* Back Side */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-96 h-[500px] cursor-pointer rounded-xl bg-zinc-900 px-6 py-10 flex flex-col"
                onClick={() => handleFlip(index)}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {image.title}
                </h3>
                <p className="text-gray-300 mb-6">{image.description}</p>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-[#fc1464]" />
                    <h4 className="text-lg font-semibold text-white">
                      Highlights
                    </h4>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {image.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-gray-300 flex items-center gap-2"
                      >
                        <span className="text-[#fc1464]">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#fc1464]" />
                    <span>Next Event: {image.nextEvent}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#fc1464]" />
                    <span>Venue: {image.venue}</span>
                  </div>
                </div>
              </motion.div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </section>
  );
}

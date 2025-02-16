"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"
import ReactCardFlip from "react-card-flip"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [flippedStates, setFlippedStates] = useState<boolean[]>([
    false,
    false,
    false,
  ])

  const images = [
    {
      src: "/csea.jpeg",
      alt: "Art piece 1",
      title: "CSEA",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
    {
      src: "/eye.jpeg",
      alt: "Art piece 2",
      title: "The Eye",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
    {
      src: "/github.jpeg",
      alt: "Art piece 3",
      title: "Github Campus Club",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
  ]

  const handleFlip = (index: number) => {
    const newFlippedStates = [...flippedStates]
    newFlippedStates[index] = !newFlippedStates[index]
    setFlippedStates(newFlippedStates)
  }

  return (
    <section className="relative py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-4xl font-bold tracking-tighter sm:text-5xl text-gray-800"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: "inherit", // Retain default color
          }}
        >
          Featured Works
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {images.map((image, index: number) => (
            <ReactCardFlip
              key={index}
              isFlipped={flippedStates[index]}
              flipDirection="horizontal"
            >
              {/* Front Side */}
              <div
                className="w-96 h-96 cursor-pointer overflow-hidden rounded-lg shadow-lg"
                onClick={() => handleFlip(index)}
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Back Side */}
              <div
                className="w-96 h-96 cursor-pointer rounded-lg shadow-lg bg-white text-gray-800 flex flex-col justify-center items-center p-6"
                onClick={() => handleFlip(index)}
                style={{
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <h3 className="text-2xl font-semibold text-black">
                  {image.title}
                </h3>
                <p className="text-sm mt-2 text-center text-gray-800">
                  {image.description}
                </p>
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </section>
  )
}

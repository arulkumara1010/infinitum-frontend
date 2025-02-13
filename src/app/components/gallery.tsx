"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { useInView } from "framer-motion"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [clickedIndex, setClickedIndex] = useState<number | null>(null)

  const images = [
    {
      src: "./csea.jpeg",
      alt: "Art piece 1",
      title: "CSEA",
      description: "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    
    },
    {
      src: "./eye.jpeg",
      alt: "Art piece 2",
      title: "The Eye",
      description: "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
    {
      src: "./github.jpeg",
      alt: "Art piece 3",
      title: "Github Campus Club",
      description: "  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem velit, ea, dolore, maxime unde nulla perspiciatis repellendus aperiam excepturi labore est voluptates! Nesciunt cum placeat atque exercitationem perferendis eius quis!",
    },
  ]

  const handleClick = (index: number) => {
    // Toggle the clicked state for image
    setClickedIndex(clickedIndex === index ? null : index)
  }

  return (
    <section className="relative py-20">
      <div ref={ref} className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Works
        </motion.h2>

        {/* Centered Gallery */}
        <div className="flex flex-wrap justify-center gap-8">
          {images.map((image, index: number) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden rounded-lg w-96 h-96 transition-all duration-300 ${
                clickedIndex === index ? "bg-white" : ""
              }`} // Change background color on click
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div
                className="w-full h-full overflow-hidden relative cursor-pointer"
                onClick={() => handleClick(index)} // Trigger on click
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-transform duration-500 ${clickedIndex === index ? "scale-95" : ""}`} // Apply scale on click
                />
              </div>

              {/* Show Description and Title When Clicked */}
              {clickedIndex === index && (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 p-6">
                  <h3 className="text-xl font-semibold text-black">{image.title}</h3>
                  <p className="text-sm text-black mt-2">{image.description}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

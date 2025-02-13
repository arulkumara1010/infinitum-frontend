"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const images = [
    {
      src: "./csea.jpeg",
      alt: "Art piece 1",
      title: "CSEA",
      description: "An abstract piece inspired by nature's harmony.",
    },
    {
      src: "./eye.jpeg",
      alt: "Art piece 2",
      title: "The Eye",
      description: "A surreal interpretation of the human eye.",
    },
    {
      src: "./github.jpeg",
      alt: "Art piece 3",
      title: "Github Campus Club",
      description: "An illustration of collaboration in the tech community.",
    },
  ]

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
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg w-96 h-96"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* White Background and Description on Hover */}
              <div className="absolute inset-0 bottom-0 flex flex-col justify-end bg-white p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="text-xl font-semibold text-black">{image.title}</h3>
                <p className="text-sm text-black mt-2">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

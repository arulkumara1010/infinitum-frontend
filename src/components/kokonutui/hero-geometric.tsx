"use client"

import { motion, useInView } from "framer-motion"
import { Pacifico } from "next/font/google"
import Link from "next/link"
import { useRef } from "react"
import { cn } from "@/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div ref={ref} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303] bg-[url('/bgimg2.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#030303] via-transparent to-[#030303] pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Nexus</span>
              <br />
              <span className={cn("bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300", pacifico.className)}>
                the fusion challenge
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              The flagship event where technology meets art. Teams blend creativity and technical expertise to redefine innovation.
            </p>
          </motion.div>

          {/* ✨ "Click here to learn more" Button ✨ */}
          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Link href="/event/5">
              <button className="relative px-6 py-3 text-lg font-semibold text-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg transition-all duration-300 hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50">
                Click here to know more
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 opacity-0 transition-opacity duration-300 hover:opacity-10"></span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  )
}

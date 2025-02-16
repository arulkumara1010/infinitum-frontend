"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const particles: Particle[] = []
        const particleCount = 100

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number

            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2 + 0.1
                this.speedX = Math.random() * 2 - 1
                this.speedY = Math.random() * 2 - 1
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                if (this.x > canvas.width) this.x = 0
                if (this.x < 0) this.x = canvas.width
                if (this.y > canvas.height) this.y = 0
                if (this.y < 0) this.y = canvas.height
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        function animate() {
            if (!ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const particle of particles) {
                particle.update()
                particle.draw()
            }

            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            if (!canvasRef.current) return
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className="relative h-screen w-full overflow-hidden pt-16">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                <motion.img
                    src="/infinitum.svg"
                    className="mb-6 w-64 sm:w-80 lg:w-[700px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                />
                <motion.p
                    className="mb-8 max-w-[700px] text-lg text-gray-300 sm:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    The Ultimate Fusion of Technology, Innovation, and Creativity. Join the Future at PSG Tech’s CSEA Flagship Event.
                </motion.p>
                <motion.div
                    className="flex space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Button
                        onClick={() => {
                            const section = document.getElementById("portfolio");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        Explore Events
                    </Button>
                    <Button asChild variant="outline">
                        <a href="/register">Register Now</a>
                    </Button>
                </motion.div>
            </div>
        </div >
    )
}

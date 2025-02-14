
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Menu } from "lucide-react"
import type React from "react" // Added import for React
import Image from "next/image"
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navItems = [
        { href: "#gallery", label: "Gallery" },
        { href: "#portfolio", label: "Portfolio" },
        { href: "#contact", label: "Contact" },
        { href: "/register", label: "Register" },
        { href: "/login", label: "Login" },
    ]

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">

                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <Image src="/infinitum2.svg" alt="Infinitum Logo" width={150} height={50} priority />
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        {navItems.slice(0, 3).map((item) => (
                            <NavLink key={item.href} href={item.href}>
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Button asChild variant="outline">
                            <Link href="/register">Register</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 pt-16"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-4 py-8">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <NavLink href={item.href} onClick={toggleMobileMenu} className="block py-4 text-2xl">
                                        {item.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    )
}

function NavLink({
    href,
    children,
    className = "",
    onClick,
}: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
    return (
        <Link href={href} className={`text-gray-300 hover:text-white transition-colors ${className}`} onClick={onClick}>
            {children}
        </Link>
    )
}


"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Menu, User, LogOut, ChevronLeft } from "lucide-react";
import type React from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useAuth } from "@/lib/AuthContext";
import ProfileSidebar from "@/components/ProfileSidebar";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "/#gallery", label: "Gallery" },
    { href: "/#Flagship", label: "Flagship" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 bg-black transition-colors duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-black"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/infinitum2.svg"
                alt="Infinitum Logo"
                width={150}
                height={50}
                priority
              />
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className={
                    item.label === "Flagship" ? styles.animateTextWave : ""
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="relative hover:bg-zinc-800 text-white"
                  >
                    <User className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                  </Button>
                  
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-900 ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsProfileOpen(true);
                            setShowProfileDropdown(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 w-full"
                        >
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-zinc-800 w-full"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
              <Button asChild className="w-full bg-white text-black hover:bg-[#D3D3D3] hover:text-black">
  <Link href="/register">Register</Link>
</Button>

                  <Button asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>

            <Button
              size="icon"
              className="md:hidden text-white hover:bg-zinc-800"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-black"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ChevronLeft className="h-6 w-6 text-white mr-2" />
                  <span className="text-white">Back to Home</span>
                </Link>
                <Button
                  size="icon"
                  className="text-white hover:bg-zinc-800"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="p-4 space-y-6">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavLink
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className={`block text-lg py-2 ${
                        item.label === "Flagship" ? styles.animateTextWave : ""
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
                
                {isAuthenticated ? (
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <Button
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#fc1464] hover:bg-[#d1004f]"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-4 border-t border-zinc-800">
                    <Button asChild className="w-full bg-[#fc1464] hover:bg-[#d1004f]">
                      <Link href="/register">Register</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-zinc-700 text-white hover:bg-zinc-800"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isProfileOpen && (
          <ProfileSidebar
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`text-gray-300 transition-colors duration-300 hover:text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
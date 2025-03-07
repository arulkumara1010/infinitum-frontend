"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Menu, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useAuth } from "@/lib/AuthContext";
import { NavLink } from "./NavLink";
import ProfileSidebar from "@/components/ProfileSidebar";
import { MobileMenu } from "./MobileMenu";

const navItems = [
  { href: "/#gallery", label: "Gallery" },
  { href: "/#Flagship", label: "Flagship" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
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

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    await logout();
    setShowProfileDropdown(false);
    setIsMobileMenuOpen(false);
  }, [logout]);

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

            <div className="hidden md:flex flex-grow justify-center">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  className={`mx-4 ${
                    item.label === "Flagship" ? styles.animateTextWave : ""
                  }`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <AuthButtons
              isAuthenticated={isAuthenticated}
              showProfileDropdown={showProfileDropdown}
              setShowProfileDropdown={setShowProfileDropdown}
              setIsProfileOpen={setIsProfileOpen}
              handleLogout={handleLogout}
            />

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

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={toggleMobileMenu}
          navItems={navItems}
          isAuthenticated={isAuthenticated}
          onProfileClick={() => {
            setIsProfileOpen(true);
            setIsMobileMenuOpen(false);
          }}
          onLogout={handleLogout}
        />
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

interface AuthButtonsProps {
  isAuthenticated: boolean;
  showProfileDropdown: boolean;
  setShowProfileDropdown: (value: boolean) => void;
  setIsProfileOpen: (value: boolean) => void;
  handleLogout: () => void;
}

function AuthButtons({
  isAuthenticated,
  showProfileDropdown,
  setShowProfileDropdown,
  setIsProfileOpen,
  handleLogout,
}: AuthButtonsProps) {
  return (
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
                  className="flex items-center px-4 py-2 text-sm text-black-300 hover:bg-zinc-800 w-full"
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
          <Button
            asChild
            className="bg-white text-black hover:bg-[#D3D3D3] hover:text-black"
          >
            <Link href="/Dashboard">Event TimeLine</Link>
          </Button>
          
        </>
      )}
    </div>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { navBarLinks } from "@/lib/constants/navbarLinks";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for the dynamic CTA
  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling past the hero section (approx 500px)
      setIsScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex-shrink-0 group">
              <div className="relative p-2 rounded-xl transition-all duration-200 group-hover:bg-gray-50">
                <Image
                  src="/images/ADTO2_Blue.svg"
                  alt="Adto Logo"
                  width={45}
                  height={45}
                  className="transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navBarLinks.map((value, index) => {
                const isActive = value.link === "/home"
                  ? pathname === "/home" || pathname === "/"
                  : pathname.startsWith(value.link);
                return (
                  <Link
                    key={index}
                    href={value.link}
                    className={`relative px-4 py-2 font-medium rounded-lg transition-all duration-200 group ${isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                  >
                    {value.title}
                    <span
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Dynamic CTA Button */}
            <div
              className={`hidden md:block transition-all duration-500 ease-in-out ${pathname.startsWith("/events")
                  ? "opacity-100 translate-y-0"
                  : isScrolled
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
            >
              <Link
                href="/events"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium shadow-md transition-all transform hover:-translate-y-0.5 ${pathname.startsWith("/events")
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-md"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg"
                  }`}
              >
                Discover Events
              </Link>
            </div>

            <div className="relative md:hidden" ref={menuRef}>
              <button
                onClick={handleMenuClick}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                {isMenuOpen ? <HiMenuAlt3 size={24} /> : <HiMenu size={24} />}
              </button>

              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  <div className="p-2">
                    {navBarLinks.map((value, index) => {
                      const isActive = value.link === "/home"
                        ? pathname === "/home" || pathname === "/"
                        : pathname.startsWith(value.link);
                      return (
                        <Link
                          key={index}
                          href={value.link}
                          className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                            ? "text-blue-600 bg-blue-50 font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                            }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="font-medium">{value.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

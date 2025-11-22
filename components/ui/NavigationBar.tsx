"use client";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { navBarLinks } from "@/lib/constants/navbarLinks";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
                  src="/images/Logo.png"
                  alt="Adto Logo"
                  width={45}
                  height={45}
                  className="transition-transform duration-200 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navBarLinks.map((value, index) => (
                <Link
                  key={index}
                  href={value.link}
                  className="relative px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 group"
                >
                  {value.title}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
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
                    {navBarLinks.map((value, index) => (
                      <Link
                        key={index}
                        href={value.link}
                        className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="font-medium">{value.title}</span>
                      </Link>
                    ))}
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

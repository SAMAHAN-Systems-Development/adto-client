"use client";
import Link from "next/link";
import Image from "next/image";
import Links from "@/data/links.json";
import { IoNotifications } from "react-icons/io5";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Badge } from "@/components/ui/badge";
import type { JSX } from "react";

export default function NavigationBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount] = useState(3); // Example notification count
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { NavbarLinks, AccountLinks } = Links;
  const iconMap: { [key: string]: JSX.Element } = {
    IoMdPerson: <IoMdPerson className="mr-3 text-lg" />,
    IoSettings: <IoMdSettings className="mr-3 text-lg" />,
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownClick = () => {
    setShowDropdown((prev) => !prev);
    setIsMenuOpen(false);
  };

  const handleMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // insert logic for logout here...
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
              {NavbarLinks.map((value, index) => (
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
                    {NavbarLinks.map((value, index) => (
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

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
              <IoNotifications size={22} />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500 flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Badge>
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleDropdownClick}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="relative">
                  <Image
                    src="/images/Avatar.png"
                    alt="Avatar Photo"
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-200"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
              </button>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/images/Avatar.png"
                        alt="Avatar Photo"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          John Doe
                        </p>
                        <p className="text-xs text-gray-500">
                          john@example.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    {AccountLinks.map((value, index) => (
                      <Link
                        key={index}
                        href={value.link}
                        className="flex items-center px-3 py-2.5 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-all duration-200 group"
                        onClick={() => setShowDropdown(false)}
                      >
                        <span className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                          {iconMap[value.icon]}
                        </span>
                        <span className="font-medium">{value.title}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
                      onClick={() => {
                        handleLogout();
                        setShowDropdown(false);
                      }}
                    >
                      Log out
                    </Button>
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

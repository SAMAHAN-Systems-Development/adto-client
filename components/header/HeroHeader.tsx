"use client";

import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RiNotification2Fill } from "react-icons/ri";

const HeroHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/events?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      {/* Top Navigation */}
      <div className="bg-gray-100 h-[10vh] py-4 px-6 flex items-center justify-between shadow-md">
        {/* Left Section: Logo and Navigation Links */}
        <div className="flex items-center space-x-8 ml-8"> 
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl ml-10 font-extrabold text-blue-600">Logo</span>
          </div>

          <div className="hidden md:flex items-center space-x-8"> {/* Added ml-4 to move nav links to the right */}
            <a
              href="/events"
              className="relative group hover:text-[#1e3a8a] transition-colors duration-300 ml-20"
            >
              Your Events
              <span
                className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#1e3a8a] transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
            <a
              href="/discover"
              className="relative group hover:text-[#1e3a8a] transition-colors duration-300"
            >
              Discover Events
              <span
                className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#1e3a8a] transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </div>
        </div>

        {/* Right Section: Notification Icon and Profile Picture */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2"
            aria-label="Notifications"
          >
            <RiNotification2Fill className="h-6 w-6 text-[#0f172a]" />
          </button>

          {/* Profile Picture */}
          <img
            src="/images/temporaryavatar.jpg" 
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="bg-gray-100 shadow-md md:hidden">
          <nav className="flex flex-col space-y-4 p-4 text-gray-700 font-semibold">
            <a href="/events" className="hover:text-blue-600">
              Your Events
            </a>
            <a href="/discover" className="hover:text-blue-600">
              Discover Events
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-[68vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src="/images/addu-banner.jpg"
            alt="Background"
            className="h-full w-full object-cover filter"
          />
        </div>

        {/* Tagline Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 -translate-y-20">
          <h1 className="text-4xl md:text-6xl font-lg mb-10 text-center">
            *Tagline Here*
          </h1>
          <div className="flex flex-wrap gap-2 items-center justify-center w-full">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search Event or Organization"
              className="w-full md:w-[550px] px-4 py-2 text-black bg-white rounded-md shadow-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {/* Search Button */}
            <button
              className="px-4 py-2 bg-[#0f172a] text-white rounded-md shadow-md transform transition-transform duration-300 hover:scale-110 hover:-translate-y-1"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
"use client";

import React, { useState } from "react";


const HeroHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
      {/* Hero Section */}
      <div className="relative h-[68vh] md:h-[100vh] overflow-hidden">
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
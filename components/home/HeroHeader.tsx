"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { WordRotate } from "../ui/word-rotate";

const HeroHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/events?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="h-[100vh] bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400/25 rounded-full blur-3xl animate-pulse delay-2000" />

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-lg border border-white/20 text-white rounded-full text-sm font-medium shadow-lg">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <span>University Event Platform</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight">
            Discover & Join
          </h1>
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <WordRotate
              className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg"
              words={[
                "Campus Events",
                "Community Events",
                "Fun Events",
                "Amazing Events",
              ]}
            />
          </div>
        </div>

        <p className="text-xl md:text-2xl lg:text-3xl text-blue-100/90 max-w-4xl leading-relaxed font-light">
          Connect with your community and discover incredible events happening
          across your university campus
        </p>

        <div className="w-full max-w-4xl space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
            <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4">
              <Search className="h-6 w-6 text-blue-200 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search events, organizations, venues..."
                className="flex-1 h-16 text-lg bg-transparent border-0 text-white placeholder:text-blue-200/70 focus:ring-0 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="h-16 px-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span>Search</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-blue-200/80 text-sm font-medium">
              Popular searches:
            </span>
            {["Concerts", "Workshops", "Sports", "Seminars", "Festivals"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-full transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient)"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroHeader;

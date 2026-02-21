"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { WordRotate } from "../ui/word-rotate";

const HeroHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/events?searchFilter=${searchQuery}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section id="top" className="relative min-h-[100dvh] lg:min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 overflow-hidden">
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

      <div className="container mx-auto px-4 flex flex-col items-center justify-center pt-8 md:pt-10 pb-32 md:pb-48 min-h-[100dvh] lg:min-h-screen text-center space-y-6 sm:space-y-8 lg:space-y-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 text-white/90 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm">
          <Sparkles className="h-3 w-3 text-yellow-300" />
          <span>University Event Platform</span>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            Discover & Join
          </h1>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
            <WordRotate
              className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent drop-shadow-md"
              words={["Campus Events", "Community Events", "Fun Events", "Amazing Events"]}
            />
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-blue-100/90 max-w-3xl leading-relaxed font-light px-2">
          Connect with your community and discover incredible events happening across your
          university campus
        </p>

        <div className="w-full max-w-3xl space-y-6">
          <div className="flex flex-row items-stretch gap-2 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
            <div className="flex-1 flex items-center gap-2 bg-white/5 rounded-xl px-4 min-w-0">
              <Search className="h-5 w-5 text-blue-200/80 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search events, organizations, venues..."
                className="flex-1 h-12 md:h-14 text-sm md:text-base border-0 bg-transparent text-white placeholder:text-blue-200/60 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 min-w-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <Button
              onClick={handleSearch}
              className="
                h-12 md:h-14
                w-12 md:w-auto
                px-0 md:px-8
                bg-gradient-to-r from-yellow-400 to-orange-500
                hover:from-yellow-500 hover:to-orange-600
                text-white font-semibold
                rounded-xl shadow-md hover:shadow-lg
                transition-all duration-300 group
                flex items-center justify-center
              "
            >
              <span className="hidden md:inline">Search</span>
              <ArrowRight className="h-5 w-5 md:ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

          </div>
        </div>

      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 md:h-32 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroHeader;

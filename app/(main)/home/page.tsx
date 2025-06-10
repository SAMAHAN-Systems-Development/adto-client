"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroHeader from "@/components/home/HeroHeader";
import { useGetFeaturedEvents } from "@/client/queries/eventQueries";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EventCard } from "@/components/EventCard";
import type { Event } from "@/client/types/entities";
import { formatDate } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight, Sparkles, Users, MapPin } from "lucide-react";

export default function Home() {
  const { data: featuredEvents, isLoading: isFeaturedEventsLoading } =
    useGetFeaturedEvents();

  const FeaturedEventsSkeleton = () => (
    <div className="flex space-x-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-80">
          <Skeleton className="h-48 w-full rounded-xl mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <HeroHeader />

      {/* Featured Events Section */}
      <section className="py-16 px-4 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Featured Events
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Don't Miss These{" "}
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Amazing Events
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most exciting events happening on campus and join
              your community
            </p>
          </div>

          {/* Featured Events Carousel */}
          {isFeaturedEventsLoading ? (
            <FeaturedEventsSkeleton />
          ) : featuredEvents?.data && featuredEvents.data.length > 0 ? (
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-6">
                  {featuredEvents.data.map((event: Event) => (
                    <CarouselItem
                      key={event.id}
                      className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="transform transition-all duration-300 hover:scale-105">
                        <EventCard
                          id={event.id}
                          title={event.name}
                          organization={event.org?.name || ""}
                          dateRange={`${formatDate(
                            event.dateStart,
                            "MMM dd, yyyy"
                          )} to ${formatDate(event.dateEnd, "MMM dd, yyyy")}`}
                          timeRange={`${new Date(
                            event.dateStart
                          ).toLocaleTimeString()} to ${new Date(
                            event.dateEnd
                          ).toLocaleTimeString()}`}
                          imageUrl=""
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom Navigation Buttons */}
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 hidden lg:block">
                  <CarouselPrevious className="h-12 w-12 border-2 border-blue-200 bg-white/90 hover:bg-blue-50 hover:border-blue-300 shadow-lg" />
                </div>
                <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden lg:block">
                  <CarouselNext className="h-12 w-12 border-2 border-blue-200 bg-white/90 hover:bg-blue-50 hover:border-blue-300 shadow-lg" />
                </div>
              </Carousel>

              {/* View All Events Link */}
              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg" className="group">
                  <Link href="/events" className="flex items-center gap-2">
                    View All Events
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No featured events
                </h3>
                <p className="text-gray-600">
                  Check back later for exciting events!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Spotlight Banner */}
      <section className="py-20 px-4 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/banner-image.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-blue-700/85" />

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

            {/* Content */}
            <div className="relative p-8 sm:p-12 md:p-16 lg:p-20">
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                  <Users className="h-4 w-4" />
                  Join the Community
                </div>

                {/* Main Content */}
                <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Discover Campus{" "}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Events
                  </span>
                </h2>
                <p className="text-white/90 text-xl mb-8 leading-relaxed max-w-2xl">
                  Connect with your community and discover all SAMAHAN events
                  and campus happenings in one place. Never miss out on the
                  experiences that matter.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 text-lg group shadow-lg"
                  >
                    <Link href="/events" className="flex items-center gap-2">
                      Browse All Events
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

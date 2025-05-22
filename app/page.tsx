"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EventCard } from "@/components/EventCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

import { useGetAllSamahanEventsById } from "@/client/queries/eventQuery";

export default function Home() {
  const { data: samahanEvents, isLoading } =
    useGetAllSamahanEventsById("org_a");
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    if (samahanEvents?.data && samahanEvents.data.length > 0) {
      setFeaturedEvents(samahanEvents.data);
    }
  }, [samahanEvents]);

  // Format date to DD-MMM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Featured Events Carousel - only show if featured events exist */}
      {!isLoading && featuredEvents.length > 0 && (
        <section className="py-12 px-4 lg:px-8">
          <div className="container mx-auto">
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-4">
                  {featuredEvents.map((event) => (
                    <CarouselItem
                      key={event.id}
                      className="pl-4 md:basis-1/2 lg:basis-1/4"
                    >
                      <EventCard
                        title={event.name}
                        organization={event.org?.name || ""}
                        dateRange={`${formatDate(
                          event.dateStart
                        )} to ${formatDate(event.dateEnd)}`}
                        timeRange={`${new Date(
                          event.dateStart
                        ).toLocaleTimeString()} to ${new Date(
                          event.dateEnd
                        ).toLocaleTimeString()}`}
                        imageUrl=""
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute top-1/2 -left-12 -translate-y-1/2 hidden md:block">
                  <CarouselPrevious />
                </div>
                <div className="absolute top-1/2 -right-12 -translate-y-1/2 hidden md:block">
                  <CarouselNext />
                </div>
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* Spotlight Banner */}
      <section className="bg-blue-50 py-20 px-4 lg:px-8">
        <div className="container mx-auto">
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              backgroundImage: "url('/banner-image.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/80 p-8 sm:p-12 md:p-16">
              <div className="max-w-2xl">
                <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
                  Discover Campus Events
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  Discover all SAMAHAN events and campus happenings in one
                  place.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-medium"
                >
                  <Link href="/events">Browse All Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

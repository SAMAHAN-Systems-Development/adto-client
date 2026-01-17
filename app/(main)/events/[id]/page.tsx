"use client";

import { useState } from "react";
import { useGetEventById } from "@/client/queries/eventQueries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";
import { getEventPriceDisplay } from "@/lib/utils/event-priceUtils";

const EventDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: event, isLoading, error } = useGetEventById(id);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedTicketCategory, setSelectedTicketCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Banner Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative w-full h-[400px] bg-gray-200 animate-pulse rounded-3xl">
            <Skeleton className="absolute inset-0 rounded-3xl" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The event you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.dateStart);
  const eventEndDate = new Date(event.dateEnd);
  const dateTimeString = `${format(eventDate, "MMMM dd, yyyy")} | ${format(
    eventDate,
    "hh:mm a"
  )} - ${format(eventEndDate, "hh:mm a")}`;

  const eventPrice = getEventPriceDisplay(event.TicketCategories);

  const descriptionPreview =
    event.description?.length > 400 && !showFullDescription
      ? `${event.description.substring(0, 400)}...`
      : event.description;

  const handleRegisterClick = () => {
    if (event.TicketCategories?.[0]) {
      setSelectedTicketCategory({
        id: event.TicketCategories[0].id,
        name: event.TicketCategories[0].name,
      });
      setRegistrationModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Container with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Banner with rounded corners */}
        <div className="relative w-full h-[400px] overflow-hidden rounded-3xl shadow-lg mb-8">
          {/* Background Image */}
          {event.bannerImage ? (
            <Image
              src={event.bannerImage}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
          )}

          {/* Event Title Overlay - Yellow Text */}
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-400 text-center drop-shadow-2xl leading-tight">
              {event.name}
            </h1>
          </div>

          {/* Tag Pills at Bottom Right */}
          <div className="absolute bottom-6 right-6 flex flex-wrap gap-3 justify-end">
            {event.isRegistrationRequired && (
              <Badge className="bg-white text-blue-600 hover:bg-white px-4 py-2 text-sm font-medium shadow-lg">
                <span className="mr-2">📝</span>
                Registration Required
              </Badge>
            )}
            {!event.isOpenToOutsiders && (
              <Badge className="bg-white text-blue-600 hover:bg-white px-4 py-2 text-sm font-medium shadow-lg">
                <span className="mr-2">👥</span>
                Open For SAMAHAN SysDev Members
              </Badge>
            )}
            {event.isOpenToOutsiders && (
              <Badge className="bg-white text-green-600 hover:bg-white px-4 py-2 text-sm font-medium shadow-lg">
                <span className="mr-2">🌍</span>
                Open to Everyone
              </Badge>
            )}
          </div>
        </div>

        {/* Event Core Info Section */}
        <div className="mb-8">
          {/* Date & Time */}
          <div className="mb-4">
            <p className="text-gray-600 text-base">{dateTimeString}</p>
          </div>

          {/* Event Title & Price Row */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {event.name}
              </h2>

              {/* Organization & Venue */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-900 font-medium">
                    {event.org?.name || "SAMAHAN SysDev"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-900">
                    {event.venue || "8th Floor Media Room, CCFC Building"}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Price - Right aligned */}
            <div className="text-right ml-8">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Price
              </span>
              <p className="text-xl font-bold text-gray-900">{eventPrice}</p>
            </div>
          </div>

          {/* Event Description */}
          <div className="mt-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Event Description
            </h3>
            <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {descriptionPreview}
            </div>
            {event.description?.length > 400 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-flex items-center"
              >
                {showFullDescription ? "See less" : "See more..."}
              </button>
            )}
          </div>

          {/* Register Button - Right aligned */}
          <div className="flex justify-end mt-8">
            <Button
              size="lg"
              onClick={handleRegisterClick}
              disabled={
                !event.isRegistrationOpen ||
                (event.isRegistrationRequired && !event.TicketCategories?.[0])
              }
              className="px-16 py-6 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              {event.isRegistrationOpen ? "Register" : "Registration Closed"}
            </Button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {selectedTicketCategory && (
        <EventRegistrationModal
          isOpen={registrationModalOpen}
          onClose={() => {
            setRegistrationModalOpen(false);
            setSelectedTicketCategory(null);
          }}
          eventId={id}
          eventName={event.name}
          ticketCategoryId={selectedTicketCategory.id}
          ticketCategoryName={selectedTicketCategory.name}
        />
      )}
    </div>
  );
};

export default EventDetailsPage;

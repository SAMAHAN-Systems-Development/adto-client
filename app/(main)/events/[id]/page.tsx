"use client";

import { useState } from "react";
import { useGetEventById } from "@/client/queries/eventQueries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Building2,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";

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
      <div className="min-h-screen bg-gray-50">
        {/* Banner Skeleton */}
        <div className="relative w-full h-[500px] bg-gray-200 animate-pulse">
          <Skeleton className="absolute inset-0" />
        </div>

        {/* Content Skeleton */}
        <div className="max-w-6xl mx-auto px-4 py-8">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">
            The event you&apos;re looking for doesn&apos;t exist or has been removed.
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

  // Determine event price (using first ticket category)
  const eventPrice =
    event.ticketCategories?.[0]?.price === 0
      ? "Free"
      : event.ticketCategories?.[0]?.price
      ? `₱${event.ticketCategories[0].price}`
      : "Free";

  // Truncate description for preview (first 250 characters)
  const descriptionPreview =
    event.description?.length > 250 && !showFullDescription
      ? `${event.description.substring(0, 250)}...`
      : event.description;

  const handleRegisterClick = () => {
    if (event.ticketCategories?.[0]) {
      setSelectedTicketCategory({
        id: event.ticketCategories[0].id,
        name: event.ticketCategories[0].name,
      });
      setRegistrationModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Event Banner with Overlay */}
      <div className="relative w-full h-[500px] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Event Title Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center px-4 drop-shadow-lg">
            {event.name}
          </h1>
        </div>

        {/* Tag Pills at Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-3 justify-center px-4">
          {event.isRegistrationRequired && (
            <Badge className="bg-white/90 text-blue-700 hover:bg-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="mr-2">📝</span>
              Registration Required
            </Badge>
          )}
          {!event.isOpenToOutsiders && (
            <Badge className="bg-white/90 text-blue-700 hover:bg-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="mr-2">👥</span>
              Open For SAMAHAN SysDev Members
            </Badge>
          )}
          {event.isOpenToOutsiders && (
            <Badge className="bg-white/90 text-green-700 hover:bg-white px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <span className="mr-2">🌍</span>
              Open to Everyone
            </Badge>
          )}
        </div>
      </div>

      {/* Event Core Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Date & Time */}
        <div className="mb-4">
          <p className="text-gray-600 text-lg">{dateTimeString}</p>
        </div>

        {/* Event Title & Price Row */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h2>

            {/* Organization & Venue */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium">{event.org?.name || "Organization"}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>
                  {event.venue || "8th Floor Media Room, CCFC Building"}
                </span>
              </div>
            </div>
          </div>

          {/* Event Price */}
          <div className="text-right ml-8">
            <p className="text-sm text-gray-500 mb-1">Event Price</p>
            <p className="text-4xl font-bold text-gray-900">{eventPrice}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Event Description */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Event Description</h3>
          <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {descriptionPreview}
          </div>
          {event.description?.length > 250 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-flex items-center"
            >
              {showFullDescription ? "See less" : "See more..."}
            </button>
          )}
        </div>

        {/* Register Button */}
        <div className="flex justify-center mt-12">
          <Button
            size="lg"
            onClick={handleRegisterClick}
            disabled={!event.isRegistrationOpen || !event.ticketCategories?.[0]}
            className="px-12 py-6 text-lg font-semibold rounded-xl"
          >
            {event.isRegistrationOpen ? "Register" : "Registration Closed"}
          </Button>
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

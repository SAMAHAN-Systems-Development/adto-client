"use client";

import { useState } from "react";
import { useGetEventById } from "@/client/queries/eventQueries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  Ticket,
  Share2,
  Heart,
  ArrowLeft,
  CheckCircle,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "date-fns";
import Link from "next/link";
import { Registration, TicketCategory } from "@/client/types/entities";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";

const EventDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: event, isLoading, error } = useGetEventById(id);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedTicketCategory, setSelectedTicketCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="relative h-[60vh] overflow-hidden">
          <Skeleton className="absolute inset-0" />
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Skeleton className="h-8 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !event || !event.isPublished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {`The event you're looking for doesn't exist or has been removed.`}
            </p>
            <Button asChild>
              <Link href="/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate statistics
  const totalRegistrations = event.registrations?.length || 0;
  const totalAttended =
    event.registrations?.filter((reg: Registration) => reg.isAttended).length ||
    0;
  const totalCapacity =
    event.ticketCategories?.reduce(
      (sum: number, category: TicketCategory) => sum + category.capacity,
      0
    ) || 0;

  const eventDate = new Date(event.dateStart);
  const eventEndDate = new Date(event.dateEnd);
  const registrationDeadline = new Date(
    event.ticketCategories?.[0]?.registrationDeadline || event.dateStart
  );

  const renderEventHeaderInformation = (
    <>
      <div className="flex flex-wrap gap-3">
        {event.isRegistrationOpen ? (
          <Badge className="bg-green-500/90 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Registration Open
          </Badge>
        ) : (
          <Badge className="bg-red-500/90 text-white">
            <AlertCircle className="h-3 w-3 mr-1" />
            Registration Closed
          </Badge>
        )}
        <Badge
          variant="outline"
          className="border-white/30 text-white bg-white/10"
        >
          <Building2 className="h-3 w-3 mr-1" />
          {event.org?.acronym || event.org?.name}
        </Badge>
        {!event.isOpenToOutsiders && (
          <Badge
            variant="outline"
            className="border-white/30 text-white bg-white/10"
          >
            <UserCheck className="h-3 w-3 mr-1" />
            Members Only
          </Badge>
        )}
        {event.isPublished && (
          <Badge
            variant="outline"
            className="border-white/30 text-white bg-white/10"
          >
            Published
          </Badge>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
        {event.name}
      </h1>

      <p className="text-xl text-blue-100 max-w-2xl">{event.description}</p>
    </>
  );

  const renderEventHeaderQuickInfo = (
    <>
      <div className="flex flex-wrap gap-6 text-white/90">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span>{formatDate(eventDate, "MMMM dd, yyyy")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>
            {eventDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}{" "}
            -{" "}
            {eventEndDate.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span>{totalRegistrations} registered</span>
        </div>
      </div>
    </>
  );

  const renderTicketCategories = event.ticketCategories.map(
    (category: TicketCategory, index: number) => (
      <div
        key={category.id}
        className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>
          <p className="text-gray-600 mb-3">{category.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {category.capacity} spots
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Until{" "}
              {formatDate(new Date(category.registrationDeadline), "MMM dd")}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {category.price === 0 ? "Free" : `₱${category.price}`}
          </div>
          <Button
            className="mt-3"
            variant={index === 1 ? "default" : "outline"}
            disabled={!event.isRegistrationOpen}
            onClick={() => {
              setSelectedTicketCategory({
                id: category.id,
                name: category.name,
              });
              setRegistrationModalOpen(true);
            }}
          >
            {event.isRegistrationOpen ? "Select Ticket" : "Registration Closed"}
          </Button>
        </div>
      </div>
    )
  );

  const renderQuickActions = (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full h-12 text-lg font-semibold"
            disabled={!event.isRegistrationOpen || !event.ticketCategories?.[0]}
            onClick={() => {
              if (event.ticketCategories?.[0]) {
                setSelectedTicketCategory({
                  id: event.ticketCategories[0].id,
                  name: event.ticketCategories[0].name,
                });
                setRegistrationModalOpen(true);
              }
            }}
          >
            <Ticket className="h-5 w-5 mr-2" />
            {event.isRegistrationOpen ? "Register Now" : "Registration Closed"}
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOrganizationInfo = event.org && (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Organized by</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
            {event.org.acronym || event.org.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{event.org.name}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {event.org.description}
            </p>
            <Button variant="link" className="p-0 h-auto mt-2 text-blue-600">
              View Organization
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEventStats = (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Event Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Registered</span>
          <span className="font-semibold text-lg">{totalRegistrations}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Attended</span>
          <span className="font-semibold text-lg text-green-600">
            {totalAttended}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Capacity</span>
          <span className="font-semibold text-lg">{totalCapacity}</span>
        </div>
        {totalCapacity > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Event Capacity</span>
                <span>
                  {Math.round((totalRegistrations / totalCapacity) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      (totalRegistrations / totalCapacity) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderEventRequirements = (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Requirements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">
            {event.isRegistrationRequired
              ? "Registration Required"
              : "Registration Optional"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="text-sm text-gray-600">
            {event.isOpenToOutsiders ? "Open to All" : "Ateneo Students Only"}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const renderEventMainDetailsSection = (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Event Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Date & Time</h4>
                <p className="text-gray-600">
                  {formatDate(eventDate, "EEEE, MMMM dd, yyyy")}
                </p>
                <p className="text-gray-600">
                  {eventDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  -{" "}
                  {eventEndDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Location</h4>
                <p className="text-gray-600">University Conference Hall</p>
                <p className="text-gray-600">Building A, 3rd Floor</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Organizer</h4>
                <p className="text-gray-600">{event.org?.name}</p>
                <p className="text-gray-600">{event.org?.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">
                  Registration Deadline
                </h4>
                <p className="text-gray-600">
                  {formatDate(registrationDeadline, "MMMM dd, yyyy")}
                </p>
                <p className="text-gray-600">
                  {registrationDeadline.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <Button
                asChild
                variant="ghost"
                className="mb-6 text-white hover:bg-white/10"
                size="sm"
              >
                <Link href="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Link>
              </Button>
              <div className="space-y-4">
                {renderEventHeaderInformation}
                {renderEventHeaderQuickInfo}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {renderEventMainDetailsSection}
            {event.ticketCategories && event.ticketCategories.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Ticket Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">{renderTicketCategories}</div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {renderQuickActions}
            {renderEventStats}
            {renderOrganizationInfo}
            {renderEventRequirements}
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

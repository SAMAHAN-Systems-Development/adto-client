"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import NavigationBar from "@/components/ui/NavigationBar";

const EVENTS_PER_PAGE = 9;

// Mock data with 12 events for testing
const MOCK_EVENTS = [
  {
    id: 1,
    name: "SAMAHAN General Assembly 2025",
    org: { name: "SAMAHAN Central Board" },
    dateStart: "2025-06-15T09:00:00Z",
    dateEnd: "2025-06-15T17:00:00Z",
    imageUrl: ""
  },
  {
    id: 2,
    name: "AdDU Cultural Festival",
    org: { name: "Cultural Affairs Committee" },
    dateStart: "2025-06-20T10:00:00Z",
    dateEnd: "2025-06-22T18:00:00Z",
    imageUrl: ""
  },
  {
    id: 3,
    name: "Engineering Week 2025",
    org: { name: "School of Engineering" },
    dateStart: "2025-06-25T08:00:00Z",
    dateEnd: "2025-06-28T16:00:00Z",
    imageUrl: ""
  },
  {
    id: 4,
    name: "Business Case Competition",
    org: { name: "School of Business" },
    dateStart: "2025-07-01T09:00:00Z",
    dateEnd: "2025-07-03T15:00:00Z",
    imageUrl: ""
  },
  {
    id: 5,
    name: "Addu Intramurals 2025",
    org: { name: "Sports Development Office" },
    dateStart: "2025-07-05T07:00:00Z",
    dateEnd: "2025-07-12T18:00:00Z",
    imageUrl: ""
  },
  {
    id: 6,
    name: "Mental Health Awareness Week",
    org: { name: "Guidance Center" },
    dateStart: "2025-07-08T10:00:00Z",
    dateEnd: "2025-07-12T16:00:00Z",
    imageUrl: ""
  },
  {
    id: 7,
    name: "Leadership Summit",
    org: { name: "Student Organizations Council" },
    dateStart: "2025-07-15T08:30:00Z",
    dateEnd: "2025-07-16T17:30:00Z",
    imageUrl: ""
  },
  {
    id: 8,
    name: "Research Symposium",
    org: { name: "Graduate School" },
    dateStart: "2025-07-18T13:00:00Z",
    dateEnd: "2025-07-19T17:00:00Z",
    imageUrl: ""
  },
  {
    id: 9,
    name: "Sustainability Fair",
    org: { name: "Environmental Club" },
    dateStart: "2025-07-22T09:00:00Z",
    dateEnd: "2025-07-22T15:00:00Z",
    imageUrl: ""
  },
  {
    id: 10,
    name: "Music Festival",
    org: { name: "Music Society" },
    dateStart: "2025-07-25T18:00:00Z",
    dateEnd: "2025-07-25T23:00:00Z",
    imageUrl: ""
  },
  {
    id: 11,
    name: "Career Fair 2025",
    org: { name: "Career Services" },
    dateStart: "2025-07-28T10:00:00Z",
    dateEnd: "2025-07-29T16:00:00Z",
    imageUrl: ""
  },
  {
    id: 12,
    name: "Alumni Homecoming",
    org: { name: "Alumni Association" },
    dateStart: "2025-08-01T09:00:00Z",
    dateEnd: "2025-08-02T20:00:00Z",
    imageUrl: ""
  }
];

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);
  const [isLoading, setIsLoading] = useState(false);

  // Format date to DD-MMM-YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Filter events based on search query
  useEffect(() => {
    const filtered = MOCK_EVENTS.filter((event) =>
      event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.org?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when search changes
  }, [searchQuery]);

  // Calculate pagination
  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <NavigationBar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              All Events (Test Mode)
            </h1>
            <p className="text-sm text-blue-600 mb-4">
              📝 Testing with {MOCK_EVENTS.length} mock events, {EVENTS_PER_PAGE} per page
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search events or orgs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Loading State for Pagination */}
          {isLoading && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading page...</span>
            </div>
          )}

          {/* Events Grid */}
          {currentEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentEvents.map((event) => (
                  <div key={event.id} className="relative">
                    {/* Event number badge for testing */}
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10">
                      #{event.id}
                    </div>
                    <EventCard
                      title={event.name}
                      organization={event.org?.name || ""}
                      dateRange={`${formatDate(event.dateStart)} to ${formatDate(event.dateEnd)}`}
                      timeRange={`${new Date(event.dateStart).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })} to ${new Date(event.dateEnd).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}`}
                      imageUrl={event.imageUrl}
                    />
                  </div>
                ))}
              </div>

              {/* Debug Info */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">🔍 Debug Info:</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• Total Events: {totalEvents}</p>
                  <p>• Current Page: {currentPage}</p>
                  <p>• Total Pages: {totalPages}</p>
                  <p>• Events on this page: {currentEvents.length}</p>
                  <p>• Showing events #{startIndex + 1} - #{Math.min(endIndex, totalEvents)}</p>
                  {searchQuery && <p>• Search query: "{searchQuery}"</p>}
                </div>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || isLoading}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({totalEvents} total events)
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || isLoading}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Test Instructions */}
              <div className="mt-8 bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">🧪 Test Instructions:</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Page 1 should show events #1-9</li>
                  <li>• Page 2 should show events #10-12</li>
                  <li>• Try searching for "SAMAHAN", "Music", or "Engineering"</li>
                  <li>• Previous button should be disabled on page 1</li>
                  <li>• Next button should be disabled on last page</li>
                  <li>• Search should reset to page 1</li>
                </ul>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "No events found" : "There are currently no events."}
              </h3>
              {searchQuery && (
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or browse all events.
                </p>
              )}
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
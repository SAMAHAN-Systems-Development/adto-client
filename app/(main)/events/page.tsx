"use client";
import { useGetEvents } from "@/client/queries/eventQueries";
import {
  useGetOrganizationParents,
  useGetOrganizations,
} from "@/client/queries/organizationQueries";
import type { EventQueryParams } from "@/client/services/eventsService";
import type { Event, OrganizationParent } from "@/client/types/entities";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState, Suspense } from "react";
import { debounce } from "lodash";
import { EventCard } from "@/components/EventCard";
import { Search, Filter, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const EventsContent = () => {
  const searchParams = useSearchParams();
  const initialSearchFilter = searchParams.get("searchFilter") || "";
  const [filters, setFilters] = useState({
    searchFilter: initialSearchFilter,
  } as EventQueryParams);
  const { data: organizations, isLoading: isOrganizationsLoading } = useGetOrganizations();
  const { data: organizationParents, isLoading: isOrganizationParentsLoading } =
    useGetOrganizationParents();
  const { data: events, isLoading: isEventsLoading } = useGetEvents(filters);
  const isFirstPage = events?.meta.currentPage === 1;
  const isLastPage = events?.meta.currentPage === events?.meta.totalPages;

  const renderOrganizationParentOptions = organizationParents?.map(
    (orgParent: OrganizationParent) => (
      <SelectItem key={orgParent.id} value={orgParent.id}>
        {orgParent.name}
      </SelectItem>
    )
  );

  const renderOrganizationOptions = organizations?.data.map((org: OrganizationParent) => (
    <SelectItem key={org.id} value={org.id}>
      {org.name}
    </SelectItem>
  ));

  const handleOrganizationParentFilter = (value: string) => {
    if (value === "all") {
      setFilters((prev: EventQueryParams) => ({
        ...prev,
        organizationParentId: undefined,
        page: 1,
      }));
    } else {
      setFilters((prev: EventQueryParams) => ({
        ...prev,
        organizationParentId: value,
        page: 1,
      }));
    }
  };

  const handleOrganizationChildFilter = (value: string) => {
    if (value === "all") {
      setFilters((prev: EventQueryParams) => ({
        ...prev,
        organizationId: undefined,
        page: 1,
      }));
    } else {
      setFilters((prev: EventQueryParams) => ({
        ...prev,
        organizationId: value,
        page: 1,
      }));
    }
  };

  const handleNextPage = () => {
    setFilters((prev: EventQueryParams) => ({
      ...prev,
      page: events.meta.currentPage + 1,
    }));
  };

  const handlePreviousPage = () => {
    setFilters((prev: EventQueryParams) => ({
      ...prev,
      page: events.meta.currentPage - 1,
    }));
  };

  const debouncedSearch = useRef(
    debounce((term: string) => {
      if (term.trim() === "") {
        setFilters((prev) => ({ ...prev, searchFilter: undefined }));
      } else {
        setFilters((prev) => ({ ...prev, searchFilter: term }));
      }
    }, 2000)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const EventsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100">
      <div className="relative bg-white border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Calendar className="h-4 w-4" />
                Discover Amazing Events
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Explore our{" "}
                <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                  Events
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find and join exciting events happening around you. Connect with communities and
                create memorable experiences.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  onChange={(e) => debouncedSearch(e.target.value)}
                  placeholder="Search for events, topics, or organizations..."
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Filter className="h-4 w-4" />
                  Filter by:
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Select onValueChange={handleOrganizationParentFilter}>
                    <SelectTrigger className="w-full sm:w-[200px] h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                      <SelectValue placeholder="Select Cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      {isOrganizationParentsLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        <>
                          <SelectItem value="all">All Clusters</SelectItem>
                          {renderOrganizationParentOptions}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={handleOrganizationChildFilter}>
                    <SelectTrigger className="w-full sm:w-[200px] h-11 border-2 border-gray-200 focus:border-blue-500 rounded-lg">
                      <SelectValue placeholder="Select Organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {isOrganizationsLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        <>
                          <SelectItem value="all">All Organizations</SelectItem>
                          {renderOrganizationOptions}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isEventsLoading ? (
          <EventsSkeleton />
        ) : events?.data && events.data.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {events.data.length} Events Found
                </h2>
                <p className="text-gray-600 mt-1">Discover events that match your interests</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.data.map((event: Event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.name}
                  organization={event.org?.name || ""}
                  dateRange={`${new Date(event.dateStart).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} to ${new Date(event.dateEnd).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}`}
                  timeRange={`${new Date(event.dateStart).toLocaleTimeString(
                    "en-US"
                  )} to ${new Date(event.dateEnd).toLocaleTimeString("en-US")}`}
                />
              ))}
            </div>

            <div className="flex justify-center items-center mt-12 space-x-4">
              <Button
                onClick={handlePreviousPage}
                disabled={isFirstPage}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous Page
              </Button>

              <Button
                onClick={handleNextPage}
                disabled={isLastPage}
                variant="outline"
                className="flex items-center gap-2"
              >
                Next Page
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters to find more events.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EventsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsContent />
    </Suspense>
  );
};

export default EventsPage;

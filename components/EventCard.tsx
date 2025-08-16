"use client";

import * as React from "react";
import { Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title?: string;
  organization?: string;
  dateRange?: string;
  timeRange?: string;
  price?: string;
  imageUrl?: string;
}

const EventCard = React.forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      id,
      className,
      title,
      organization,
      dateRange,
      timeRange,
      imageUrl,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const handleRedirectToDetails = () => {
      router.push(`/events/${id}`);
    };
    return (
      <Card
        ref={ref}
        className={cn(
          "group w-full overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white",
          className
        )}
        {...props}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title || "Event Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-sky-100/30 to-blue-50/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Calendar className="h-12 w-12 text-blue-500/70 mx-auto" />
                <p className="text-sm font-medium text-blue-600/80">
                  Event Image
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {organization && (
            <div className="absolute top-4 left-4">
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-800 backdrop-blur-sm"
              >
                {organization}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {title || "Event Title"}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium text-gray-900">
                  {dateRange || "DD-MMM-YYYY to DD-MMM-YYYY"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="font-medium text-gray-900">
                  {timeRange || "00:00 AM to 00:00 AM"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div
              className="flex items-center justify-between"
              onClick={() => handleRedirectToDetails()}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>Join Event</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
EventCard.displayName = "EventCard";

export { EventCard };

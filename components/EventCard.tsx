"use client";

import * as React from "react";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
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
      price,
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
        role="button"
        tabIndex={0}
        onClick={handleRedirectToDetails}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRedirectToDetails();
          }
        }}
        className={cn(
          "group w-full h-full overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          className
        )}
        {...props}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title || "Event Image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-sky-100/30 to-blue-50/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Calendar className="h-12 w-12 text-blue-500/70 mx-auto" />
                <p className="text-sm font-medium text-blue-800/90">
                  Event Image
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="space-y-1.5 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              <p className="font-medium text-gray-900 text-xs line-clamp-1">
                {dateRange || "DD-MMM-YYYY to DD-MMM-YYYY"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              <p className="font-medium text-gray-900 text-xs line-clamp-1">
                {timeRange || "00:00 AM to 00:00 AM"}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 min-h-[4.5rem] mb-3">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-snug">
              {title || "Event Title"}
            </h3>
            <p className="text-xs font-medium text-gray-500 line-clamp-1 mt-1 group-hover:text-blue-500 transition-colors duration-200">
              {organization || "Organization Name"}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                Price
              </span>
              <span className="text-base font-bold text-gray-900">
                {price || "Free"}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 text-white transition-all duration-200 shadow-sm">
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
      </Card>
    );
  }
);
EventCard.displayName = "EventCard";

export { EventCard };

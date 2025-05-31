"use client";

import * as React from "react";
import { Calendar, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    return (
      <Card
        ref={ref}
        className={cn("w-full max-w-sm overflow-hidden rounded-xl", className)}
        {...props}
      >
        <div className="relative aspect-[4/3] bg-gradient-to-b from-gray-300 to-gray-400">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <div className="p-4 flex gap-4 text-sm border-b">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{dateRange || "DD-MMM-YYYY to DD-MMM-YYYY"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{timeRange || "00:00 AM to 00:00 AM"}</span>
          </div>
        </div>
        <CardHeader className="p-4 pb-2">
          <h3 className="text-2xl font-semibold">{title || "Event Title"}</h3>
          {organization && (
            <p className="text-muted-foreground">{organization}</p>
          )}
        </CardHeader>
        {/* <CardFooter className="p-4 pt-2">
          <p className="text-xl font-semibold">{price || "Php 000.00"}</p>
        </CardFooter> */}
      </Card>
    );
  }
);
EventCard.displayName = "EventCard";

export { EventCard };

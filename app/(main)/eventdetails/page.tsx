"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { HiOutlinePencilAlt, HiOutlineUserGroup } from "react-icons/hi";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEventById } from "@/client/queries/eventQueries";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const EventDetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const { data: event, isLoading, error } = useGetEventById(id);

  const heroImage = useMemo(() => {
    return (
      (event?.bannerUrl as string) ||
      (event?.coverImageUrl as string) ||
      (event?.imageUrl as string) ||
      "/images/sysdev.png"
    );
  }, [event]);

  const dateTimeText = useMemo(() => {
    if (!event) return "";
    const start = new Date(event.dateStart);
    const end = new Date(event.dateEnd);
    const datePart = `${format(start, "MMMM dd, yyyy")} | ${format(
      start,
      "hh:mm a"
    )}`;
    const endPart = `${format(end, "MMMM dd, yyyy")} | ${format(
      end,
      "hh:mm a"
    )}`;
    return `${datePart} - ${endPart}`;
  }, [event]);

  const priceLabel = useMemo(() => {
    const prices = (event?.ticketCategories || [])
      .map((tc: any) => Number(tc?.price ?? 0))
      .filter((n: number) => !Number.isNaN(n));
    if (!prices.length) return "Free";
    const min = Math.min(...prices);
    return min === 0
      ? "Free"
      : new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(min);
  }, [event]);

  if (!id) {
    return (
      <div className="flex flex-col min-h-screen p-6 items-center">
        <p className="text-red-600">No event id provided.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen p-6 items-center">
        <div className="relative h-[564px] w-[1160px] flex-none shrink-0">
          <Skeleton className="absolute inset-0 rounded-2xl" />
        </div>
        <div className="flex items-end justify-between mt-8 w-[1160px]">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="flex items-end justify-between mt-2 w-[1160px]">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="flex items-end justify-start gap-4 mt-8 w-[1160px]">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-8 w-80" />
        </div>
        <div className="flex flex-col mt-8 w-[1160px]">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col min-h-screen p-6 items-center">
        <p className="text-red-600">Failed to load event.</p>
      </div>
    );
  }

  const orgName = event.org?.acronym || event.org?.name || "Organization";
  const location =
    (event as any).location ||
    (event as any).locationName ||
    (event as any).venue ||
    "Location TBA";

  return (
    <div className="flex flex-col min-h-screen p-6 items-center">
      <div className="relative h-[564px] w-[1160px] flex-none shrink-0">
        <Image
          src={heroImage}
          alt={`${event.name} banner`}
          fill
          priority
          className="object-cover absolute rounded-2xl"
        />

        <div className="flex gap-2 absolute bottom-4 right-4 z-10">
          {event.isRegistrationRequired && (
            <Card className="rounded-full flex w-90 items-center bg-blue-100 h-12 px-4 gap-2">
              <HiOutlinePencilAlt className="h-5 w-5 text-blue-800" />
              <CardContent className="p-0 text-blue-800">
                Registration Required
              </CardContent>
            </Card>
          )}

          <Card className="rounded-full flex w-90 items-center bg-blue-100 h-12 px-4 gap-2">
            <HiOutlineUserGroup className="h-5 w-5 text-blue-800" />
            <CardContent className="p-0 text-blue-800">
              {event.isOpenToOutsiders ? "Open to Outsiders" : "Members Only"}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-end justify-between mt-8 w-[1160px]">
        <p className="text-xl">{dateTimeText}</p>
        <p className="text-2xl font-bold">Event Price</p>
      </div>

      <div className="flex items-end justify-between mt-2 w-[1160px]">
        <p className="text-5xl font-bold">{event.name}</p>
        <p className="text-5xl font-bold">{priceLabel}</p>
      </div>

      <div className="flex items-end justify-start gap-4 mt-8 w-[1160px]">
        <Label className="flex items-center gap-2">
          <span className="rounded-full h-6 w-6 bg-blue-700" />
          <p className="text-2xl">{orgName}</p>
        </Label>
        <Label className="flex items-center gap-2">
          <span className="rounded-full h-6 w-6 bg-red-600" />
          <p className="text-2xl">{location}</p>
        </Label>
      </div>

      <div className="flex flex-col mt-8 w-[1160px]">
        <Label className="font-semibold text-lg">Event Description</Label>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus
          eros lacus, non feugiat libero consequat et. Suspendisse dictum ornare
          sapien, nec molestie libero aliquam et. Vestibulum euismod tortor
          molestie leo porta, id porttitor eros mattis. Maecenas consequat nisl
          vel mauris pellentesque sodales. Nullam non purus nec enim accumsan
          fermentum. In in sapien ac risus pretium pretium. Pellentesque aliquam
          venenatis semper. Pellentesque risus lectus, scelerisque quis tellus
          eget, cursus egestas sem. Aliquam vitae{" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="font-semibold underline text-blue-600 hover:text-blue-700">
                See more...
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>SYSDEV 2025 General Assembly</DialogTitle>
                <DialogDescription>
                  August 13, 2025 | 03:00 PM - August 13, 2025 | 06:00 PM
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Organizer</Label>
                  <p>SAMAHAN SysDev</p>
                </div>
                <div>
                  <Label className="font-semibold">Location</Label>
                  <p>8th Floor Media Room, CCFC Building</p>
                </div>
                <div>
                  <Label className="font-semibold">Details</Label>
                  <p className="whitespace-pre-wrap">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis dapibus eros lacus, non feugiat libero consequat et.
                    Suspendisse dictum ornare sapien, nec molestie libero
                    aliquam et. Vestibulum euismod tortor molestie leo porta, id
                    porttitor eros mattis. Maecenas consequat nisl vel mauris
                    pellentesque sodales. Nullam non purus nec enim accumsan
                    fermentum. In in sapien ac risus pretium pretium.
                    Pellentesque aliquam venenatis semper. Pellentesque risus
                    lectus, scelerisque quis tellus eget, cursus egestas sem.
                    Aliquam vitae sapien libero. Sed dictum, augue non ultricies
                    pharetra, felis erat gravida nibh, at viverra leo lectus
                    fermentum nisl. Integer bibendum, odio ac commodo bibendum,
                    quam velit viverra turpis, id vehicula augue arcu id sapien.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </p>
      </div>

      <div className="flex items-end justify-end gap-4 mt-8 w-[1160px]">
        <button className="bg-blue-500 text-white py-2 px-4 h-18 w-32 rounded">
          {event.isRegistrationOpen ? "Register" : "Closed"}
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;

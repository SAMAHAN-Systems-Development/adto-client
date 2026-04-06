import Image from "next/image";
import { Event } from "@/client/types/entities";
import { useState } from "react";
import { EventRegistrationModal } from "./EventRegistrationModal";
import { Button } from "./ui/button";

export type TicketCardProps = {
  ticketId: string;
  availableCapacity?: number; // e.g. "10 tickets left"
  event: Event;
  name: string;
  price?: number; // e.g. "Ticket Price"
  description?: string;
  imageSrc?: string; // URL or local path
  onDetails?: () => void; // if you want a modal later
  detailsHref?: string; // if you want a page route
  buttonText?: string; // default "Details"
};

export default function TicketCard({
  ticketId,
  availableCapacity,
  event,
  name,
  price,
  description = "",
  imageSrc = "/placeholder.jpg",
  detailsHref,
  buttonText = "Register",
}: TicketCardProps) {
  const ButtonContent = (
    <span className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700">
      {buttonText}
    </span>
  );
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedTicketCategory, setSelectedTicketCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const normalizedDetailsHref = detailsHref?.trim()
    ? /^(https?:)?\/\//i.test(detailsHref.trim())
      ? detailsHref.trim()
      : `https://${detailsHref.trim()}`
    : undefined;

  const handleRegisterClick = () => {
    setSelectedTicketCategory({
      id: ticketId,
      name,
    });
    setRegistrationModalOpen(true);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      {/* Image */}
      <div className="relative h-44 w-full">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm font-medium text-gray-500">
          {price === 0 || price === undefined
            ? "Free"
            : `₱${price.toFixed(2)}`}
        </p>

        {description ? (
          <p className="mt-3 line-clamp-3 text-sm text-gray-500">
            {description}
          </p>
        ) : (
          <p className="mt-3 line-clamp-3 text-sm text-gray-400">
            No description provided.
          </p>
        )}

        <div className="mt-8 flex justify-center md:justify-end">
          {availableCapacity !== 0 ? (
            !event.isRegistrationOpen ? (
              <Button
                size="lg"
                disabled
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Registration Closed
              </Button>
            ) : normalizedDetailsHref ? (
              <a
                href={normalizedDetailsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                {ButtonContent}
              </a>
            ) : price === 0 ? (
              <Button
                size="lg"
                onClick={handleRegisterClick}
                disabled={
                  event.isRegistrationRequired && !ticketId
                }
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Register
              </Button>
            ) : (
              <span className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700">
                {"Unavailable"}
              </span>
            )
          ) : (
            <span className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-400 px-4 text-sm font-semibold text-white transition hover:bg-gray-500">
              {"Sold Out"}
            </span>
          )}
        </div>
      </div>

      {selectedTicketCategory && (
        <EventRegistrationModal
          isOpen={registrationModalOpen}
          onClose={() => {
            setRegistrationModalOpen(false);
            setSelectedTicketCategory(null);
          }}
          eventId={event.id}
          eventName={event.name}
          ticketCategoryId={selectedTicketCategory.id}
          ticketCategoryName={selectedTicketCategory.name}
          isRsvpEnabled={event.isRsvpEnabled}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Tickets from "@/components/EventTabsTicket";
import Announcements from "@/components/EventTabsAnnouncements";
import { useGetEventTickets } from "@/client/queries/eventTabTicketQueries";
import { useGetEventAnnouncements } from "@/client/queries/eventTabAnnouncementQueries";
import { EventTabTicketParams } from "@/client/services/eventTabTicketService";
import { TicketCategory } from "@/client/types/entities";

type Tab = "tickets" | "announcements";

export default function EventTabs({eventId}: EventTabTicketParams) {
  const [activeTab, setActiveTab] = useState<Tab>("tickets");

  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useGetEventTickets({ eventId });

  const {
    data: announcementsData,
    isLoading: announcementsLoading,
    isError: announcementsError,
  } = useGetEventAnnouncements({ eventId });

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("tickets")}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === "tickets"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Tickets
        </button>

        <button
          onClick={() => setActiveTab("announcements")}
          className={`pb-3 text-sm font-medium transition-colors ${
            activeTab === "announcements"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Announcements
        </button>
      </div>

      <div className="mt-6">
        {activeTab === "tickets" && (
          <div className="mt-6">
            {ticketsLoading ? (
              <p className="text-sm text-gray-500">Loading tickets...</p>
            ) : ticketsError ? (
              <p className="text-sm text-red-500">Failed to load tickets.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {ticketsData.data.map((ticket: TicketCategory) => {
                  const name = ticket.name ?? ticket.name ?? "Untitled";
                  const price =
                    ticket.price ?? (ticket.price ? `₱${ticket.price}` : "Ticket Price");
                  const description = ticket.description ?? ticket.description ?? "";
                  const imageSrc = "/placeholder.jpg";
                  const id = ticket.id;

                  return (
                    <Tickets
                      key={id}
                      name={name}
                      price={price}
                      description={description}
                      imageSrc={imageSrc}
                      detailsHref={`/tickets/${id}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "announcements" && (
          <div>
            {announcementsLoading ? (
              <p className="text-sm text-gray-500">Loading announcements...</p>
            ) : announcementsError ? (
              <p className="text-sm text-red-500">Failed to load announcements.</p>
            ) : (
              <Announcements announcements={announcementsData.data} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Tickets from "@/components/EventTabsTicket";
import Announcements from "@/components/EventTabsAnnouncements";
import { useGetEventTickets } from "@/client/queries/eventTabTicketQueries";
import { useGetEventAnnouncements } from "@/client/queries/eventTabAnnouncementQueries";

type Tab = "tickets" | "announcements";

function normalizeToArray(d: any) {
  if (!d) return [];
  if (Array.isArray(d)) return d;
  if (Array.isArray(d.data)) return d.data;
  if (Array.isArray(d.items)) return d.items;
  return [];
}

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("tickets");

  const {
    data: ticketsData,
    isLoading: ticketsLoading,
    isError: ticketsError,
  } = useGetEventTickets();

  const {
    data: announcementsData,
    isLoading: announcementsLoading,
    isError: announcementsError,
  } = useGetEventAnnouncements();

  const tickets = normalizeToArray(ticketsData);
  const announcements = normalizeToArray(announcementsData);

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
                {tickets.map((ticket: any) => {
                  const title = ticket.title ?? ticket.name ?? "Untitled";
                  const priceLabel =
                    ticket.priceLabel ?? (ticket.price ? `₱${ticket.price}` : "Ticket Price");
                  const description = ticket.description ?? ticket.body ?? "";
                  const imageSrc = ticket.imageSrc ?? ticket.imageUrl ?? "/placeholder.jpg";
                  const id = ticket.id ?? ticket._id ?? "";

                  return (
                    <Tickets
                      key={id}
                      title={title}
                      priceLabel={priceLabel}
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
              <Announcements announcements={announcements} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

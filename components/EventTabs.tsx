"use client";

import { useState } from "react";
import Tickets from "@/components/EventTabsTicket";
import Announcements from "@/components/EventTabsAnnouncements";
import { useGetEventTickets } from "@/client/queries/eventTabTicketQueries";
import { useGetEventAnnouncements } from "@/client/queries/eventTabAnnouncementQueries";
import { EventTabTicketParams } from "@/client/services/eventTabTicketService";
import { TicketCategory } from "@/client/types/entities";

type Tab = "tickets" | "announcements";

export default function EventTabs({ eventId }: EventTabTicketParams) {
  const [activeTab, setActiveTab] = useState<Tab>("tickets");
  const [mobileExpanded, setMobileExpanded] = useState<Tab | null>("tickets");

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

  function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-xl bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
        <h3 className="mt-3 text-sm font-semibold text-gray-800">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-gray-500 text-center">{subtitle}</p>}
      </div>
    );
  }

  const renderTicketsContent = () => {
    if (ticketsLoading) return <EmptyState title="Loading tickets..." subtitle="Please wait" />;
    if (ticketsError) return <EmptyState title="Failed to load tickets" subtitle="Please try again later" />;

    const list = ticketsData?.data ?? [];
    if (list.length === 0)
      return (
        <EmptyState
          title="No tickets available"
          subtitle="Check back later or contact the organizer"
        />
      );

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((ticket: TicketCategory) => {
          const name = ticket.name ?? "Untitled";
          const price = ticket.price;
          const description = ticket.description ?? "";
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
    );
  };

  const renderAnnouncementsContent = () => {
    if (announcementsLoading)
      return <EmptyState title="Loading announcements..." subtitle="Please wait" />;
    if (announcementsError)
      return <EmptyState title="Failed to load announcements" subtitle="Please try again later" />;

    const list = announcementsData?.data ?? [];
    if (list.length === 0)
      return <EmptyState title="No announcements yet" subtitle="There are no posts for this event" />;

    return <Announcements announcements={list} />;
  };

  const toggleMobile = (tab: Tab) => {
    setMobileExpanded((prev) => (prev === tab ? null : tab));
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      {/* Mobile Accordion */}
      <div className="md:hidden">
        <div className="space-y-3">
          {/* Tickets */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleMobile("tickets")}
              className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition"
            >
              <span className="text-sm font-semibold text-gray-900">Tickets</span>
              <span className="text-lg text-gray-400">
                {mobileExpanded === "tickets" ? "–" : "+"}
              </span>
            </button>

            {mobileExpanded === "tickets" && (
              <div className="px-4 pb-4 pt-2">{renderTicketsContent()}</div>
            )}
          </div>

          {/* Announcements */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => toggleMobile("announcements")}
              className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition"
            >
              <span className="text-sm font-semibold text-gray-900">Announcements</span>
              <span className="text-lg text-gray-400">
                {mobileExpanded === "announcements" ? "–" : "+"}
              </span>
            </button>

            {mobileExpanded === "announcements" && (
              <div className="px-4 pb-4 pt-2">{renderAnnouncementsContent()}</div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="flex gap-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`pb-3 text-sm font-semibold transition-colors ${
              activeTab === "tickets"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Tickets
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`pb-3 text-sm font-semibold transition-colors ${
              activeTab === "announcements"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Announcements
          </button>
        </div>

        {/* Desktop Content ONLY (prevents mobile duplication) */}
        <div className="mt-6">
          {activeTab === "tickets" && <div className="mt-2">{renderTicketsContent()}</div>}
          {activeTab === "announcements" && <div className="mt-2">{renderAnnouncementsContent()}</div>}
        </div>
      </div>
    </div>
  );
}

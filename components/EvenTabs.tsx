"use client";

import { useState } from "react";
import Tickets from "@/components/EventTabsTicket";
import TicketData from "@/lib/mock/eventTickets.json";
import Announcements from "@/components/EventTabsAnnouncements";
import AnnouncementData from "@/lib/mock/eventAnnouncement.json";

type Tab = "tickets" | "announcements";

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("tickets");

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

      {/* Optional: content placeholder */}
      <div className="mt-6">
        {activeTab === "tickets" && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TicketData.map((ticket) => (
            <Tickets
                key={ticket.id}
                title={ticket.title}
                priceLabel={ticket.priceLabel}
                description={ticket.description}
                imageSrc={ticket.imageSrc}
                detailsHref={`/tickets/${ticket.id}`}
            />
            ))}
        </div>
)}

        {activeTab === "announcements" && (
            <Announcements announcements={AnnouncementData} />
        )}
      </div>
    </div>
  );
}

import { ADTO_SERVICE_BASE_URL } from "../config";
import { buildQueryString } from "./utils";

export const EVENT_TICKETS_BASE_URL = `${ADTO_SERVICE_BASE_URL}/tickets`;

export interface EventTabTicketParams {
    page?: number;
    limit?: number;
    eventId?: string;
}

export const getAllPublishedEventTickets = async (filters: EventTabTicketParams = {}) => {
    const queryString = await buildQueryString(
        filters as Record<string, unknown>
    );
    const response = await fetch(`${EVENT_TICKETS_BASE_URL}${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Failed to fetch events:", response.statusText);
    }

    const data = await response.json();
    return data;
}

export const getEventTicketById = async (ticketId: string) => {
    const response = await fetch(`${EVENT_TICKETS_BASE_URL}/${ticketId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Failed to fetch event ticket:", response.statusText);
    }

    const data = await response.json();
    return data;
}
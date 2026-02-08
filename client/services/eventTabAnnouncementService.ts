import { ADTO_SERVICE_BASE_URL } from "../config";
import { buildQueryString } from "./utils";

export const EVENT_ANNOUNCEMENTS_BASE_URL = `${ADTO_SERVICE_BASE_URL}/event-announcements`; 

export interface EventTabAnnouncementParams {
    eventId?: string;
    organizationId?: string;
}

export const getAllPublishedEventAnnouncements = async (filters: EventTabAnnouncementParams = {}) => {
    const queryString = await buildQueryString(
        filters as Record<string, unknown>
    );
    const response = await fetch(`${EVENT_ANNOUNCEMENTS_BASE_URL}${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Failed to fetch event announcements:", response.statusText);
    }

    const data = await response.json();
    return data;
}

export const getEventAnnouncementById = async (announcementId: string) => {
    const response = await fetch(`${EVENT_ANNOUNCEMENTS_BASE_URL}/${announcementId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        console.error("Failed to fetch event announcement:", response.statusText);
    }

    const data = await response.json();
    return data;
}
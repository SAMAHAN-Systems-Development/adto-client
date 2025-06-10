// filepath: /Users/miggy.alino/Desktop/Personal/adto-client/client/services/eventsService.ts
import { ADTO_SERVICE_BASE_URL } from "../config";
import { buildQueryString } from "./utils";

export const EVENTS_BASE_URL = `${ADTO_SERVICE_BASE_URL}/events`;

export interface EventQueryParams {
  page?: number;
  limit?: number;
  isRegistrationOpen?: boolean;
  isRegistrationRequired?: boolean;
  isOpenToOutsiders?: boolean;
  organizationId?: string;
  organizationParentId?: string;
  searchFilter?: string;
  orderBy?: "asc" | "desc";
}

export const getAllPublishedEvents = async (filters: EventQueryParams = {}) => {
  const queryString = await buildQueryString(
    filters as Record<string, unknown>
  );
  const response = await fetch(`${EVENTS_BASE_URL}/published${queryString}`, {
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
};

export const getEventbyId = async (eventId: string) => {
  const response = await fetch(`${EVENTS_BASE_URL}/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Failed to fetch event:", response.statusText);
  }

  const data = await response.json();
  return data;
};

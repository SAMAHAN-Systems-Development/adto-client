import { useQuery } from "@tanstack/react-query";
import {
  EventQueryParams,
  getEventbyId,
  getAllPublicEvents,
} from "../services/eventsService";

export const useGetEvents = (filters?: EventQueryParams) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: () => getAllPublicEvents(filters),
  });
};

export const useGetFeaturedEvents = () => {
  return useQuery({
    queryKey: ["featuredEvents"],
    queryFn: () => getAllPublicEvents({ limit: 10 }),
  });
};

export const useGetEventById = (eventId: string) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventbyId(eventId),
  });
};

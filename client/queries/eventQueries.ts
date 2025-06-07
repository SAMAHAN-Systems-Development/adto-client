// Tanstack Query for fetching events
import { useQuery } from "@tanstack/react-query";
import {
  EventQueryParams,
  getAllPublishedEvents,
} from "../services/eventsService";

export const useGetEvents = (filters?: EventQueryParams) => {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: () => getAllPublishedEvents(filters),
  });
};
export const useGetFeaturedEvents = () => {
  return useQuery({
    queryKey: ["featuredEvents"],
    queryFn: () => getAllPublishedEvents({ limit: 10 }),
  });
};

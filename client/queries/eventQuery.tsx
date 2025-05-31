"use client";
import { useQuery } from "@tanstack/react-query";
import { samahanEvents } from "../services/eventService";

export const useGetAllSamahanEventsById = (id: String) => {
  return useQuery({
    queryKey: ["samahanEvents", id],
    queryFn: () => samahanEvents(id),
  });
};

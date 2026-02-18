import { useQuery } from "@tanstack/react-query";
import {
    EventTabTicketParams,
    getAllPublishedEventTickets,
    getEventTicketById,
} from "../services/eventTabTicketService";

export const useGetEventTickets = (filters?: EventTabTicketParams) => {
    return useQuery({
        queryKey: ["eventTickets", filters],
        queryFn: () => getAllPublishedEventTickets(filters),
    });
};

export const useGetEventTicketById = (ticketId: string) => {
    return useQuery({
        queryKey: ["eventTicket", ticketId],
        queryFn: () => getEventTicketById(ticketId),
    });
};
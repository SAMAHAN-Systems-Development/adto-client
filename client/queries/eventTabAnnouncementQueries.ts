import { useQuery } from "@tanstack/react-query";
import {
    EventTabAnnouncementParams,
    getAllPublishedEventAnnouncements,
    getEventAnnouncementById,
} from "../services/eventTabAnnouncementService";

export const useGetEventAnnouncements = (filters?: EventTabAnnouncementParams) => {
    return useQuery({
        queryKey: ["eventAnnouncements", filters],
        queryFn: () => getAllPublishedEventAnnouncements(filters),
    });
};

export const useGetEventAnnouncementById = (announcementId: string) => {
    return useQuery({
        queryKey: ["eventAnnouncement", announcementId],
        queryFn: () => getEventAnnouncementById(announcementId),
    });
};
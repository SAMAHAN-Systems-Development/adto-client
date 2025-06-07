import { useQuery } from "@tanstack/react-query";
import {
  getAllOrganizationParents,
  getAllOrganizations,
} from "../services/organizationsService";

export const useGetOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: () => getAllOrganizations(),
  });
};

export const useGetOrganizationParents = () => {
  return useQuery({
    queryKey: ["allOrganizationParents"],
    queryFn: () => getAllOrganizationParents(),
  });
};

import { useQuery } from "@tanstack/react-query";
import {
  getAllOrganizationParents,
  getAllOrganizations,
  getOrganizationsByOrganizationParent,
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

export const useGetOrganizationsByOrganizationParent = (
  organizationParentId?: string,
) => {
  return useQuery({
    queryKey: ["organizationsByOrganizationParent", organizationParentId],
    queryFn: () =>
      getOrganizationsByOrganizationParent(organizationParentId as string),
    enabled: !!organizationParentId,
  });
};

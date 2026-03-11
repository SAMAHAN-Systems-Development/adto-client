import { ADTO_SERVICE_BASE_URL } from "../config";

export const getAllOrganizations = async () => {
  const response = await fetch(`${ADTO_SERVICE_BASE_URL}/organizations/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Failed to fetch organizations:", response.statusText);
  }

  const data = await response.json();
  return data;
};

export const getAllOrganizationParents = async () => {
  const response = await fetch(
    `${ADTO_SERVICE_BASE_URL}/organization-parents`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch organization parents:", response.statusText);
  }

  const data = await response.json();
  return data;
};

export const getOrganizationsByOrganizationParent = async (
  organizationParentId: string,
) => {
  const response = await fetch(
    `${ADTO_SERVICE_BASE_URL}/organizations/organizationParent/${organizationParentId}?page=1&limit=1000`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch organizations by organization parent:",
      response.statusText,
    );
  }

  const data = await response.json();
  return data;
};

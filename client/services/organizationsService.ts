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

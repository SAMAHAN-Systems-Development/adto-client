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
    throw new Error("Failed to fetch organizations");
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
    throw new Error("Failed to fetch organization parents");
  }

  const data = await response.json();
  return data;
};

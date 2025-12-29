import { ADTO_SERVICE_BASE_URL } from "../config";

export const REGISTRATION_BASE_URL = `${ADTO_SERVICE_BASE_URL}/registrations`;

export interface CreateRegistrationPayload {
  fullName: string;
  email: string;
  cluster: string;
  course: string;
  yearLevel: string;
  ticketCategoryId: string;
}

export interface RegistrationResponse {
  id: string;
  eventId: string;
  ticketCategoryId: string;
  confirmedAt?: Date;
  isAttended: boolean;
  message?: string;
}

export const createRegistration = async (
  payload: CreateRegistrationPayload
): Promise<RegistrationResponse> => {
  const response = await fetch(`${REGISTRATION_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to create registration: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
};

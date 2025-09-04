import { ADTO_SERVICE_BASE_URL } from "../../client/config";
import { ClientLoginRequest } from "../../client/types/dto/auth.type";

const AUTH_BASE_URL = `${ADTO_SERVICE_BASE_URL}/auth`;
export const loginClientUser = async (loginData: ClientLoginRequest) => {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};

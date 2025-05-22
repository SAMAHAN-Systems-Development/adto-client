import { BASE_URL } from "../config";

const SAMAHAN = "/organization";
const EVENT = "/events";

export const samahanEvents = async (id: String) => {
  const response = await fetch(`${BASE_URL}${EVENT}${SAMAHAN}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("You have failed me");
  }

  const data = await response.json();
  return data;
};

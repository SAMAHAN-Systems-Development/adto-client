import { useMutation } from "@tanstack/react-query";
import {
  createRegistration,
  CreateRegistrationPayload,
} from "../services/registrationService";

export const useCreateRegistration = () => {
  return useMutation({
    mutationFn: (payload: CreateRegistrationPayload) =>
      createRegistration(payload),
  });
};

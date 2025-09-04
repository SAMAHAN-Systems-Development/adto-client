import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { loginClientUser } from "../services/loginService";
import { ClientLoginRequest } from "../types/dto/auth.type";

export const useLoginClient = (
  mutationOptions: UseMutationOptions<
    unknown,
    Error,
    { loginData: ClientLoginRequest }
  >
) =>
  useMutation({
    mutationFn: ({ loginData }) => loginClientUser(loginData),
    ...mutationOptions,
  });

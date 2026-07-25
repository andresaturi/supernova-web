import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../api";

export function useCreateCompany() {
  return useMutation({
    mutationFn: createCompany,
  });
}

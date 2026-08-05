import { useMutation } from "@tanstack/react-query";

import { downloadProductionFile } from "../api/production";

export function useDownloadProduction() {
  return useMutation({
    mutationFn: (id: string) => downloadProductionFile(id),
  });
}
export const billingKeys = {
  all: ["billings"] as const,

  lists: () => [...billingKeys.all, "list"] as const,

  list: (status?: string) =>
    [...billingKeys.lists(), status] as const,

  details: () =>
    [...billingKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...billingKeys.details(), id] as const,
};
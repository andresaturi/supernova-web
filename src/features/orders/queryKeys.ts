export const orderKeys = {
  all: ["orders"] as const,

  lists: () =>
    [...orderKeys.all, "list"] as const,

  detail: (id: string) =>
    [...orderKeys.all, id] as const,
};
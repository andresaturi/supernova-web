export const pricingKeys = {
  all: ["pricing"] as const,

  tables: () => [...pricingKeys.all, "tables"] as const,

  table: (id: string) =>
    [...pricingKeys.tables(), id] as const,

  ranges: (tableId: string) =>
    [...pricingKeys.all, "ranges", tableId] as const,
};
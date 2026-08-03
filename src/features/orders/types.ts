export interface CustomerSummary {
  id: string;
  name: string;
}

export type OrderStatus =
  | "pending"
  | "production"
  | "finished"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;

  customer: CustomerSummary;

  status: OrderStatus;

  meters: number;

  total: number;

  notes?: string;

  created_at: string;
}

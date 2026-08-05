export type ProductionStatus =
  | "pending"
  | "ready_for_production"
  | "in_production"
  | "finished"
  | "delivered"
  | "canceled";

export interface ProductionCustomer {
  id: string;
  name: string;
}

export interface ProductionOrder {
  id: string;
  customer: ProductionCustomer;
  original_filename: string;
  meters: string;
  total: string;
  status: ProductionStatus;
  created_at: string;
}
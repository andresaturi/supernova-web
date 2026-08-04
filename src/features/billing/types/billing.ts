export type BillingStatus =
  | "pending"
  | "paid"
  | "overdue"
  | "cancelled";

export type PaymentMethod =
  | "pix"
  | "cash"
  | "credit_card"
  | "debit_card"
  | "bank_slip"
  | "transfer"
  | "other";

export interface Billing {
  id: string;

  number: number;

  sequence: number;

  installment: number;

  installments: number;

  customer: {
    id: string;
    name: string;
  };

  order: {
    id: string;
  } | null;

  due_date: string;

  amount: number;

  total: number;

  paid_amount: number;

  status: BillingStatus;

  payment_method: PaymentMethod;

  created_at: string;
}
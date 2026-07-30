export interface Customer {
  id: string;

  person_type: "PF" | "PJ";

  name: string;
  trade_name?: string;

  document: string;

  state_registration?: string;
  municipal_registration?: string;

  email: string;

  phone?: string;
  whatsapp?: string;

  preferred_contact:
    | "whatsapp"
    | "phone"
    | "email";

  default_payment_method:
    | "pix"
    | "cash"
    | "credit_card"
    | "debit_card"
    | "bank_slip"
    | "bank_transfer";

  origin?:
    | "manual"
    | "whatsapp"
    | "instagram"
    | "facebook"
    | "site"
    | "indication"
    | "import"
    | "api"
    | "other";

  contact_name?: string;

  notes?: string;

  is_active: boolean;

  price_table: {
    id: string;
    name: string;
  };

  created_at?: string;
  updated_at?: string;
}

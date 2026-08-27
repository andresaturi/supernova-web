export interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  stripe_price_id: string;
  active: boolean;
}

export interface Subscription {
  has_subscription: boolean;
  is_active: boolean;
  is_trialing: boolean;
  is_paid: boolean;
  is_canceled: boolean;

  status: string | null;

  plan: Plan | null;

  trial_start: string | null;
  trial_end: string | null;

  current_period_start: string | null;
  current_period_end: string | null;

  cancel_at_period_end: boolean;
}
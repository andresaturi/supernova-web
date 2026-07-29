export interface PriceTable {
  id: string;
  name: string;
  description: string;
  is_default: boolean;
  is_active: boolean;

  ranges_count: number;

  created_at: string;
  updated_at: string;
}

export interface PriceTableDetail extends Omit<PriceTable, "ranges_count"> {
  ranges: PriceRange[];
}

export interface PriceTableSimple {
  id: string;
  name: string;
}

export interface PriceRange {
  id: string;

  price_table: PriceTableSimple;

  start_meter: number;
  end_meter: number | null;

  price_per_meter: number;

  roll_width: number;

  minimum_price: number;

  margin: number;

  notes: string;

  position: number;

  created_at: string;
  updated_at: string;
}


export interface PriceRangeForm {
  id: string;

  start_meter: number;
  end_meter: number | null;

  price_per_meter: number;
  roll_width: number;
  minimum_price: number;
  margin: number;

  notes: string;
  position: number;
}

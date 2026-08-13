export interface DashboardSummary {
  total: number;
  pending: number;
  ready_for_production: number;
  in_production: number;
  finished: number;
  delivered: number;
  canceled: number;
}

export interface DashboardFinancial {
  total_billed: string;
  received: string;
  receivable: string;
  overdue: string;
}

export interface DashboardProduction {
  total_meters: string;
  meters_in_production: string;
  meters_finished: string;
}

export interface DashboardReceivedPoint {
  date: string;
  value: string;
}

export interface DashboardOrdersStatus {
  status: string;
  label: string;
  value: number;
}

export interface DashboardProductionPoint {
  date: string;
  meters: string;
}

export interface DashboardCharts {
  received_by_day: DashboardReceivedPoint[];
  orders_by_status: DashboardOrdersStatus[];
  production_by_day: DashboardProductionPoint[];
}

export interface Dashboard {
  summary: DashboardSummary;
  financial: DashboardFinancial;
  production: DashboardProduction;
  charts: DashboardCharts;
}
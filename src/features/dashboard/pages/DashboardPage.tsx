import { useState } from "react";
import { SummaryCards } from "../components/SummaryCards";
import { FinancialCards } from "../components/FinancialCards";
import { ReceivedChart } from "../components/ReceivedChart";
import { OrdersStatusChart } from "../components/OrdersStatusChart";
import { ProductionChart } from "../components/ProductionChart";
import { useDashboard } from "../hooks/useDashboard";
import type { DashboardPeriod } from "../services/dashboard";

import { Loading } from "../../../components/ui/Loading.tsx";

export function DashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriod>("30d");

  const {
    data,
    isLoading,
    isError,
  } = useDashboard(period);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Não foi possível carregar o dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Tente novamente em alguns instantes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Visão geral da sua empresa
          </p>
        </div>

        {/* Período */}
        <select
          value={period}
          onChange={(event) =>
            setPeriod(
              event.target.value as DashboardPeriod,
            )
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="month">Este mês</option>
        </select>
      </div>

      <SummaryCards summary={data.summary} />

      <FinancialCards financial={data.financial} />
      
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ReceivedChart
          data={data.charts.received_by_day}
        />

        <OrdersStatusChart
          data={data.charts.orders_by_status}
        />
      </div>

      <ProductionChart
        data={data.charts.production_by_day}
      />
    </div>
  );
}
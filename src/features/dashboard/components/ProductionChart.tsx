import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardProductionPoint } from "../types";
import { ChartEmptyState } from "./ChartEmptyState";

interface ProductionChartProps {
  data: DashboardProductionPoint[];
}

function formatDate(value: ReactNode) {
  if (typeof value !== "string") {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(`${value}T00:00:00`));
}

export function ProductionChart({
  data,
}: ProductionChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    meters: Number(item.meters),
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-900">
          Produção
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Metros finalizados por dia
        </p>
      </div>

      {data.length === 0 ? (
        <ChartEmptyState message="Nenhum pedido foi registrado neste período." />
      ) : (
        <div className="h-[320px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
              />

              <YAxis
                tickFormatter={(value) =>
                  `${value} m`
                }
              />

              <Tooltip
                formatter={(value) =>
                  `${Number(value).toFixed(2)} m`
                }
                labelFormatter={formatDate}
              />

              <Bar
                dataKey="meters"
                name="Metros"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )};
    </div>
  );
}
import type { ReactNode } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { DashboardReceivedPoint } from "../types";
import { ChartEmptyState } from "./ChartEmptyState";

interface ReceivedChartProps {
  data: DashboardReceivedPoint[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
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

export function ReceivedChart({
  data,
}: ReceivedChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    value: Number(item.value),
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-900">
          Recebimentos
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Valores recebidos por dia
        </p>
      </div>

      {data.length === 0 ? (
        <ChartEmptyState message="Nenhum recebimento foi registrado neste período." />
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
              />

              <YAxis
                tickFormatter={(value) =>
                  `R$ ${value}`
                }
              />

              <Tooltip
                formatter={(value) =>
                  formatCurrency(Number(value))
                }
                labelFormatter={formatDate}
              />

              <Line
                  type="monotone"
                  dataKey="value"
                  name="Recebido"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )};
    </div>
  );
}
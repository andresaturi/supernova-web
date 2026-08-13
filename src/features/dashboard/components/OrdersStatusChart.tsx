import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { DashboardOrdersStatus } from "../types";
import { ChartEmptyState } from "./ChartEmptyState";

interface OrdersStatusChartProps {
  data: DashboardOrdersStatus[];
}

export function OrdersStatusChart({
  data,
}: OrdersStatusChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    value: Number(item.value),
  }));

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const statusColors: Record<string, string> = {
    pending: "#f59e0b",
    ready_for_production: "#6366f1",
    in_production: "#3b82f6",
    finished: "#10b981",
    delivered: "#059669",
    canceled: "#ef4444",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Pedidos por status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Distribuição dos pedidos
        </p>
      </div>

      {data.length === 0 ? (
        <ChartEmptyState message="Nenhum pedido foi registrado neste período." />
      ) : (
      <>
        <div className="relative h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={2}
                labelLine={false}
              >
                {chartData.map((item) => (
                    <Cell
                      key={item.status}
                      fill={statusColors[item.status] ?? "#94a3b8"}
                    />
                  ))}
              </Pie>

              <Tooltip
                formatter={(value, _, item) => [
                  `${value} pedido(s)`,
                  item.payload.label,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">
                {total}
              </p>

              <p className="text-xs text-slate-500">
                pedidos
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {chartData.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-600">
                {item.label}
              </span>

              <span className="font-semibold text-slate-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </>
      )};
    </div>
  );
}
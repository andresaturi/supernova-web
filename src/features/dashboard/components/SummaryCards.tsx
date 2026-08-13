import {
  ClipboardList,
  Clock3,
  Factory,
  CheckCircle2,
} from "lucide-react";

import type { DashboardSummary } from "../types";

interface SummaryCardsProps {
  summary: DashboardSummary;
}

export function SummaryCards({
  summary,
}: SummaryCardsProps) {
  const cards = [
  {
    title: "Total de pedidos",
    value: summary.total,
    icon: ClipboardList,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Pendentes",
    value: summary.pending,
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "Em produção",
    value: summary.in_production,
    icon: Factory,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Finalizados",
    value: summary.finished,
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
];


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </p>
              </div>

              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.iconClass}`}>              
                <Icon size={22} />
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
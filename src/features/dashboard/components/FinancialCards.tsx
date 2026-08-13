import {
  CircleDollarSign,
  CreditCard,
  Wallet,
  TriangleAlert,
} from "lucide-react";

import type { DashboardFinancial } from "../types";

interface FinancialCardsProps {
  financial: DashboardFinancial;
}

function formatCurrency(value: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export function FinancialCards({
  financial,
}: FinancialCardsProps) {
  
const cards = [
  {
    title: "Faturado",
    value: financial.total_billed,
    icon: CircleDollarSign,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "Recebido",
    value: financial.received,
    icon: CreditCard,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "A receber",
    value: financial.receivable,
    icon: Wallet,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "Vencido",
    value: financial.overdue,
    icon: TriangleAlert,
    iconClass: "bg-red-50 text-red-600",
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

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {formatCurrency(card.value)}
                </p>
              </div>

              <div
                    className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.iconClass}`}
                    >
                    <Icon size={22} />
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
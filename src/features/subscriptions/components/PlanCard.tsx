import type { Plan } from "../types";

interface PlanCardProps {
  plan: Plan;
  onSubscribe: (plan: Plan) => void;
  loading?: boolean;
}

export function PlanCard({
  plan,
  onSubscribe,
  loading = false,
}: PlanCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(plan.price));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          {plan.name}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span className="text-3xl font-bold text-slate-900">
          {formattedPrice}
        </span>

        <span className="ml-1 text-sm text-slate-500">
          / mês
        </span>
      </div>

      <button
        type="button"
        onClick={() => onSubscribe(plan)}
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Aguarde..." : "Assinar plano"}
      </button>
    </div>
  );
}
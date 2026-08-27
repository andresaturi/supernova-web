import { useEffect, useState } from "react";

import { getPlans } from "../api/plans";
import { getMySubscription } from "../api/subscription";

import type { Plan, Subscription } from "../types";

import { PlanCard } from "../components/PlanCard";
import { createCheckout } from "../api/checkout";

export function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);
  const [subscribingPlanId, setSubscribingPlanId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [plansData, subscriptionData] =
          await Promise.all([
            getPlans(),
            getMySubscription(),
          ]);

        setPlans(plansData);
        setSubscription(subscriptionData);
      } catch (err) {
        console.error(err);
        setError(
          "Não foi possível carregar as informações da assinatura."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  async function handleSubscribe(plan: Plan) {
    try {
      setSubscribingPlanId(plan.id);      

      const { url } = await createCheckout(plan.id);

      window.location.href = url;
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
      setSubscribingPlanId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Carregando assinatura...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {error}
      </div>
    );
  }

  const hasActiveSubscription =
    subscription?.is_active === true;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Planos
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Gerencie o plano da sua empresa.
        </p>
      </div>

      {hasActiveSubscription && subscription.plan && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Seu plano atual
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {subscription.plan.name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {subscription.plan.description}
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              {subscription.is_trialing
                ? "Período de teste"
                : "Ativo"}
            </span>
          </div>

          {subscription.is_trialing &&
            subscription.trial_end && (
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">
                  Seu período de teste termina em:
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {new Date(
                    subscription.trial_end
                  ).toLocaleDateString("pt-BR")}
                </p>
              </div>
            )}
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          Planos disponíveis
        </h2>

        {plans.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm text-slate-500">
              Nenhum plano disponível no momento.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSubscribe={handleSubscribe}
                loading={subscribingPlanId === plan.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
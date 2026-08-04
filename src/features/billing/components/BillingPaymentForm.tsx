import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";

import {
  billingPaymentSchema,
  type BillingPaymentFormData,
} from "../validation";

import { useMarkBillingAsPaid } from "../hooks/useMarkBillingAsPaid";

import type { Billing } from "../types/billing";

interface Props {
  billing: Billing;
  onSuccess?: () => void;
}

const paymentMethods = [
  { value: "pix", label: "PIX" },
  { value: "cash", label: "Dinheiro" },
  { value: "credit_card", label: "Cartão de Crédito" },
  { value: "debit_card", label: "Cartão de Débito" },
  { value: "bank_slip", label: "Boleto" },
  { value: "transfer", label: "Transferência" },
  { value: "other", label: "Outro" },
];

export function BillingPaymentForm({
  billing,
  onSuccess,
}: Props) {
  const form = useForm<BillingPaymentFormData>({
    resolver: zodResolver(
      billingPaymentSchema
    ),

    defaultValues: {
      paid_amount: billing.total,
      payment_method:
        billing.payment_method || "pix",
      paid_at: new Date()
        .toISOString()
        .slice(0, 16),
    },
  });

  const receive =
    useMarkBillingAsPaid();

  function onSubmit(
    data: BillingPaymentFormData
  ) {
    receive.mutate(
      {
        id: billing.id,
        payload: data,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  }

  return (
    <form
      id="billing-payment-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FormInput
        form={form}
        name="paid_amount"
        label="Valor Recebido"
        type="number"
        step="0.01"
      />

      <FormSelect
        form={form}
        name="payment_method"
        label="Forma de Pagamento"
        options={paymentMethods}
      />

      <FormInput
        form={form}
        name="paid_at"
        label="Data/Hora"
        type="datetime-local"
      />
    </form>
  );
}
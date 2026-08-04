import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormSelect } from "@/components/forms/FormSelect";
import { FormInput } from "@/components/forms/FormInput";

import {
  billingSchema,
  type BillingFormData,
} from "../validation";

import { useCreateBilling } from "../hooks/useCreateBilling";

import { useCustomers } from "@/features/customers/hooks/useCustomers";

interface Props {
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

export function BillingForm({
  onSuccess,
}: Props) {
  const { data: customers = [] } =
    useCustomers();

  const customerOptions = useMemo(
    () =>
      customers.map((customer) => ({
        value: customer.id,
        label: customer.name,
      })),
    [customers]
  );

  const form = useForm<BillingFormData>({
    resolver: zodResolver(
      billingSchema
    ),

    defaultValues: {
      payment_method: "pix",
      installments: 1,
      first_due_date: new Date()
        .toISOString()
        .substring(0, 10),
      total: 0,
      notes: "",
    },
  });

  const createBilling =
    useCreateBilling();

  function onSubmit(
    data: BillingFormData
  ) {
    createBilling.mutate(data, {
      onSuccess: () => {
        form.reset();

        onSuccess?.();
      },
    });
  }

  return (
    <form
      id="billing-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 gap-5"
    >
      <FormSelect
        form={form}
        name="customer_id"
        label="Cliente"
        options={customerOptions}
      />

      <FormInput
        form={form}
        name="total"
        label="Valor"
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
        name="installments"
        label="Parcelas"
        type="number"
      />

      <FormInput
        form={form}
        name="first_due_date"
        label="Primeiro Vencimento"
        type="date"
      />

      <div className="md:col-span-2">
        <FormInput
          form={form}
          name="notes"
          label="Observações"
        />
      </div>
    </form>
  );
}
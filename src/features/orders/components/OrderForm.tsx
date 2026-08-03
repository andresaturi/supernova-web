import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";

import { useCustomers } from "@/features/customers/hooks/useCustomers";

import { useCreateOrder } from "../hooks/useCreateOrder";
import { useOrder } from "../hooks/useOrder";
import { useUpdateOrder } from "../hooks/useUpdateOrder";

import {
  orderSchema,
  type OrderFormData,
} from "../validation";

interface Props {
  orderId?: string;
  onSuccess?: () => void;
}

export function OrderForm({
  orderId,
  onSuccess,
}: Props) {
  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),

    defaultValues: {
      customer_id: "",
      notes: "",
      file: undefined,
    },
  });

  const { data: customers } = useCustomers();
  const { data: order } = useOrder(orderId);

  const createOrder = useCreateOrder({
    onSuccess,
  });

  const updateOrder = useUpdateOrder({
    onSuccess,
  });

  useEffect(() => {
    if (!order) return;

    form.reset({
      customer_id: order.customer.id,
      notes: order.notes ?? "",
    });
  }, [order, form]);

  function onSubmit(data: OrderFormData) {
    if (orderId) {
      updateOrder.mutate({
        id: orderId,
        payload: {
          notes: data.notes,
        },
      });

      return;
    }

    createOrder.mutate(data);
  }

  return (
    <form
      id="order-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-4">
        <FormSelect
          form={form}
          name="customer_id"
          label="Cliente"
          options={
            (customers ?? []).map((customer) => ({
              value: customer.id,
              label: customer.name,
            }))
          }
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Arquivo
          </label>

          <input
            type="file"
            accept="image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                form.setValue("file", file, {
                  shouldValidate: true,
                });
              }
            }}
          />

          {form.formState.errors.file && (
            <p className="text-sm text-destructive">
              {form.formState.errors.file.message}
            </p>
          )}
        </div>

        <FormInput
          form={form}
          name="notes"
          label="Observações"
        />
      </div>

      <div className="hidden">
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}

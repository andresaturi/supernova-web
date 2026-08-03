import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormSelect } from "@/components/forms/FormSelect";

import {
  orderStatusSchema,
  type OrderStatusFormData,
} from "../validation";

import { useChangeOrderStatus } from "../hooks/useChangeOrderStatus";

interface Props {
  orderId: string;
  currentStatus: string;
  onSuccess?: () => void;
}

const statusOptions = [
  {
    value: "pending",
    label: "Pendente",
  },
  {
    value: "production",
    label: "Em produção",
  },
  {
    value: "finished",
    label: "Finalizado",
  },
  {
    value: "delivered",
    label: "Entregue",
  },
  {
    value: "cancelled",
    label: "Cancelado",
  },
];

export function OrderStatusForm({
  orderId,
  currentStatus,
  onSuccess,
}: Props) {
  const form = useForm<OrderStatusFormData>({
    resolver: zodResolver(orderStatusSchema),

    defaultValues: {
      status: currentStatus,
    },
  });

  const changeStatus = useChangeOrderStatus({
    onSuccess,
  });

  useEffect(() => {
    form.reset({
      status: currentStatus,
    });
  }, [currentStatus, form]);

  function onSubmit(
    data: OrderStatusFormData
  ) {
    changeStatus.mutate({
      id: orderId,
      status: data.status,
    });
  }

  return (
    <form
      id="order-status-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FormSelect
        form={form}
        name="status"
        label="Status"
        options={statusOptions}
      />
    </form>
  );
}
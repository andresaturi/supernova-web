import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePriceTables } from "@/features/pricing/hooks/usePriceTables";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";

import {
  customerSchema,
  type CustomerFormData,
} from "../validation";

import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { useUpdateCustomer } from "../hooks/useUpdateCustomer";
import type { Customer } from "../types";

interface CustomerFormProps {
  customer?: Customer;
  onSuccess?: () => void;
}

export function CustomerForm({
  customer,
  onSuccess,
}: CustomerFormProps) {
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),

    defaultValues: {
      person_type: "PF",
      name: "",
      trade_name: "",
      document: "",
      email: "",
      phone: "",
      whatsapp: "",
      price_table_id: "",

      preferred_contact: "whatsapp",
      default_payment_method: "pix",
      origin: "manual",

      state_registration: "",
      municipal_registration: "",
      contact_name: "",
      notes: "",

      is_active: true,
    },
  });

  const createCustomer = useCreateCustomer({
    onSuccess,
  });
  const updateCustomer = useUpdateCustomer({
    onSuccess,
  });

  const { data: priceTables } = usePriceTables();

  function onSubmit(data: CustomerFormData) {
    if (customer) {
      updateCustomer.mutate({
        id: customer.id,
        payload: data,
      });
    } else {
      createCustomer.mutate(data);
    }
  }

  useEffect(() => {
    if (!customer) return;

    form.reset({
      person_type: customer.person_type,
      name: customer.name,
      trade_name: customer.trade_name ?? "",
      document: customer.document,
      email: customer.email ?? "",
      phone: customer.phone ?? "",
      whatsapp: customer.whatsapp ?? "",
      preferred_contact: customer.preferred_contact,
      default_payment_method: customer.default_payment_method,
      origin: customer.origin ?? "manual",
      state_registration: customer.state_registration ?? "",
      municipal_registration: customer.municipal_registration ?? "",
      contact_name: customer.contact_name ?? "",
      notes: customer.notes ?? "",
      price_table_id: customer.price_table.id,
      is_active: customer.is_active,
    });
  }, [customer, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <FormSelect
          form={form}
          name="person_type"
          label="Tipo"
          options={[
            {
              value: "PF",
              label: "Pessoa Física",
            },
            {
              value: "PJ",
              label: "Pessoa Jurídica",
            },
          ]}
        />

        <FormInput
          form={form}
          name="document"
          label="CPF/CNPJ"
        />

        <FormInput
          form={form}
          name="name"
          label="Nome"
        />

        <FormInput
          form={form}
          name="trade_name"
          label="Nome Fantasia"
        />

        <FormInput
          form={form}
          name="email"
          label="E-mail"
          type="email"
        />

        <FormInput
          form={form}
          name="phone"
          label="Telefone"
        />

        <FormInput
          form={form}
          name="whatsapp"
          label="WhatsApp"
        />

        <FormSelect
          form={form}
          name="price_table_id"
          label="Tabela de preço"
          options={
            (priceTables ?? []).map((table) => ({
              value: table.id,
              label: table.name,
            }))
          }
        />

      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={createCustomer.isPending || updateCustomer.isPending}
        >
          {createCustomer.isPending || updateCustomer.isPending
            ? "Salvando..."
            : customer
              ? "Salvar alterações"
              : "Salvar Cliente"}
        </Button>
      </div>
    </form>
  );
}

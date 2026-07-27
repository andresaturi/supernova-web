import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";

import {
  customerSchema,
  type CustomerFormData,
} from "../validation";

import { useCreateCustomer } from "../hooks/useCreateCustomer";

interface CustomerFormProps {
  onSuccess?: () => void;
}

export function CustomerForm({
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

  function onSubmit(data: CustomerFormData) {
    createCustomer.mutate(data);
  }

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

      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={createCustomer.isPending}
        >
          {createCustomer.isPending
            ? "Salvando..."
            : "Salvar Cliente"}
        </Button>
      </div>
    </form>
  );
}
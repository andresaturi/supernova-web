import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export function OrderForm({
  orderId,
  onSuccess,
  onSubmittingChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),

    defaultValues: {
      customer_id: "",
      notes: "",
      file: undefined,
      paid: false,
      payment_method: undefined,
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

  const isSubmitting =
    createOrder.isPending || updateOrder.isPending;

  const isPaid = form.watch("paid");
  const selectedCustomerId = form.watch("customer_id");

  useEffect(() => {
    onSubmittingChange?.(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  useEffect(() => {
    if (!order) return;

    form.reset({
      customer_id: order.customer.id,
      notes: order.notes ?? "",
      paid: false,
      payment_method: undefined,
    });

    setCustomerSearch(order.customer.name);
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

  function handleCustomerSearch(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setCustomerSearch(event.target.value);

    // Se o usuário alterar o texto depois de selecionar,
    // limpamos o cliente selecionado.
    if (selectedCustomerId) {
      form.setValue("customer_id", "", {
        shouldValidate: true,
      });
    }
  }

  function selectCustomer(
    customerId: string,
    customerName: string,
  ) {
    form.setValue("customer_id", customerId, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setCustomerSearch(customerName);
  }

  function clearCustomer() {
    form.setValue("customer_id", "", {
      shouldValidate: true,
    });

    setCustomerSearch("");
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    form.setValue("file", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  function removeFile() {
    setSelectedFile(null);

    form.setValue("file", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function formatFileSize(size: number) {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  const filteredCustomers = useMemo(() => {
    const search = customerSearch.trim().toLowerCase();

    if (!search) {
      return customers ?? [];
    }

    return (customers ?? []).filter((customer) =>
      customer.name.toLowerCase().includes(search)
    );
  }, [customers, customerSearch]);

  const selectedCustomer = useMemo(() => {
    return (customers ?? []).find(
      (customer) => customer.id === selectedCustomerId,
    );
  }, [customers, selectedCustomerId]);

  return (
    <form
      id="order-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* CLIENTE */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">
            Cliente
          </label>

          <p className="text-xs text-muted-foreground">
            Pesquise pelo nome do cliente.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={customerSearch}
            onChange={handleCustomerSearch}
            placeholder="Digite o nome do cliente..."
            className="pl-9 pr-10"
          />

          {customerSearch && (
            <button
              type="button"
              onClick={clearCustomer}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {selectedCustomer ? (
          <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10">
                <Check className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  {selectedCustomer.name}
                </p>

                {selectedCustomer.document && (
                  <p className="text-xs text-muted-foreground">
                    {selectedCustomer.document}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearCustomer}
            >
              Alterar
            </Button>
          </div>
        ) : (
          <div className="max-h-52 overflow-y-auto rounded-lg border">
            {filteredCustomers.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Nenhum cliente encontrado.
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onClick={() =>
                    selectCustomer(
                      customer.id,
                      customer.name,
                    )
                  }
                  className="flex w-full items-center justify-between border-b px-4 py-3 text-left transition last:border-b-0 hover:bg-muted"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {customer.name}
                    </p>

                    {customer.document && (
                      <p className="text-xs text-muted-foreground">
                        {customer.document}
                      </p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {form.formState.errors.customer_id && (
          <p className="text-sm text-destructive">
            {form.formState.errors.customer_id.message}
          </p>
        )}
      </div>

      {/* ARQUIVO */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">
            Arquivo para impressão
          </label>

          <p className="text-xs text-muted-foreground">
            Envie uma imagem ou PDF para produção.
          </p>
        </div>

        {!selectedFile ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 text-center transition hover:border-primary/50 hover:bg-primary/[0.02]"
          >
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 transition group-hover:scale-105">
              <Upload className="size-6 text-primary" />
            </div>

            <p className="text-sm font-medium">
              Clique para selecionar o arquivo
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG ou PDF
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              O arquivo será enviado junto com o pedido.
            </p>
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background">
                {selectedFile.type === "application/pdf" ? (
                  <FileText className="size-5 text-destructive" />
                ) : (
                  <ImageIcon className="size-5 text-primary" />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={removeFile}
              title="Remover arquivo"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/png,image/jpeg,application/pdf,.png,.jpg,.jpeg,.pdf"
          onChange={handleFileChange}
        />

        {form.formState.errors.file && (
          <p className="text-sm text-destructive">
            {form.formState.errors.file.message}
          </p>
        )}
      </div>

      {/* PAGAMENTO */}
      <div className="rounded-xl border p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...form.register("paid")}
            className="mt-0.5 size-4 rounded border-gray-300"
          />

          <div>
            <p className="text-sm font-medium">
              Pedido já foi pago
            </p>

            <p className="text-xs text-muted-foreground">
              A fatura será criada automaticamente como paga.
            </p>
          </div>
        </label>

        {isPaid && (
          <div className="mt-4 border-t pt-4">
            <FormSelect
              form={form}
              name="payment_method"
              label="Forma de pagamento"
              options={[
                {
                  value: "pix",
                  label: "PIX",
                },
                {
                  value: "cash",
                  label: "Dinheiro",
                },
                {
                  value: "credit_card",
                  label: "Cartão de crédito",
                },
                {
                  value: "debit_card",
                  label: "Cartão de débito",
                },
                {
                  value: "bank_slip",
                  label: "Boleto",
                },
                {
                  value: "bank_transfer",
                  label: "Transferência bancária",
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* OBSERVAÇÕES */}
      <FormInput
        form={form}
        name="notes"
        label="Observações"
        placeholder="Alguma observação sobre este pedido..."
      />

      <div className="hidden">
        <Button type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
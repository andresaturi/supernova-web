import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { PriceRangeTable } from "./PriceRangeTable";

import {
  priceTableSchema,
  type PriceTableCreatePayload,
  type PriceTableForm,
} from "../schemas/pricing.schema";

import type { PriceRangeForm } from "../types/pricing";

import { usePriceTable } from "../hooks/usePriceTable";
import { useCreatePriceTable } from "../hooks/useCreatePriceTable";
import { useUpdatePriceTable } from "../hooks/useUpdatePriceTable";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange(open: boolean): void;
  tableId?: string;
}

export function PriceTableModal({ open, onOpenChange, tableId }: Props) {
  const form = useForm<PriceTableForm>({
    resolver: zodResolver(priceTableSchema),
    defaultValues: {
      name: "",
      description: "",
      roll_width: 60,
      safety_margin: 5,
      is_active: true,
      is_default: false,
    },
  });

  const { data, isLoading } = usePriceTable(tableId);
  const createPriceTable = useCreatePriceTable();
  const updatePriceTable = useUpdatePriceTable();
  const [ranges, setRanges] = useState<PriceRangeForm[]>([]);
  const isSubmitting = createPriceTable.isPending || updatePriceTable.isPending;

  useEffect(() => {
    if (!tableId) {
      form.reset({
        name: "",
        description: "",
        roll_width: 60,
        safety_margin: 5,
        is_active: true,
        is_default: false,
      });

      setRanges([]);
      return;
    }

    if (!data) return;

    form.reset({
      name: data.name,
      description: data.description,
      roll_width: data.roll_width,
      safety_margin: data.safety_margin,
      is_active: data.is_active,
      is_default: data.is_default,
    });

    setRanges(data.ranges);
  }, [tableId, data, form]);

  const onSubmit = (formData: PriceTableForm) => {
  if (ranges.length === 0) {
    toast.error("Adicione pelo menos uma faixa de preço.");
    return;
  }

  const payload: PriceTableCreatePayload = {
    ...formData,
      ranges,
    };

    if (tableId) {
      updatePriceTable.mutate({
        id: tableId,
        payload,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    } else {
      createPriceTable.mutate(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 
        Ajuste de Largura:
        - max-w-6xl (largura máx de 1152px)
        - w-[92vw] para se adaptar confortavelmente em telas intermediárias
      */}
      <DialogContent className="w-[97vw] max-w-[1440px] sm:max-w-[1440px] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header Fixo */}
        <DialogHeader className="px-8 pt-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {tableId ? "Editar tabela de preços" : "Nova tabela de preços"}
          </DialogTitle>
          <DialogDescription>
            Configure as informações e os intervalos de preços para esta tabela.
          </DialogDescription>
        </DialogHeader>

        {/* Conteúdo com Scroll */}
        {isLoading && tableId ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Carregando dados da tabela...</span>
          </div>
        ) : (
          <form
            id="price-table-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto px-8 py-6 space-y-6"
          >
            {/* Campos Principais em Grid Horizontal quando há espaço */}
            <div className="grid md:grid-cols-12 gap-6">

  {/* Nome */}
  <div className="md:col-span-4 space-y-2">
    <Label htmlFor="name">Nome da Tabela</Label>

    <Input
      id="name"
      placeholder="Ex: DTF 60cm"
      {...form.register("name")}
    />

    {form.formState.errors.name && (
      <p className="text-xs text-destructive">
        {form.formState.errors.name.message}
      </p>
    )}
  </div>

  {/* Largura do rolo */}
  <div className="md:col-span-2 space-y-2">
    <Label htmlFor="roll_width">
      Largura do rolo (cm)
    </Label>

    <Input
      id="roll_width"
      type="number"
      step="0.01"
      {...form.register("roll_width", {
        valueAsNumber: true,
      })}
    />

    {form.formState.errors.roll_width && (
      <p className="text-xs text-destructive">
        {form.formState.errors.roll_width.message}
      </p>
    )}
  </div>

  {/* Margem */}
  <div className="md:col-span-2 space-y-2">
    <Label htmlFor="safety_margin">
      Margem de segurança (%)
    </Label>

    <Input
      id="safety_margin"
      type="number"
      step="0.1"
      {...form.register("safety_margin", {
        valueAsNumber: true,
      })}
    />

    {form.formState.errors.safety_margin && (
      <p className="text-xs text-destructive">
        {form.formState.errors.safety_margin.message}
      </p>
    )}
  </div>

  {/* Descrição */}
  <div className="md:col-span-4 space-y-2">
    <Label htmlFor="description">
      Descrição
    </Label>

    <Textarea
      id="description"
      className="resize-none h-[42px] min-h-[42px]"
      placeholder="Observações da tabela..."
      {...form.register("description")}
    />

    {form.formState.errors.description && (
      <p className="text-xs text-destructive">
        {form.formState.errors.description.message}
      </p>
    )}
  </div>

</div>

            {/* Opções / Switches em Grid Aconchegante */}
            <div className="grid sm:grid-cols-2 gap-6 p-4 rounded-lg border bg-muted/30">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label htmlFor="is_active" className="cursor-pointer">
                    Tabela Ativa
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Define se esta tabela pode ser utilizada no sistema.
                  </p>
                </div>
                <Switch
                  id="is_active"
                  checked={form.watch("is_active")}
                  onCheckedChange={(checked) =>
                    form.setValue("is_active", checked, { shouldValidate: true })
                  }
                />
              </div>

              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-0.5">
                  <Label htmlFor="is_default" className="cursor-pointer">
                    Tabela Padrão
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Aplica esta tabela automaticamente a novos cadastros.
                  </p>
                </div>
                <Switch
                  id="is_default"
                  checked={form.watch("is_default")}
                  onCheckedChange={(checked) =>
                    form.setValue("is_default", checked, { shouldValidate: true })
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Tabela de Faixas de Preço ampla */}
            <PriceRangeTable ranges={ranges} onChange={setRanges} />
          </form>
        )}

        {/* Footer Fixo */}
        <DialogFooter className="px-8 py-8 border-t bg-muted/10 gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="price-table-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : tableId ? (
              "Salvar alterações"
            ) : (
              "Criar tabela"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Plus, Trash2, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { PriceRangeForm } from "../types/pricing";

interface Props {
  ranges: PriceRangeForm[];
  onChange(ranges: PriceRangeForm[]): void;
}

export function PriceRangeTable({ ranges, onChange }: Props) {
  
  function handleAddRange() {
    onChange([
      ...ranges,
      {
        id: crypto.randomUUID(),
        start_meter: 0,
        end_meter: null,
        price_per_meter: 0,        
        minimum_price: 0,
        margin: 0,
        notes: "",
        position: ranges.length,
      },
    ]);
  }

  function updateRange(
    index: number,
    field: keyof PriceRangeForm,
    value: PriceRangeForm[keyof PriceRangeForm]
  ) {
    const next = [...ranges];
    next[index] = {
      ...next[index],
      [field]: value,
    };

    onChange(next);
  }

  function handleRemoveRange(id: string) {
    onChange(ranges.filter((range) => range.id !== id));
  }

  return (
    <div className="space-y-3">
      {/* Header da Tabela */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Intervalos e Preços
          </h3>
          <p className="text-xs text-muted-foreground">
            Defina os limites de metragem e as regras de cobrança para cada faixa.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={handleAddRange}
          className="h-8 text-xs font-medium gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Adicionar faixa
        </Button>
      </div>

      {/* Container Tabela */}
      <div className="rounded-md border bg-background overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 text-xs">
              <TableHead className="w-[110px]">Início (m)</TableHead>
              <TableHead className="w-[110px]">Fim (m)</TableHead>
              <TableHead className="w-[130px]">Preço / m</TableHead>              
              <TableHead className="w-[130px]">Preço Mínimo</TableHead>              
              <TableHead className="w-[50px] text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ranges.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Layers className="h-8 w-8 text-muted-foreground/40" />
                    <p className="text-xs font-medium">
                      Nenhuma faixa de preço cadastrada.
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleAddRange}
                      className="h-7 text-xs text-primary"
                    >
                      + Criar primeira faixa
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              ranges.map((range, index) => (
                <TableRow key={range.id} className="hover:bg-muted/30">
                  {/* Início (m) */}
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      step="0.01"
                      className="h-8 text-xs font-mono"
                      value={range.start_meter}
                      onChange={(e) =>
                        updateRange(
                          index,
                          "start_meter",
                          e.target.value === "" ? 0 : Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>

                  {/* Fim (m) */}
                  <TableCell className="p-2">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="∞"
                      className="h-8 text-xs font-mono"
                      value={range.end_meter ?? ""}
                      onChange={(e) =>
                        updateRange(
                          index,
                          "end_meter",
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>

                  {/* Preço por metro */}
                  <TableCell className="p-2">
                    <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-xs text-muted-foreground pointer-events-none">
                        R$
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        className="h-8 text-xs font-mono pl-8"
                        value={range.price_per_meter}
                        onChange={(e) =>
                          updateRange(
                            index,
                            "price_per_meter",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </TableCell>                  

                  {/* Preço Mínimo */}
                  <TableCell className="p-2">
                    <div className="relative flex items-center">
                      <span className="absolute left-2.5 text-xs text-muted-foreground pointer-events-none">
                        R$
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        className="h-8 text-xs font-mono pl-8"
                        value={range.minimum_price}
                        onChange={(e) =>
                          updateRange(
                            index,
                            "minimum_price",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </TableCell>                  

                  {/* Botão Remover */}
                  <TableCell className="p-2 text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveRange(range.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remover faixa</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

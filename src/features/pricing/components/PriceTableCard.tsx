import { MoreVertical, Pencil, Star, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { PriceTable } from "../types/pricing";

interface Props {
  table: PriceTable;
  onEdit(): void;
}

export function PriceTableCard({ table, onEdit }: Props) {
  return (
    <Card className="group relative flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-muted-foreground/30">
      <div>
        {/* Header do Card */}
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1.5 pr-2">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base font-semibold leading-none tracking-tight">
                {table.name}
              </CardTitle>

              {table.is_default && (
                <Badge
                  variant="outline"
                  className="gap-1 border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-medium text-[11px] py-0 px-1.5 h-5"
                >
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  Padrão
                </Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] leading-relaxed">
              {table.description || "Sem descrição informada."}
            </p>
          </div>

          {/* Menu de Ações Secundárias */}
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Abrir opções</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        {/* Conteúdo Principal / Estatísticas */}
        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg border bg-muted/30 text-xs">
            {/* Faixas de preço */}
            <div className="flex flex-col gap-0.5 border-r pr-2">
              <span className="text-muted-foreground font-medium flex items-center gap-1">
                <Layers className="h-3 w-3" />
                Faixas
              </span>
              <span className="text-sm font-semibold text-foreground">
                {table.ranges_count ?? 0}
              </span>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-0.5 pl-1">
              <span className="text-muted-foreground font-medium">Status</span>
              <div className="flex items-center gap-1.5 pt-0.5">
                <span
                  className={`h-2 w-2 rounded-full ${
                    table.is_active ? "bg-emerald-500" : "bg-muted-foreground/40"
                  }`}
                />
                <span className="font-semibold text-foreground text-xs">
                  {table.is_active ? "Ativa" : "Inativa"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Footer / Ação Principal */}
      <CardFooter className="pt-0">
        <Button
          className="w-full h-9 text-xs font-medium"
          variant="outline"
          onClick={onEdit}
        >
          <Pencil className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
          Editar tabela
        </Button>
      </CardFooter>
    </Card>
  );
}
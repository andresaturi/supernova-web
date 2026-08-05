import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Printer,
  XCircle,
} from "lucide-react";

export const ORDER_STATUS = [
  {
    value: "pending",
    label: "Pendente",
    icon: Clock3,
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100",
  },
  {
    value: "ready_for_production",
    label: "Pronto para Produção",
    icon: Printer,
    className:
      "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-100",
  },
  {
    value: "in_production",
    label: "Em Produção",
    icon: Printer,
    className:
      "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-100",
  },
  {
    value: "finished",
    label: "Finalizado",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-800 border-green-300 hover:bg-green-100",
  },
  {
    value: "delivered",
    label: "Entregue",
    icon: PackageCheck,
    className:
      "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-100",
  },
  {
    value: "canceled",
    label: "Cancelado",
    icon: XCircle,
    className:
      "bg-red-100 text-red-800 border-red-300 hover:bg-red-100",
  },
] as const;
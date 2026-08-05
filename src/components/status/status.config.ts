import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Printer,
  XCircle,
} from "lucide-react";

export const STATUS_CONFIG = {
  pending: {
    label: "Pendente",
    icon: Clock3,
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-100",
  },

  in_production: {
    label: "Em Produção",
    icon: Printer,
    className:
      "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-100",
  },

  finished: {
    label: "Finalizado",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-800 border-green-300 hover:bg-green-100",
  },

  delivered: {
    label: "Entregue",
    icon: PackageCheck,
    className:
      "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-100",
  },

  canceled: {
    label: "Cancelado",
    icon: XCircle,
    className:
      "bg-red-100 text-red-800 border-red-300 hover:bg-red-100",
  },
} as const;
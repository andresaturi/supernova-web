import { Badge } from "@/components/ui/badge";

import { ORDER_STATUS } from "@/constants/order-status";

interface Props {
  status: string;
}

export function StatusBadge({ status }: Props) {
  const config =
    ORDER_STATUS.find((s) => s.value === status);

  if (!config) {
    return (
      <Badge variant="outline">
        {status}
      </Badge>
    );
  }

  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={config.className}
    >
      <Icon className="mr-1 h-3.5 w-3.5" />

      {config.label}
    </Badge>
  );
}
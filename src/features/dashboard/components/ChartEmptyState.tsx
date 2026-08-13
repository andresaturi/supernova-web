interface ChartEmptyStateProps {
  message?: string;
}

export function ChartEmptyState({
  message = "Não há dados para exibir neste período.",
}: ChartEmptyStateProps) {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <span className="text-xl text-slate-400">
            —
          </span>
        </div>

        <p className="mt-3 text-sm font-medium text-slate-600">
          Nenhum dado disponível
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}
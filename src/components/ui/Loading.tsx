import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({
  text = "Carregando...",
  fullScreen = false,
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      {text && (
        <span className="text-sm text-muted-foreground">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
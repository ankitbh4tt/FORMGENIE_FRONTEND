import { Loader2 } from "lucide-react";
import { Wordmark } from "@/components/common/Logo";

export const LoadingScreen2 = () => {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-5 bg-bg">
      <Wordmark />
      <Loader2 className="size-5 animate-spin text-ink-faint" />
      <p className="text-sm text-ink-faint">Getting things ready…</p>
    </div>
  );
};

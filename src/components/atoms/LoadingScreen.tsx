import { Loader2 } from "lucide-react";

export const LoadingScreen2 = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/30 to-purple-50/30">
      <div className="absolute h-72 w-72 rounded-full bg-violet-300/15 blur-3xl animate-pulse top-1/4 left-1/4"></div>
      <div className="absolute h-60 w-60 rounded-full bg-purple-300/15 blur-3xl animate-pulse delay-200 top-1/3 right-1/3"></div>

      <div className="z-10 flex flex-col items-center gap-4">
        <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          FormGenie
        </div>
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
        <p className="text-sm text-slate-500">Getting things ready for you...</p>
      </div>
    </div>
  );
};
  
import { Skeleton } from "./skeleton";

const FormSkeleton = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}

      <div className="flex gap-3 border-t border-border pt-6">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>

      <p className="text-center text-[13px] text-ink-faint">Composing your form…</p>
    </div>
  );
};

export default FormSkeleton;

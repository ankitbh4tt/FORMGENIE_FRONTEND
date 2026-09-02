import { Skeleton } from "./skeleton";

/** The shape of a form while it loads, so nothing shifts when it arrives. */
const FormSkeleton = ({ fields = 3 }: { fields?: number }) => {
  return (
    <div className="flex flex-col gap-7" aria-hidden="true">
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
      <Skeleton className="h-12 w-full" />
    </div>
  );
};

export default FormSkeleton;

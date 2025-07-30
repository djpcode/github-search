import type { PropsWithChildren } from "react";

export default function Filters({ children }: PropsWithChildren) {
  return (
    <div className="my-3">
      <h3 className="text-left text-lg font-semibold mb-4">Filters</h3>
      <div className="flex flex-row gap-6">
        {children}
      </div>
    </div>
  );
}

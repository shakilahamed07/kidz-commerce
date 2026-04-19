import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="min-w-80">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200 p-4">
        <div className="skeleton h-52 w-full rounded-xl"></div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="skeleton h-6 w-full"></div>
          <div className="skeleton h-6 w-3/4"></div>

          <div className="flex justify-between mt-2">
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-16"></div>
          </div>

          <div className="skeleton h-8 w-1/3 mt-2"></div>

          <div className="flex gap-3 mt-4">
            <div className="skeleton h-10 flex-1 rounded-lg"></div>
            <div className="skeleton h-10 flex-1 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export function Grid({ children, columns = 3, className = "" }: Readonly<GridProps>) {
  return (
    <div
      className={`grid gap-6 md:gap-8 ${columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
        } ${className}`}
    >
      {children}
    </div>
  );
}

export function Stack({ children, gap = 4, className = "" }: Readonly<{ children: React.ReactNode; gap?: number; className?: string }>) {
  return <div className={`flex flex-col gap-${gap} ${className} h-full`}>{children}</div>;
}

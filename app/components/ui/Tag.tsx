import React from "react";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-xs md:text-sm font-sans text-white/80 whitespace-nowrap">
      {children}
    </span>
  );
}

import React from "react";
import { Heading } from "../ui/Typography";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  className?: string;
}

export function Section({ children, id, title, className = "" }: Readonly<SectionProps>) {
  return (
    <section id={id} className={`py-16 md:py-24 border-t border-white/10 w-full ${className}`}>
      {title && (
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-[1px] bg-white/20" />
          <Heading as="h2" className="text-white brightness-110 !leading-none">{title}</Heading>
        </div>
      )}
      {children}
    </section>
  );
}

export function PageContainer({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="max-w-6xl mx-auto px-6 md:px-12">{children}</div>;
}

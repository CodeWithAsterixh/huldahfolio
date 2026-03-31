import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function Heading({ children, className = "", as: Component = "h2" }: Readonly<TypographyProps>) {
  const styles = {
    h1: "text-6xl md:text-8xl font-serif leading-[1.1] uppercase break-words",
    h2: "text-4xl md:text-5xl font-serif leading-tight break-words",
    h3: "text-2xl md:text-3xl font-serif break-words",
    h4: "text-xl font-serif break-words",
    p: "",
    span: "",
  };

  return <Component className={`${styles[Component]} ${className}`}>{children}</Component>;
}

export function Text({ children, className = "", as: Component = "p" }: Readonly<TypographyProps>) {
  return (
    <Component className={`text-base md:text-lg font-sans text-white/70 leading-relaxed ${className}`}>
      {children}
    </Component>
  );
}

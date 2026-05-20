

import type { HTMLAttributes, ReactNode } from "react";

const cardVariants = {
  default: "bg-white border border-gray-100 shadow-sm",
  elevated: "bg-white shadow-xl shadow-gray-100",
  outlined: "bg-white border-2 border-orange-200",
  filled: "bg-orange-50 border border-orange-100",
};

const badgeColors = {
  orange: "bg-orange-100 text-orange-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-600",
  gray: "bg-gray-100 text-gray-600",
};

type CardVariant = keyof typeof cardVariants;
type CardBadgeColor = keyof typeof badgeColors;

interface BaseCardSectionProps {
  children?: ReactNode;
  className?: string;
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: CardVariant;
  hoverable?: boolean;
  clickable?: boolean;
}

interface CardHeaderProps extends BaseCardSectionProps {
  withBorder?: boolean;
}

interface CardFooterProps extends BaseCardSectionProps {
  withBorder?: boolean;
}

interface CardBadgeProps {
  children?: ReactNode;
  color?: CardBadgeColor;
}

function Card({
  children,
  variant = "default",
  hoverable = false,
  clickable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={[
        "rounded-2xl overflow-hidden transition-all duration-300",
        cardVariants[variant] ?? cardVariants.default,
        hoverable || clickable ? "hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-100" : "",
        clickable ? "cursor-pointer active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
function CardHeader({ children, withBorder = false, className = "" }: CardHeaderProps) {
  return <div className={["px-6 pt-6 pb-4", withBorder ? "border-b border-gray-100" : "", className].filter(Boolean).join(" ")}>{children}</div>;
}
function CardTitle({ children, className = "" }: BaseCardSectionProps) {
  return <h2 className={`text-xl font-bold tracking-tight text-gray-900 ${className}`}>{children}</h2>;
}
function CardDescription({ children, className = "" }: BaseCardSectionProps) {
  return <p className={`text-sm text-gray-500 mt-1 leading-relaxed ${className}`}>{children}</p>;
}
function CardContent({ children, className = "" }: BaseCardSectionProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
function CardFooter({ children, withBorder = true, className = "" }: CardFooterProps) {
  return <div className={["px-6 py-4", withBorder ? "border-t border-gray-100 bg-gray-50/60" : "", className].filter(Boolean).join(" ")}>{children}</div>;
}
function CardBadge({ children, color = "orange" }: CardBadgeProps) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColors[color]}`}>{children}</span>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge };
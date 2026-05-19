import React from "react";

/* =========================
   CARD ROOT
========================= */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================
   CARD HEADER
========================= */
export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-5 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

/* =========================
   CARD TITLE
========================= */
export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-xl font-semibold text-gray-800 tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

/* =========================
   CARD DESCRIPTION
========================= */
export function CardDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm text-gray-500 mt-1 ${className}`}>
      {children}
    </p>
  );
}

/* =========================
   CARD CONTENT
========================= */
export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}
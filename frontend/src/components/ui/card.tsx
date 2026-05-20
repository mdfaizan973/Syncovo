

const cardVariants = {
  default: "bg-white border border-gray-100 shadow-sm",
  elevated: "bg-white shadow-xl shadow-gray-100",
  outlined: "bg-white border-2 border-orange-200",
  filled: "bg-orange-50 border border-orange-100",
};

function Card({ children, variant = "default", hoverable = false, clickable = false, className = "" }) {
  return (
    <div
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
function CardHeader({ children, withBorder = false, className = "" }) {
  return <div className={["px-6 pt-6 pb-4", withBorder ? "border-b border-gray-100" : "", className].filter(Boolean).join(" ")}>{children}</div>;
}
function CardTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-bold tracking-tight text-gray-900 ${className}`}>{children}</h2>;
}
function CardDescription({ children, className = "" }) {
  return <p className={`text-sm text-gray-500 mt-1 leading-relaxed ${className}`}>{children}</p>;
}
function CardContent({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
function CardFooter({ children, withBorder = true, className = "" }) {
  return <div className={["px-6 py-4", withBorder ? "border-t border-gray-100 bg-gray-50/60" : "", className].filter(Boolean).join(" ")}>{children}</div>;
}
function CardBadge({ children, color = "orange" }) {
  const colors = { orange: "bg-orange-100 text-orange-600", green: "bg-green-100 text-green-600", red: "bg-red-100 text-red-600", blue: "bg-blue-100 text-blue-600", gray: "bg-gray-100 text-gray-600" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>{children}</span>;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardBadge };
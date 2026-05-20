import { Spinner } from "./small-elements";

const btnVariants = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 shadow-sm hover:shadow-md hover:shadow-orange-200 focus-visible:ring-orange-400",
  secondary: "bg-white text-orange-500 border border-orange-200 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-200",
  danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md hover:shadow-red-200 focus-visible:ring-red-400",
  success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-sm hover:shadow-md hover:shadow-green-200 focus-visible:ring-green-400",
  info: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-200 focus-visible:ring-blue-400",
  ghost: "bg-transparent text-orange-500 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-200",
  dark: "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 shadow-sm hover:shadow-md focus-visible:ring-gray-600",
  warning: "bg-amber-400 text-white hover:bg-amber-500 active:bg-amber-600 shadow-sm hover:shadow-md hover:shadow-amber-200 focus-visible:ring-amber-400",
};
const btnSizes = {
  sm: "h-8  px-3   text-xs  gap-1.5 rounded-lg",
  md: "h-10 px-4   text-sm  gap-2   rounded-xl",
  lg: "h-12 px-6   text-base gap-2  rounded-xl",
  xl: "h-14 px-8   text-lg  gap-2.5 rounded-2xl",
};
const btnIconOnly = {
  sm: "h-8  w-8  rounded-lg",
  md: "h-10 w-10 rounded-xl",
  lg: "h-12 w-12 rounded-xl",
  xl: "h-14 w-14 rounded-2xl",
};

function Button({ children, variant = "primary", size = "md", loading = false, disabled = false, fullWidth = false, iconOnly = false, leftIcon, rightIcon, className = "", onClick }: any) {
  const off = disabled || loading;
  return (
    <button
      type="button"
      disabled={off}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center font-semibold",
        "transition-all duration-200 ease-out cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        btnVariants[variant] ?? btnVariants.primary,
        iconOnly ? btnIconOnly[size] : btnSizes[size],
        fullWidth ? "w-full" : "",
        off ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
        className,
      ].filter(Boolean).join(" ")}
    >
      {loading
        ? <Spinner />
        : leftIcon && <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">{leftIcon}</span>
      }
      {!iconOnly && children && <span>{children}</span>}
      {!loading && rightIcon && <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
export { Button };
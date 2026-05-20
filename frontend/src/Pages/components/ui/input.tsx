import { useRef, useState } from "react";

function Input({ label, helperText, state = "", variant = "default", size = "md", type = "text", placeholder = "", leftIcon, rightIcon, clearable = false, maxLength, required = false, disabled = false, value, onChange, className = "" }: any) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;
    const handleChange = (e) => { if (!isControlled) setInternal(e.target.value); onChange?.(e); };
    const handleClear = () => { if (!isControlled) setInternal(""); onChange?.({ target: { value: "" } }); };
    const showClear = clearable && val && !disabled;

    const wrapBase = variant === "filled" ? "bg-orange-50 border border-transparent" : "bg-white border border-gray-200";
    const wrapState = state === "error"
        ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
        : state === "success"
            ? "border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";
    const sizeH = { sm: "h-8 text-xs px-3", md: "h-10 text-sm px-3.5", lg: "h-12 text-base px-4" }[size];
    const iLP = { sm: "pl-8", md: "pl-10", lg: "pl-11" }[size];
    const iRP = { sm: "pr-8", md: "pr-10", lg: "pr-11" }[size];
    const helperColor = state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}
            <div className={["relative flex items-center w-full rounded-xl transition-all duration-150", wrapBase, wrapState, disabled ? "opacity-50 bg-gray-50 cursor-not-allowed" : ""].filter(Boolean).join(" ")}>
                {leftIcon && <span className="absolute left-3 text-gray-400 pointer-events-none w-4 h-4 flex items-center justify-center">{leftIcon}</span>}
                <input
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={val}
                    onChange={handleChange}
                    maxLength={maxLength}
                    required={required}
                    className={["flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed", sizeH, leftIcon ? iLP : "", (rightIcon || showClear) ? iRP : ""].filter(Boolean).join(" ")}
                />
                {showClear && (
                    <button type="button" onClick={handleClear} tabIndex={-1} className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                )}
                {rightIcon && !showClear && <span className="absolute right-3 text-gray-400 pointer-events-none w-4 h-4 flex items-center justify-center">{rightIcon}</span>}
            </div>
            {(helperText || maxLength) && (
                <div className="flex justify-between mt-1.5">
                    {helperText && <p className={`text-xs ${helperColor}`}>{helperText}</p>}
                    {maxLength && <span className="text-xs text-gray-400 ml-auto">{val.length}/{maxLength}</span>}
                </div>
            )}
        </div>
    );
}

function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);
  
    const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (value[i]) {
          const next = [...value];
          next[i] = "";
          onChange(next);
        } else if (i > 0) {
          refs.current[i - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && i > 0) {
        refs.current[i - 1]?.focus();
      } else if (e.key === "ArrowRight" && i < 5) {
        refs.current[i + 1]?.focus();
      }
    };
  
    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/\D/g, "");
      if (!raw) return;
      // Handle paste of multiple digits
      if (raw.length > 1) {
        const digits = raw.slice(0, 6 - i).split("");
        const next = [...value];
        digits.forEach((d, di) => { if (i + di < 6) next[i + di] = d; });
        onChange(next);
        const focusIdx = Math.min(i + digits.length, 5);
        refs.current[focusIdx]?.focus();
        return;
      }
      const next = [...value];
      next[i] = raw[0];
      onChange(next);
      if (i < 5) refs.current[i + 1]?.focus();
    };
  
    return (
      <div className="flex gap-2 sm:gap-3 justify-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={el => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={value[i] || ""}
            onChange={e => handleChange(i, e)}
            onKeyDown={e => handleKey(i, e)}
            onFocus={e => e.target.select()}
            className={[
              "w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none",
              "transition-all duration-150 bg-white text-gray-900",
              "focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:scale-105",
              value[i] ? "border-orange-400 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-900",
            ].join(" ")}
          />
        ))}
      </div>
    );
  }

  
function Textarea({ label, helperText, state = "", placeholder = "", required = false, disabled = false, rows = 4, maxLength, value, onChange }: any) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;
    const handleChange = (e) => { if (!isControlled) setInternal(e.target.value); onChange?.(e); };
    const borderClass = state === "error"
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : state === "success"
            ? "border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
            : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100";
    const helperColor = state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}{required && <span className="text-orange-500 ml-0.5">*</span>}</label>}
            <textarea rows={rows} disabled={disabled} placeholder={placeholder} value={val} onChange={handleChange} maxLength={maxLength} required={required}
                className={["w-full bg-white text-gray-900 placeholder:text-gray-300 border rounded-xl px-3.5 py-2.5 text-sm resize-y outline-none transition-all duration-150", borderClass, disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""].filter(Boolean).join(" ")} />
            {(helperText || maxLength) && (
                <div className="flex justify-between mt-1.5">
                    {helperText && <p className={`text-xs ${helperColor}`}>{helperText}</p>}
                    {maxLength && <span className="text-xs text-gray-400 ml-auto">{val.length}/{maxLength}</span>}
                </div>
            )}
        </div>
    );
}

function Checkbox({ label, checked = false, onChange, disabled = false }: any) {
    return (
        <label className={["inline-flex items-center gap-2.5 cursor-pointer select-none", disabled ? "opacity-50 cursor-not-allowed" : ""].filter(Boolean).join(" ")}>
            <div className="relative flex-shrink-0">
                <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" />
                <div className={["w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center", checked ? "bg-orange-500 border-orange-500" : "bg-white border-gray-300"].join(" ")}>
                    {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" /></svg>}
                </div>
            </div>
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}

function Radio({ label, checked = false, onChange, name, value, disabled = false }) {
    return (
        <label className={["inline-flex items-center gap-2.5 cursor-pointer select-none", disabled ? "opacity-50 cursor-not-allowed" : ""].filter(Boolean).join(" ")}>
            <div className="relative flex-shrink-0">
                <input type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled} className="peer sr-only" />
                <div className={["w-5 h-5 rounded-full border-2 transition-all duration-150 flex items-center justify-center", checked ? "border-orange-500" : "border-gray-300"].join(" ")}>
                    {checked && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                </div>
            </div>
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}

export { Input, Textarea, Checkbox, Radio, OtpInput };
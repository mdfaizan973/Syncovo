import { useRef, useState } from "react";
import type {
    ChangeEvent,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
    TextareaHTMLAttributes,
    SelectHTMLAttributes,
} from "react";

// ─────────────────────────────────────────────
// SHARED TYPES & CONSTANTS
// ─────────────────────────────────────────────

const inputSizes = {
    sm: "h-8 text-xs px-3",
    md: "h-10 text-sm px-3.5",
    lg: "h-12 text-base px-4",
};

const inputLeftPadding = {
    sm: "pl-8",
    md: "pl-10",
    lg: "pl-11",
};

const inputRightPadding = {
    sm: "pr-8",
    md: "pr-10",
    lg: "pr-11",
};

type InputState = "" | "error" | "success";
type InputVariant = "default" | "filled";
type InputSize = keyof typeof inputSizes;

// ─────────────────────────────────────────────
// EXISTING COMPONENTS (unchanged)
// ─────────────────────────────────────────────

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    variant?: InputVariant;
    size?: InputSize;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    clearable?: boolean;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    label?: ReactNode;
    checked?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
    label?: ReactNode;
    checked?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
    label,
    helperText,
    state = "",
    variant = "default",
    size = "md",
    type = "text",
    placeholder = "",
    leftIcon,
    rightIcon,
    clearable = false,
    maxLength,
    required = false,
    disabled = false,
    value,
    onChange,
    className = "",
}: InputProps) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternal(e.target.value);
        onChange?.(e);
    };

    const handleClear = () => {
        if (!isControlled) setInternal("");
        onChange?.({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
    };

    const showClear = clearable && val && !disabled;

    const wrapBase =
        variant === "filled"
            ? "bg-orange-50 border border-transparent"
            : "bg-white border border-gray-200";

    const wrapState =
        state === "error"
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : state === "success"
            ? "border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";

    const sizeH = inputSizes[size];
    const iLP = inputLeftPadding[size];
    const iRP = inputRightPadding[size];
    const helperColor =
        state === "error"
            ? "text-red-500"
            : state === "success"
            ? "text-green-600"
            : "text-gray-400";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    "relative flex items-center w-full rounded-xl transition-all duration-150",
                    wrapBase,
                    wrapState,
                    disabled ? "opacity-50 bg-gray-50 cursor-not-allowed" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {leftIcon && (
                    <span className="absolute left-3 text-gray-400 pointer-events-none w-4 h-4 flex items-center justify-center">
                        {leftIcon}
                    </span>
                )}

                <input
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={val}
                    onChange={handleChange}
                    maxLength={maxLength}
                    required={required}
                    className={[
                        "flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed",
                        sizeH,
                        leftIcon ? iLP : "",
                        rightIcon || showClear ? iRP : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />

                {showClear && (
                    <button
                        type="button"
                        onClick={handleClear}
                        tabIndex={-1}
                        className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {rightIcon && !showClear && (
                    <span className="absolute right-3 text-gray-400 pointer-events-none w-4 h-4 flex items-center justify-center">
                        {rightIcon}
                    </span>
                )}
            </div>

            {(helperText || maxLength) && (
                <div className="flex justify-between mt-1.5">
                    {helperText && <p className={`text-xs ${helperColor}`}>{helperText}</p>}
                    {maxLength && (
                        <span className="text-xs text-gray-400 ml-auto">
                            {val.length}/{maxLength}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

function OtpInput({
    value,
    onChange,
}: {
    value: string[];
    onChange: (v: string[]) => void;
}) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
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

    const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (!raw) return;
        if (raw.length > 1) {
            const digits = raw.slice(0, 6 - i).split("");
            const next = [...value];
            digits.forEach((d, di) => {
                if (i + di < 6) next[i + di] = d;
            });
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
                    ref={(el) => {
                        refs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={value[i] || ""}
                    onChange={(e) => handleChange(i, e)}
                    onKeyDown={(e) => handleKey(i, e)}
                    onFocus={(e) => e.target.select()}
                    className={[
                        "w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 outline-none",
                        "transition-all duration-150 bg-white text-gray-900",
                        "focus:border-orange-500 focus:ring-2 focus:ring-orange-100 focus:scale-105",
                        value[i]
                            ? "border-orange-400 bg-orange-50 text-orange-600"
                            : "border-gray-200 text-gray-900",
                    ].join(" ")}
                />
            ))}
        </div>
    );
}

function Textarea({
    label,
    helperText,
    state = "",
    placeholder = "",
    required = false,
    disabled = false,
    rows = 4,
    maxLength,
    value,
    onChange,
}: TextareaProps) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) setInternal(e.target.value);
        onChange?.(e);
    };

    const borderClass =
        state === "error"
            ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : state === "success"
            ? "border-green-400 focus:border-green-400 focus:ring-2 focus:ring-green-100"
            : "border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

    const helperColor =
        state === "error"
            ? "text-red-500"
            : state === "success"
            ? "text-green-600"
            : "text-gray-400";

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <textarea
                rows={rows}
                disabled={disabled}
                placeholder={placeholder}
                value={val}
                onChange={handleChange}
                maxLength={maxLength}
                required={required}
                className={[
                    "w-full bg-white text-gray-900 placeholder:text-gray-300 border rounded-xl px-3.5 py-2.5 text-sm resize-y outline-none transition-all duration-150",
                    borderClass,
                    disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            />

            {(helperText || maxLength) && (
                <div className="flex justify-between mt-1.5">
                    {helperText && <p className={`text-xs ${helperColor}`}>{helperText}</p>}
                    {maxLength && (
                        <span className="text-xs text-gray-400 ml-auto">
                            {val.length}/{maxLength}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

function Checkbox({
    label,
    checked = false,
    onChange,
    disabled = false,
}: CheckboxProps) {
    return (
        <label
            className={[
                "inline-flex items-center gap-2.5 cursor-pointer select-none",
                disabled ? "opacity-50 cursor-not-allowed" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="relative flex-shrink-0">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="peer sr-only"
                />

                <div
                    className={[
                        "w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center",
                        checked ? "bg-orange-500 border-orange-500" : "bg-white border-gray-300",
                    ].join(" ")}
                >
                    {checked && (
                        <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                    )}
                </div>
            </div>

            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}

function Radio({
    label,
    checked = false,
    onChange,
    name,
    value,
    disabled = false,
}: RadioProps) {
    return (
        <label
            className={[
                "inline-flex items-center gap-2.5 cursor-pointer select-none",
                disabled ? "opacity-50 cursor-not-allowed" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="relative flex-shrink-0">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="peer sr-only"
                />

                <div
                    className={[
                        "w-5 h-5 rounded-full border-2 transition-all duration-150 flex items-center justify-center",
                        checked ? "border-orange-500" : "border-gray-300",
                    ].join(" ")}
                >
                    {checked && <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                </div>
            </div>

            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}

// ─────────────────────────────────────────────
// NEW COMPONENTS
// ─────────────────────────────────────────────

// ── DateInput ──────────────────────────────

interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange"> {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    size?: InputSize;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function DateInput({
    label,
    helperText,
    state = "",
    size = "md",
    required = false,
    disabled = false,
    value,
    onChange,
    className = "",
    ...rest
}: DateInputProps) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) setInternal(e.target.value);
        onChange?.(e);
    };

    const wrapState =
        state === "error"
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : state === "success"
            ? "border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";

    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    "relative flex items-center w-full rounded-xl border bg-white transition-all duration-150",
                    wrapState,
                    disabled ? "opacity-50 bg-gray-50 cursor-not-allowed border-gray-200" : "border-gray-200",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <span className="absolute left-3 text-gray-400 pointer-events-none w-4 h-4 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </span>

                <input
                    type="date"
                    disabled={disabled}
                    required={required}
                    value={val}
                    onChange={handleChange}
                    {...rest}
                    className={[
                        "flex-1 bg-transparent outline-none text-gray-900 disabled:cursor-not-allowed",
                        "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
                        inputSizes[size],
                        inputLeftPadding[size],
                        inputRightPadding[size],
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />

                <span className="absolute right-3 text-gray-300 pointer-events-none w-4 h-4 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>

            {helperText && (
                <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ── DateRangeInput ─────────────────────────

interface DateRangeInputProps {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    size?: InputSize;
    startValue?: string;
    endValue?: string;
    onStartChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onEndChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

function DateRangeInput({
    label,
    helperText,
    state = "",
    size = "md",
    startValue,
    endValue,
    onStartChange,
    onEndChange,
    required = false,
    disabled = false,
    className = "",
}: DateRangeInputProps) {
    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    const wrapState =
        state === "error"
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : state === "success"
            ? "border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    "flex items-center w-full rounded-xl border bg-white transition-all duration-150 overflow-hidden",
                    wrapState,
                    disabled ? "opacity-50 bg-gray-50 border-gray-200" : "border-gray-200",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <input
                    type="date"
                    disabled={disabled}
                    value={startValue ?? ""}
                    onChange={onStartChange}
                    className={[
                        "flex-1 bg-transparent outline-none text-gray-900 disabled:cursor-not-allowed text-sm",
                        inputSizes[size],
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />

                <div className="flex items-center gap-1 px-2 text-gray-300 shrink-0 select-none">
                    <div className="w-4 h-px bg-gray-300" />
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="w-4 h-px bg-gray-300" />
                </div>

                <input
                    type="date"
                    disabled={disabled}
                    value={endValue ?? ""}
                    onChange={onEndChange}
                    className={[
                        "flex-1 bg-transparent outline-none text-gray-900 disabled:cursor-not-allowed text-sm",
                        inputSizes[size],
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />
            </div>

            {helperText && (
                <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ── Select ─────────────────────────────────

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "value" | "onChange"> {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    size?: InputSize;
    options: SelectOption[];
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({
    label,
    helperText,
    state = "",
    size = "md",
    options,
    placeholder = "Select an option",
    required = false,
    disabled = false,
    value,
    onChange,
    className = "",
}: SelectProps) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!isControlled) setInternal(e.target.value);
        onChange?.(e);
    };

    const wrapState =
        state === "error"
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : state === "success"
            ? "border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";

    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    "relative flex items-center w-full rounded-xl border bg-white transition-all duration-150",
                    wrapState,
                    disabled ? "opacity-50 bg-gray-50 border-gray-200 cursor-not-allowed" : "border-gray-200",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <select
                    disabled={disabled}
                    required={required}
                    value={val}
                    onChange={handleChange}
                    className={[
                        "w-full bg-transparent outline-none text-gray-900 appearance-none disabled:cursor-not-allowed pr-9",
                        !val ? "text-gray-300" : "text-gray-900",
                        inputSizes[size],
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((opt) => (
                        <option
                            key={opt.value}
                            value={opt.value}
                            disabled={opt.disabled}
                        >
                            {opt.label}
                        </option>
                    ))}
                </select>

                <span className="absolute right-3 text-gray-400 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>

            {helperText && (
                <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ── MultiSelect ────────────────────────────

interface MultiSelectProps {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    size?: InputSize;
    options: SelectOption[];
    placeholder?: string;
    value?: string[];
    onChange?: (selected: string[]) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

function MultiSelect({
    label,
    helperText,
    state = "",
    options,
    placeholder = "Select options...",
    required = false,
    disabled = false,
    value,
    onChange,
    className = "",
}: MultiSelectProps) {
    const [internal, setInternal] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const isControlled = value !== undefined;
    const selected = isControlled ? (value as string[]) : internal;
    const ref = useRef<HTMLDivElement>(null);

    const toggle = (val: string) => {
        const next = selected.includes(val)
            ? selected.filter((v) => v !== val)
            : [...selected, val];
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const remove = (val: string) => {
        const next = selected.filter((v) => v !== val);
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const wrapState =
        state === "error"
            ? "border-red-400 ring-2 ring-red-100"
            : state === "success"
            ? "border-green-400 ring-2 ring-green-100"
            : open
            ? "border-orange-400 ring-2 ring-orange-100"
            : "border-gray-200";

    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    const selectedLabels = options.filter((o) => selected.includes(o.value));

    return (
        <div className={`w-full relative ${className}`} ref={ref}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                onClick={() => !disabled && setOpen((v) => !v)}
                className={[
                    "min-h-[40px] w-full rounded-xl border bg-white px-3 py-1.5 flex flex-wrap items-center gap-1.5 cursor-pointer transition-all duration-150",
                    wrapState,
                    disabled ? "opacity-50 cursor-not-allowed" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {selectedLabels.length === 0 ? (
                    <span className="text-sm text-gray-300 py-1">{placeholder}</span>
                ) : (
                    selectedLabels.map((opt) => (
                        <span
                            key={opt.value}
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100"
                        >
                            {opt.label}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    remove(opt.value);
                                }}
                                className="text-orange-400 hover:text-orange-600 transition-colors"
                            >
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    ))
                )}

                <span className="ml-auto pl-1 text-gray-400 shrink-0">
                    <svg
                        className={`w-4 h-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </div>

            {open && !disabled && (
                <div className="absolute z-20 top-full mt-1.5 w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {options.map((opt) => {
                        const isSelected = selected.includes(opt.value);
                        return (
                            <div
                                key={opt.value}
                                onClick={() => !opt.disabled && toggle(opt.value)}
                                className={[
                                    "flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors text-sm",
                                    opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-orange-50/60",
                                    isSelected ? "text-orange-700" : "text-gray-700",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div
                                    className={[
                                        "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
                                        isSelected
                                            ? "bg-orange-500 border-orange-500"
                                            : "bg-white border-gray-300",
                                    ].join(" ")}
                                >
                                    {isSelected && (
                                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                        </svg>
                                    )}
                                </div>
                                {opt.label}
                            </div>
                        );
                    })}
                </div>
            )}

            {helperText && (
                <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ── Toggle / Switch ────────────────────────

interface ToggleProps {
    label?: ReactNode;
    description?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: "sm" | "md";
}

function Toggle({
    label,
    description,
    checked = false,
    onChange,
    disabled = false,
    size = "md",
}: ToggleProps) {
    const trackW = size === "sm" ? "w-8" : "w-11";
    const trackH = size === "sm" ? "h-4" : "h-6";
    const thumbW = size === "sm" ? "w-3 h-3" : "w-4 h-4";
    const thumbTranslate = size === "sm" ? "translate-x-4" : "translate-x-5";

    return (
        <label
            className={[
                "inline-flex items-start gap-3 cursor-pointer select-none",
                disabled ? "opacity-50 cursor-not-allowed" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className={`relative flex-shrink-0 mt-0.5 ${trackW} ${trackH} rounded-full transition-all duration-200 ${checked ? "bg-orange-500" : "bg-gray-200"}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChange?.(e.target.checked)}
                    className="sr-only"
                />

                <div
                    className={[
                        `absolute top-1/2 -translate-y-1/2 left-1 bg-white rounded-full shadow-sm transition-transform duration-200 ${thumbW}`,
                        checked ? thumbTranslate : "translate-x-0",
                    ].join(" ")}
                />
            </div>

            {(label || description) && (
                <div>
                    {label && (
                        <p className="text-sm font-medium text-gray-700 leading-none">
                            {label}
                        </p>
                    )}
                    {description && (
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            )}
        </label>
    );
}

// ── RadioGroup ─────────────────────────────

interface RadioGroupOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    label?: ReactNode;
    helperText?: ReactNode;
    name: string;
    options: RadioGroupOption[];
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "card";
    className?: string;
}

function RadioGroup({
    label,
    helperText,
    name,
    options,
    value,
    onChange,
    required = false,
    disabled = false,
    orientation = "vertical",
    variant = "default",
    className = "",
}: RadioGroupProps) {
    const [internal, setInternal] = useState("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;

    const handleChange = (v: string) => {
        if (!isControlled) setInternal(v);
        onChange?.(v);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    orientation === "horizontal"
                        ? "flex flex-wrap gap-3"
                        : "flex flex-col gap-2",
                ].join(" ")}
            >
                {options.map((opt) => {
                    const isSelected = val === opt.value;
                    const isDisabled = disabled || opt.disabled;

                    if (variant === "card") {
                        return (
                            <label
                                key={opt.value}
                                className={[
                                    "flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 select-none",
                                    isSelected
                                        ? "border-orange-400 bg-orange-50/60"
                                        : "border-gray-200 bg-white hover:border-gray-300",
                                    isDisabled ? "opacity-50 cursor-not-allowed" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <input
                                    type="radio"
                                    name={name}
                                    value={opt.value}
                                    checked={isSelected}
                                    disabled={isDisabled}
                                    onChange={() => !isDisabled && handleChange(opt.value)}
                                    className="sr-only"
                                />

                                <div
                                    className={[
                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
                                        isSelected ? "border-orange-500" : "border-gray-300",
                                    ].join(" ")}
                                >
                                    {isSelected && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                                    )}
                                </div>

                                <div>
                                    <p className={`text-sm font-medium ${isSelected ? "text-orange-700" : "text-gray-700"}`}>
                                        {opt.label}
                                    </p>
                                    {opt.description && (
                                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                                            {opt.description}
                                        </p>
                                    )}
                                </div>
                            </label>
                        );
                    }

                    return (
                        <Radio
                            key={opt.value}
                            name={name}
                            value={opt.value}
                            label={opt.label}
                            checked={isSelected}
                            disabled={isDisabled}
                            onChange={() => !isDisabled && handleChange(opt.value)}
                        />
                    );
                })}
            </div>

            {helperText && (
                <p className="text-xs text-gray-400 mt-1.5">{helperText}</p>
            )}
        </div>
    );
}

// ── CheckboxGroup ──────────────────────────

interface CheckboxGroupOption {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
}

interface CheckboxGroupProps {
    label?: ReactNode;
    helperText?: ReactNode;
    options: CheckboxGroupOption[];
    value?: string[];
    onChange?: (selected: string[]) => void;
    required?: boolean;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "card";
    className?: string;
}

function CheckboxGroup({
    label,
    helperText,
    options,
    value,
    onChange,
    required = false,
    disabled = false,
    orientation = "vertical",
    variant = "default",
    className = "",
}: CheckboxGroupProps) {
    const [internal, setInternal] = useState<string[]>([]);
    const isControlled = value !== undefined;
    const selected = isControlled ? (value as string[]) : internal;

    const toggle = (v: string) => {
        const next = selected.includes(v)
            ? selected.filter((s) => s !== v)
            : [...selected, v];
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    orientation === "horizontal"
                        ? "flex flex-wrap gap-3"
                        : "flex flex-col gap-2",
                ].join(" ")}
            >
                {options.map((opt) => {
                    const isChecked = selected.includes(opt.value);
                    const isDisabled = disabled || opt.disabled;

                    if (variant === "card") {
                        return (
                            <label
                                key={opt.value}
                                className={[
                                    "flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 select-none",
                                    isChecked
                                        ? "border-orange-400 bg-orange-50/60"
                                        : "border-gray-200 bg-white hover:border-gray-300",
                                    isDisabled ? "opacity-50 cursor-not-allowed" : "",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div
                                    className={[
                                        "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
                                        isChecked
                                            ? "bg-orange-500 border-orange-500"
                                            : "bg-white border-gray-300",
                                    ].join(" ")}
                                    onClick={() => !isDisabled && toggle(opt.value)}
                                >
                                    {isChecked && (
                                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                        </svg>
                                    )}
                                </div>

                                <div onClick={() => !isDisabled && toggle(opt.value)}>
                                    <p className={`text-sm font-medium ${isChecked ? "text-orange-700" : "text-gray-700"}`}>
                                        {opt.label}
                                    </p>
                                    {opt.description && (
                                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                                            {opt.description}
                                        </p>
                                    )}
                                </div>
                            </label>
                        );
                    }

                    return (
                        <Checkbox
                            key={opt.value}
                            label={opt.label}
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={() => toggle(opt.value)}
                        />
                    );
                })}
            </div>

            {helperText && (
                <p className="text-xs text-gray-400 mt-1.5">{helperText}</p>
            )}
        </div>
    );
}

// ── NumberInput ────────────────────────────

interface NumberInputProps {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    size?: InputSize;
    value?: number | "";
    onChange?: (value: number | "") => void;
    min?: number;
    max?: number;
    step?: number;
    prefix?: string;
    suffix?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

function NumberInput({
    label,
    helperText,
    state = "",
    size = "md",
    value,
    onChange,
    min,
    max,
    step = 1,
    prefix,
    suffix,
    placeholder = "0",
    required = false,
    disabled = false,
    className = "",
}: NumberInputProps) {
    const [internal, setInternal] = useState<number | "">("");
    const isControlled = value !== undefined;
    const val = isControlled ? value : internal;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value === "" ? "" : Number(e.target.value);
        if (!isControlled) setInternal(v);
        onChange?.(v);
    };

    const increment = () => {
        const cur = val === "" ? 0 : val;
        const next = max !== undefined ? Math.min(cur + step, max) : cur + step;
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const decrement = () => {
        const cur = val === "" ? 0 : val;
        const next = min !== undefined ? Math.max(cur - step, min) : cur - step;
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const wrapState =
        state === "error"
            ? "border-red-400 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : state === "success"
            ? "border-green-400 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";

    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    "relative flex items-center w-full rounded-xl border bg-white transition-all duration-150 overflow-hidden",
                    wrapState,
                    disabled ? "opacity-50 bg-gray-50 border-gray-200" : "border-gray-200",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {prefix && (
                    <span className="flex items-center px-3 border-r border-gray-100 text-sm text-gray-400 bg-gray-50 self-stretch shrink-0">
                        {prefix}
                    </span>
                )}

                {/* Decrement */}
                <button
                    type="button"
                    onClick={decrement}
                    disabled={disabled || (min !== undefined && val !== "" && (val as number) <= min)}
                    className="flex items-center justify-center px-3 self-stretch text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-r border-gray-100"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>

                <input
                    type="number"
                    disabled={disabled}
                    placeholder={placeholder}
                    value={val}
                    onChange={handleChange}
                    min={min}
                    max={max}
                    step={step}
                    required={required}
                    className={[
                        "flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-300 text-center disabled:cursor-not-allowed [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                        inputSizes[size],
                    ]
                        .filter(Boolean)
                        .join(" ")}
                />

                {/* Increment */}
                <button
                    type="button"
                    onClick={increment}
                    disabled={disabled || (max !== undefined && val !== "" && (val as number) >= max)}
                    className="flex items-center justify-center px-3 self-stretch text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-l border-gray-100"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>

                {suffix && (
                    <span className="flex items-center px-3 border-l border-gray-100 text-sm text-gray-400 bg-gray-50 self-stretch shrink-0">
                        {suffix}
                    </span>
                )}
            </div>

            {helperText && (
                <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ── FileUpload ─────────────────────────────

interface FileUploadProps {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    accept?: string;
    multiple?: boolean;
    required?: boolean;
    disabled?: boolean;
    onChange?: (files: FileList | null) => void;
    className?: string;
}

function FileUpload({
    label,
    helperText,
    state = "",
    accept,
    multiple = false,
    required = false,
    disabled = false,
    onChange,
    className = "",
}: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (fl: FileList | null) => {
        if (!fl) return;
        const arr = Array.from(fl);
        setFiles(multiple ? arr : [arr[0]]);
        onChange?.(fl);
    };

    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    const borderColor =
        state === "error"
            ? "border-red-300 bg-red-50/30"
            : state === "success"
            ? "border-green-300 bg-green-50/30"
            : dragging
            ? "border-orange-400 bg-orange-50/40"
            : "border-gray-200 bg-gray-50/50 hover:border-orange-300 hover:bg-orange-50/20";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                onClick={() => !disabled && inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); !disabled && setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    if (!disabled) handleFiles(e.dataTransfer.files);
                }}
                className={[
                    "rounded-xl border-2 border-dashed px-4 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-150",
                    borderColor,
                    disabled ? "opacity-50 cursor-not-allowed" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={(e) => handleFiles(e.target.files)}
                    className="sr-only"
                />

                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </div>

                {files.length === 0 ? (
                    <>
                        <p className="text-sm font-medium text-gray-600">
                            {dragging ? "Drop files here" : "Click or drag to upload"}
                        </p>
                        <p className="text-xs text-gray-400">
                            {accept ? `Accepted: ${accept}` : "Any file type accepted"}
                            {multiple ? " · Multiple files allowed" : ""}
                        </p>
                    </>
                ) : (
                    <div className="flex flex-col gap-1 w-full max-w-xs">
                        {files.map((f, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5"
                            >
                                <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-xs text-gray-600 truncate flex-1">{f.name}</span>
                                <span className="text-[10px] text-gray-400 shrink-0">
                                    {(f.size / 1024).toFixed(0)} KB
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {helperText && (
                <p className={`text-xs mt-1.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ── RangeSlider ────────────────────────────

interface RangeSliderProps {
    label?: ReactNode;
    helperText?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange?: (value: number) => void;
    showValue?: boolean;
    prefix?: string;
    suffix?: string;
    disabled?: boolean;
    className?: string;
}

function RangeSlider({
    label,
    helperText,
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    showValue = true,
    prefix = "",
    suffix = "",
    disabled = false,
    className = "",
}: RangeSliderProps) {
    const [internal, setInternal] = useState(min);
    const isControlled = value !== undefined;
    const val = isControlled ? (value as number) : internal;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        if (!isControlled) setInternal(v);
        onChange?.(v);
    };

    const pct = ((val - min) / (max - min)) * 100;

    return (
        <div className={`w-full ${className}`}>
            {(label || showValue) && (
                <div className="flex items-center justify-between mb-2">
                    {label && (
                        <label className="text-sm font-medium text-gray-700">{label}</label>
                    )}
                    {showValue && (
                        <span className="text-sm font-medium text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-lg">
                            {prefix}{val}{suffix}
                        </span>
                    )}
                </div>
            )}

            <div className="relative flex items-center h-5">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-orange-400 transition-all"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>

                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    disabled={disabled}
                    onChange={handleChange}
                    className="relative w-full appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:shadow-sm"
                />
            </div>

            <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-gray-400">{prefix}{min}</span>
                <span className="text-[10px] text-gray-400">{prefix}{max}{suffix}</span>
            </div>

            {helperText && (
                <p className="text-xs text-gray-400 mt-1">{helperText}</p>
            )}
        </div>
    );
}

// ── TagInput ───────────────────────────────

interface TagInputProps {
    label?: ReactNode;
    helperText?: ReactNode;
    state?: InputState;
    placeholder?: string;
    value?: string[];
    onChange?: (tags: string[]) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

function TagInput({
    label,
    helperText,
    state = "",
    placeholder = "Type and press Enter...",
    value,
    onChange,
    required = false,
    disabled = false,
    className = "",
}: TagInputProps) {
    const [internal, setInternal] = useState<string[]>([]);
    const [inputVal, setInputVal] = useState("");
    const isControlled = value !== undefined;
    const tags = isControlled ? (value as string[]) : internal;

    const add = () => {
        const trimmed = inputVal.trim();
        if (!trimmed || tags.includes(trimmed)) return;
        const next = [...tags, trimmed];
        if (!isControlled) setInternal(next);
        onChange?.(next);
        setInputVal("");
    };

    const remove = (tag: string) => {
        const next = tags.filter((t) => t !== tag);
        if (!isControlled) setInternal(next);
        onChange?.(next);
    };

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
        }
        if (e.key === "Backspace" && !inputVal && tags.length > 0) {
            remove(tags[tags.length - 1]);
        }
    };

    const wrapState =
        state === "error"
            ? "border-red-400 focus-within:ring-2 focus-within:ring-red-100"
            : state === "success"
            ? "border-green-400 focus-within:ring-2 focus-within:ring-green-100"
            : "border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100";

    const helperColor =
        state === "error" ? "text-red-500" : state === "success" ? "text-green-600" : "text-gray-400";

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {label}
                    {required && <span className="text-orange-500 ml-0.5">*</span>}
                </label>
            )}

            <div
                className={[
                    "min-h-[40px] w-full rounded-xl border bg-white px-2 py-1.5 flex flex-wrap items-center gap-1.5 transition-all duration-150",
                    wrapState,
                    disabled ? "opacity-50 cursor-not-allowed" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100"
                    >
                        {tag}
                        {!disabled && (
                            <button
                                type="button"
                                onClick={() => remove(tag)}
                                className="text-orange-400 hover:text-orange-600 transition-colors"
                            >
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </span>
                ))}

                <input
                    disabled={disabled}
                    placeholder={tags.length === 0 ? placeholder : ""}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKey}
                    onBlur={add}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-300 disabled:cursor-not-allowed py-0.5 px-1"
                />
            </div>

            <p className="text-[10px] text-gray-300 mt-1">
                Press Enter or comma to add a tag
            </p>

            {helperText && (
                <p className={`text-xs mt-0.5 ${helperColor}`}>{helperText}</p>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

export {
    Input,
    Textarea,
    Checkbox,
    Radio,
    OtpInput,
    DateInput,
    DateRangeInput,
    Select,
    MultiSelect,
    Toggle,
    RadioGroup,
    CheckboxGroup,
    NumberInput,
    FileUpload,
    RangeSlider,
    TagInput,
};
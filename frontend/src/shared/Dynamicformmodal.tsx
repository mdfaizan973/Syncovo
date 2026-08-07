import { useState, useEffect, useRef } from "react";
import { Input, Textarea, NumberInput, Select, DateInput, FileUpload, Toggle, TagInput } from "../components/ui/input";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface FormField {
    key: string;
    label: string;
    type:
        | "text"
        | "email"
        | "password"
        | "textarea"
        | "number"
        | "select"
        | "date"
        | "file"
        | "checkbox"
        | "toggle"
        | "tags";
    required?: boolean;
    placeholder?: string;
    options?: string[];
    helperText?: string;
    disabled?: boolean;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
}

interface DynamicFormModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    fields: FormField[];
    submitLabel?: string;
    initialValues?: Record<string, any>;
    onSubmit?: (data: Record<string, any>) => void;
}


function getDefaultValue(field: FormField): any {
    if (field.type === "number")   return "";
    if (field.type === "checkbox") return false;
    if (field.type === "toggle")   return false;
    if (field.type === "tags")     return [];
    return "";
}

// Field types that support the "expand to full view" icon
const EXPANDABLE_TYPES = ["text", "textarea"];

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────

export default function DynamicFormModal({
    open,
    initialValues,
    onClose,
    title = "Add Record",
    description,
    fields,
    submitLabel = "Save Record",
    onSubmit,
}: DynamicFormModalProps) {

    const [values, setValues] = useState<Record<string, any>>(initialValues || {});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [expandedKey, setExpandedKey] = useState<string | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (open) {
            const defaults: Record<string, any> = {};
            fields.forEach((f) => { defaults[f.key] = getDefaultValue(f); });
            setValues(initialValues || defaults);
            setErrors({});
            setSubmitted(false);
            setExpandedKey(null);
        }
    }, [open, fields, initialValues]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (expandedKey) {
                    setExpandedKey(null);
                } else {
                    onClose();
                }
            }
        };
        if (open) document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose, expandedKey]);

    const set = (key: string, val: any) => {
        setValues((prev) => ({ ...prev, [key]: val }));
        if (submitted) validate({ ...values, [key]: val });
    };

    const validate = (data: Record<string, any>) => {
        const errs: Record<string, string> = {};
        fields.forEach((f) => {
            if (!f.required) return;
            const v = data[f.key];
            if (
                v === "" ||
                v === null ||
                v === undefined ||
                (Array.isArray(v) && v.length === 0)
            ) {
                errs[f.key] = `${f.label} is required`;
            }
        });
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = () => {
        setSubmitted(true);
        if (!validate(values)) return;

        // normalize textarea values — replace literal \n string with actual newline
        const normalized = { ...values };
        fields.forEach((f) => {
            if (f.type === "textarea" && typeof normalized[f.key] === "string") {
                normalized[f.key] = normalized[f.key].replace(/\\n/g, "\n");
            }
        });

        onSubmit?.(normalized);   // ← send normalized instead of values
        onClose();
    };

    if (!open) return null;

    const expandedField = expandedKey ? fields.find((f) => f.key === expandedKey) : null;

    return (
        <div
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-[2px] p-0 sm:p-4"
        >

            {/* Modal panel */}
            <div className="w-full sm:max-w-lg bg-white sm:rounded-xl rounded-t-xl border border-gray-100 shadow-xl shadow-gray-200/60 flex flex-col max-h-[85vh] sm:max-h-[88vh]">

                {/* ── Header ── */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">

                    {/* Drag pill (mobile) */}
                    <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4 sm:hidden" />

                    <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                <svg
                                    className="w-4 h-4 text-orange-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-base font-bold tracking-tight text-gray-800">
                                    {title}
                                </h2>

                                {description && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {description}
                                    </p>
                                )}
                            </div>

                        </div>

                        <button
                            onClick={onClose}
                            className="w-8 h-8 cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all shrink-0"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>

                </div>


                {/* ── Form body ── */}
                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4">

                    <div className="flex flex-col gap-4">

                        {fields.map((field) => {

                            const val = values[field.key];
                            const err = errors[field.key];
                            const expandable = EXPANDABLE_TYPES.includes(field.type);

                            return (
                                <div key={field.key}>

                                    {/* ── text / email / password ── */}
                                    {expandable && (
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-sm font-medium text-gray-700">
                                                    {field.label}
                                                    {field.required && (
                                                        <span className="text-orange-500 ml-0.5">*</span>
                                                    )}
                                                </label>

                                                <button
                                                    type="button"
                                                    onClick={() => setExpandedKey(field.key)}
                                                    disabled={field.disabled}
                                                    title={`Expand ${field.label}`}
                                                    className="w-6 h-6 cursor-pointer rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-300 transition-all shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* <Input
                                                type={field.type}
                                                placeholder={field.placeholder ?? `Enter ${field.label}...`}
                                                required={field.required}
                                                disabled={field.disabled}
                                                helperText={err ?? field.helperText}
                                                state={err ? "error" : ""}
                                                value={val}
                                                onChange={(e) => set(field.key, e.target.value)}
                                            /> */}

                                            {field.type === "text" ? (
                                                <Input
                                                    type="text"
                                                    placeholder={field.placeholder ?? `Enter ${field.label}...`}
                                                    required={field.required}
                                                    disabled={field.disabled}
                                                    helperText={err ?? field.helperText}
                                                    state={err ? "error" : ""}
                                                    value={val}
                                                    onChange={(e) => set(field.key, e.target.value)}
                                                />
                                            ) : (
                                                                                        
                                            
                                                {/* ── textarea ── */}
                                                <Textarea
                                                    placeholder={field.placeholder ?? `Enter ${field.label}...`}
                                                    required={field.required}
                                                    disabled={field.disabled}
                                                    helperText={err ?? field.helperText}
                                                    state={err ? "error" : ""}
                                                    value={typeof val === "string" ? val.replace(/\\n/g, "\n") : val}
                                                    onChange={(e) => set(field.key, e.target.value)}
                                                    rows={3}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* ── number ── */}
                                    {field.type === "number" && (
                                        <NumberInput
                                            label={field.label}
                                            placeholder={field.placeholder ?? "0"}
                                            required={field.required}
                                            disabled={field.disabled}
                                            helperText={err ?? field.helperText}
                                            state={err ? "error" : ""}
                                            prefix={field.prefix}
                                            suffix={field.suffix}
                                            min={field.min}
                                            max={field.max}
                                            value={val}
                                            onChange={(v) => set(field.key, v)}
                                        />
                                    )}

                                    {/* ── select ── */}
                                    {field.type === "select" && (
                                        <Select
                                            label={field.label}
                                            placeholder={field.placeholder ?? `Select ${field.label}...`}
                                            required={field.required}
                                            disabled={field.disabled}
                                            helperText={err ?? field.helperText}
                                            state={err ? "error" : ""}
                                            options={
                                                field.options?.map((o) => ({
                                                    label: o,
                                                    value: o,
                                                })) ?? []
                                            }
                                            value={val}
                                            onChange={(e) => set(field.key, e.target.value)}
                                        />
                                    )}

                                    {/* ── date ── */}
                                    {field.type === "date" && (
                                        <DateInput
                                            label={field.label}
                                            required={field.required}
                                            disabled={field.disabled}
                                            helperText={err ?? field.helperText}
                                            state={err ? "error" : ""}
                                            value={val}
                                            onChange={(e) => set(field.key, e.target.value)}
                                        />
                                    )}

                                    {/* ── file ── */}
                                    {field.type === "file" && (
                                        <FileUpload
                                            label={field.label}
                                            required={field.required}
                                            disabled={field.disabled}
                                            helperText={err ?? field.helperText}
                                            state={err ? "error" : ""}
                                            onChange={(files) => set(field.key, files)}
                                        />
                                    )}

                                    {/* ── checkbox ── */}
                                    {field.type === "checkbox" && (
                                        <div className="flex flex-col gap-1">

                                            <label className="block text-sm font-medium text-gray-700">
                                                {field.label}
                                                {field.required && (
                                                    <span className="text-orange-500 ml-0.5">*</span>
                                                )}
                                            </label>

                                            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">

                                                <div
                                                    className={`w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center cursor-pointer ${
                                                        val
                                                            ? "bg-orange-500 border-orange-500"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                    onClick={() => set(field.key, !val)}
                                                >
                                                    {val && (
                                                        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                                        </svg>
                                                    )}
                                                </div>

                                                <span
                                                    className="text-sm text-gray-600 cursor-pointer"
                                                    onClick={() => set(field.key, !val)}
                                                >
                                                    {field.placeholder ?? `Enable ${field.label}`}
                                                </span>

                                            </label>

                                            {err && (
                                                <p className="text-xs text-red-500 mt-0.5">{err}</p>
                                            )}

                                        </div>
                                    )}

                                    {/* ── toggle ── */}
                                    {field.type === "toggle" && (
                                        <div className="flex flex-col gap-1">

                                            <label className="block text-sm font-medium text-gray-700">
                                                {field.label}
                                                {field.required && (
                                                    <span className="text-orange-500 ml-0.5">*</span>
                                                )}
                                            </label>

                                            <Toggle
                                                label={field.placeholder ?? `Enable ${field.label}`}
                                                checked={val}
                                                disabled={field.disabled}
                                                onChange={(v) => set(field.key, v)}
                                            />

                                            {err && (
                                                <p className="text-xs text-red-500 mt-0.5">{err}</p>
                                            )}

                                        </div>
                                    )}

                                    {/* ── tags ── */}
                                    {field.type === "tags" && (
                                        <TagInput
                                            label={field.label}
                                            placeholder={field.placeholder ?? `Add ${field.label}...`}
                                            required={field.required}
                                            disabled={field.disabled}
                                            helperText={err ?? field.helperText}
                                            state={err ? "error" : ""}
                                            value={val}
                                            onChange={(tags) => set(field.key, tags)}
                                        />
                                    )}

                                </div>
                            );
                        })}

                    </div>

                </div>

                {/* ── Footer ── */}
                <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">

                    {/* Validation summary */}
                    {submitted && Object.keys(errors).length > 0 && (
                        <div className="mb-3 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100">

                            <svg
                                className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            </svg>

                            <p className="text-xs text-red-600">
                                Please fill in all required fields —{" "}
                                <span className="font-medium">
                                    {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? "s" : ""} missing
                                </span>
                            </p>

                        </div>
                    )}

                    <div className="flex items-center gap-2">

                        <button
                            onClick={onClose}
                            className="flex-1 h-9 cursor-pointer text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="flex-1 h-9 cursor-pointer text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {submitLabel}
                        </button>

                    </div>

                </div>

            </div>

            {/* ── Expanded field overlay ── */}
            {expandedField && (
                <div
                    className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] p-0 sm:p-4"
                    onClick={(e) => { if (e.target === e.currentTarget) setExpandedKey(null); }}
                >
                    <div className="w-full sm:max-w-lg bg-white sm:rounded-xl rounded-t-xl border border-gray-100 shadow-xl shadow-gray-200/60 flex flex-col max-h-[80vh]">

                        <div className="px-5 pt-5 pb-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                            <h3 className="text-sm font-semibold text-gray-800">
                                {expandedField.label}
                            </h3>
                            <button
                                onClick={() => setExpandedKey(null)}
                                className="w-7 h-7 cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-5 flex-1 min-h-0 overflow-y-auto">
                            <textarea
                                autoFocus
                                rows={10}
                                value={values[expandedField.key] ?? ""}
                                onChange={(e) => set(expandedField.key, e.target.value)}
                                placeholder={expandedField.placeholder ?? `Enter ${expandedField.label}...`}
                                className="w-full resize-none text-sm text-gray-700 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200"
                            />
                        </div>

                        <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
                            <button
                                onClick={() => setExpandedKey(null)}
                                className="w-full h-9 cursor-pointer text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all"
                            >
                                Done
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

import { XIcon, Eye, Calendar, Hash, Type, AlignLeft, Mail, Lock, CheckSquare, Circle, ChevronDown, Clock } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface SchemaField {
  key: string;
  type:
    | "text"
    | "number"
    | "email"
    | "date"
    | "textarea"
    | "checkbox"
    | "radio"
    | "password"
    | "select";
  label: string;
  required?: boolean;
  options?: string[]; // for select / radio
}

interface TableData {
  id: string;
  name: string;
  description?: string;
  schema: SchemaField[];
  owner?: { id: string; name: string; email: string };
}

interface RowData {
  id: string;
  table_id: string;
  row_data: Record<string, any>;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

interface WorkSpaceRowViewModalProps {
  open: boolean;
  onClose: () => void;
  table: TableData;
  row: RowData;
}

// ── Field icon map ─────────────────────────────────────────────────────────────

const FIELD_ICONS: Record<string, React.ReactNode> = {
  text: <Type className="w-3.5 h-3.5" />,
  number: <Hash className="w-3.5 h-3.5" />,
  email: <Mail className="w-3.5 h-3.5" />,
  date: <Calendar className="w-3.5 h-3.5" />,
  textarea: <AlignLeft className="w-3.5 h-3.5" />,
  checkbox: <CheckSquare className="w-3.5 h-3.5" />,
  radio: <Circle className="w-3.5 h-3.5" />,
  password: <Lock className="w-3.5 h-3.5" />,
  select: <ChevronDown className="w-3.5 h-3.5" />,
};

const FIELD_BADGE_COLORS: Record<string, string> = {
  text: "bg-blue-50 text-blue-500 border-blue-100",
  number: "bg-purple-50 text-purple-500 border-purple-100",
  email: "bg-teal-50 text-teal-500 border-teal-100",
  date: "bg-orange-50 text-orange-500 border-orange-100",
  textarea: "bg-indigo-50 text-indigo-500 border-indigo-100",
  checkbox: "bg-green-50 text-green-500 border-green-100",
  radio: "bg-pink-50 text-pink-500 border-pink-100",
  password: "bg-red-50 text-red-400 border-red-100",
  select: "bg-amber-50 text-amber-500 border-amber-100",
};

// ── Field value renderer ───────────────────────────────────────────────────────

function FieldValue({ field, value }: { field: SchemaField; value: any }) {
  const isEmpty = value === undefined || value === null || value === "";

  if (isEmpty) {
    return (
      <span className="text-sm text-[#94a3b8] italic">No value provided</span>
    );
  }

  switch (field.type) {
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
              value === true || value === "true" || value === 1
                ? "bg-[#f97316] border-[#f97316]"
                : "border-[#e2e8f0] bg-white"
            }`}
          >
            {(value === true || value === "true" || value === 1) && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm font-medium text-[#0f172a]">
            {value === true || value === "true" || value === 1 ? "Yes" : "No"}
          </span>
        </div>
      );

    case "radio":
      return (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border-2 border-[#f97316] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#f97316]" />
          </div>
          <span className="text-sm text-[#0f172a]">{String(value)}</span>
        </div>
      );

    case "textarea":
      return (
        <p className="text-sm text-[#0f172a] leading-relaxed whitespace-pre-wrap break-words">
          {String(value)}
        </p>
      );

    case "password":
      return (
        <span className="text-sm font-mono text-[#475569] tracking-widest select-none">
          {"•".repeat(Math.min(String(value).length, 12))}
        </span>
      );

    case "date":
      return (
        <div className="flex items-center gap-2">
          <div className="h-7 px-2.5 rounded-lg bg-[#fff7ed] border border-orange-100 flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-[#f97316]" />
            <span className="text-sm font-medium text-[#0f172a]">
              {new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      );

    case "number":
      return (
        <span className="text-sm font-semibold tabular-nums text-[#0f172a]">
          {Number(value).toLocaleString()}
        </span>
      );

    case "email":
      return (
        <a
          href={`mailto:${value}`}
          className="text-sm text-[#f97316] hover:text-[#ea580c] underline underline-offset-2 transition-colors"
        >
          {String(value)}
        </a>
      );

    case "select":
      return (
        <span className="h-6 px-2.5 rounded-full text-xs font-medium border bg-[#fff7ed] text-[#f97316] border-orange-200 inline-flex items-center">
          {String(value)}
        </span>
      );

    default:
      return (
        <span className="text-sm text-[#0f172a] break-words">
          {String(value)}
        </span>
      );
  }
}

// ── Format date helper ─────────────────────────────────────────────────────────

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Modal ──────────────────────────────────────────────────────────────────────

export default function WorkSpaceRowViewModal({
  open,
  onClose,
  table,
  row,
}: WorkSpaceRowViewModalProps) {
  if (!open) return null;

  const filledCount = table.schema.filter(
    (f) => row.row_data[f.key] !== undefined && row.row_data[f.key] !== null && row.row_data[f.key] !== ""
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full sm:max-w-2xl bg-white sm:rounded-2xl rounded-t-2xl border border-[#e2e8f0] shadow-2xl shadow-gray-300/40 flex flex-col max-h-[92vh] overflow-hidden">

        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-[#e2e8f0] flex-shrink-0 bg-white">
          <div className="flex items-start justify-between gap-3">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff7ed] border border-orange-100 flex items-center justify-center shrink-0">
                <Eye className="w-4.5 h-4.5 text-[#f97316]" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-[#0f172a]">
                  Record Details
                </h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  {table.name}
                  {table.description ? ` · ${table.description}` : ""}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 cursor-pointer rounded-lg border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8] hover:text-[#0f172a] hover:border-[#94a3b8] transition-all shrink-0"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress pill */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-[#f8fafc] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] transition-all duration-500"
                style={{ width: `${(filledCount / table.schema.length) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-[#94a3b8] whitespace-nowrap">
              {filledCount}/{table.schema.length} fields filled
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {table.schema.map((field) => {
            const value = row.row_data[field.key];
            const isEmpty = value === undefined || value === null || value === "";
            const iconColor = FIELD_BADGE_COLORS[field.type] || FIELD_BADGE_COLORS.text;

            return (
              <div
                key={field.key}
                className={`rounded-xl border px-4 py-3 transition-all duration-150 ${
                  isEmpty
                    ? "border-[#e2e8f0] bg-[#f8fafc]"
                    : "border-[#e2e8f0] bg-white hover:border-orange-200 hover:shadow-sm hover:shadow-orange-50"
                }`}
              >
                {/* Field header */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${iconColor}`}
                  >
                    {FIELD_ICONS[field.type] ?? FIELD_ICONS.text}
                  </span>

                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#475569]">
                    {field.label}
                  </span>

                  {field.required && (
                    <span className="text-[10px] px-1.5 py-px rounded-full bg-red-50 text-red-400 border border-red-100 font-medium">
                      Required
                    </span>
                  )}

                  <span
                    className={`ml-auto text-[10px] px-1.5 py-px rounded-full border font-medium ${iconColor}`}
                  >
                    {field.type}
                  </span>
                </div>

                {/* Value */}
                <div className={field.type === "textarea" ? "mt-1" : ""}>
                  <FieldValue field={field} value={value} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer metadata ── */}
        <div className="px-5 py-3 border-t border-[#e2e8f0] bg-[#f8fafc] flex-shrink-0 rounded-b-2xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#94a3b8]" />
              <span className="text-[11px] text-[#94a3b8]">
                Created{" "}
                <span className="text-[#475569] font-medium">
                  {formatDateTime(row.created_at)}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#94a3b8]" />
              <span className="text-[11px] text-[#94a3b8]">
                Updated{" "}
                <span className="text-[#475569] font-medium">
                  {formatDateTime(row.updated_at)}
                </span>
              </span>
            </div>
            <div className="ml-auto">
              <span className="text-[11px] font-mono text-[#94a3b8]">
                ID: {row.id.slice(0, 8)}…
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

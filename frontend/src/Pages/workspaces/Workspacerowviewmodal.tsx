import React, { useState } from "react";
import {
  XIcon,
  Eye,
  Calendar,
  Hash,
  Type,
  AlignLeft,
  Mail,
  Lock,
  CheckSquare,
  Circle,
  ChevronDown,
  Clock,
  Maximize2,
  Minimize2,
} from "lucide-react";

// ── Field icon map ─────────────────────────────────────────────────────────────

const FIELD_ICONS = {
  text: <Type className="w-3 h-3" />,
  number: <Hash className="w-3 h-3" />,
  email: <Mail className="w-3 h-3" />,
  date: <Calendar className="w-3 h-3" />,
  textarea: <AlignLeft className="w-3 h-3" />,
  checkbox: <CheckSquare className="w-3 h-3" />,
  radio: <Circle className="w-3 h-3" />,
  password: <Lock className="w-3 h-3" />,
  select: <ChevronDown className="w-3 h-3" />,
};

const FIELD_BADGE_COLORS = {
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

function FieldValue({ field, value, expanded }) {
  const isEmpty = value === undefined || value === null || value === "";

  if (isEmpty) {
    return <span className="text-sm text-[#cbd5e1] italic">No value provided</span>;
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
              <CheckSquare className="w-3 h-3 text-white" strokeWidth={3} />
            )}
          </div>
          <span className="text-sm text-[#0f172a]">
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
        <p
          className={`text-sm text-[#0f172a] leading-relaxed whitespace-pre-wrap break-words ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
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
      return <span className="text-sm text-[#0f172a] break-words">{String(value)}</span>;
  }
}

// ── Format date helper ─────────────────────────────────────────────────────────

function formatDateTime(iso) {
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

export default function WorkSpaceRowViewModal({ open, onClose, table, row }) {
  const [expandedField, setExpandedField] = useState(null);

  if (!open) return null;

  const filledCount = table.schema.filter(
    (f) =>
      row.row_data[f.key] !== undefined &&
      row.row_data[f.key] !== null &&
      row.row_data[f.key] !== ""
  ).length;

  const toggleExpand = (key) => {
    setExpandedField((prev) => (prev === key ? null : key));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full sm:max-w-xl sm:rounded-2xl bg-white flex flex-col shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] rounded-t-2xl transition-all duration-200"
        style={expandedField ? { maxHeight: "90vh" } : undefined}
      >
        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-[#e2e8f0] flex-shrink-0 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff7ed] border border-orange-100 flex items-center justify-center shrink-0">
                <Eye className="w-4.5 h-4.5 text-[#f97316]" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-[#0f172a]">
                  {table.name}
                </h3>
                <p className="text-xs text-[#94a3b8] mt-0.5">
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
            const isTextarea = field.type === "textarea";
            const isExpanded = expandedField === field.key;

            // Hide other fields while one textarea is expanded, to give it room
            if (expandedField && !isExpanded) return null;

            return (
              <div
                key={field.key}
                className={`rounded-xl border px-4 py-3 transition-all duration-150 flex flex-col ${
                  isEmpty
                    ? "border-[#e2e8f0] bg-[#f8fafc]"
                    : "border-[#e2e8f0] bg-white hover:border-orange-200 hover:shadow-sm hover:shadow-orange-50"
                } ${isExpanded ? "flex-1 min-h-0" : ""}`}
                style={isExpanded ? { height: "90vh", maxHeight: "90vh" } : undefined}
              >
                {/* Field header */}
                <div className="flex items-center gap-2 mb-1.5 shrink-0">
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
                    className={`ml-2 text-[10px] px-1.5 py-px rounded-full border font-medium ${iconColor}`}
                  >
                    {field.type}
                  </span>

                  {isTextarea && !isEmpty && (
                    <button
                      onClick={() => toggleExpand(field.key)}
                      className="ml-auto cursor-pointer w-6 h-6 rounded-md border border-[#e2e8f0] flex items-center justify-center text-[#94a3b8] hover:text-[#f97316] hover:border-orange-200 transition-all shrink-0"
                      title={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <Minimize2 className="w-3 h-3" />
                      ) : (
                        <Maximize2 className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* Value */}
                <div
                  className={
                    isTextarea
                      ? `mt-1 ${isExpanded ? "flex-1 min-h-0 overflow-y-auto pr-1" : ""}`
                      : ""
                  }
                >
                  <FieldValue field={field} value={value} expanded={isExpanded} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer metadata ── */}
        {!expandedField && (
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
        )}
      </div>
    </div>
  );
}

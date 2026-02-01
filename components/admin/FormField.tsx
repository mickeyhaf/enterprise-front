const inputClass =
  "w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";

export function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  type?: "text" | "email" | "url" | "textarea";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={inputClass}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

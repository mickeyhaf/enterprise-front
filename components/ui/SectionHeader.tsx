export function SectionHeader({
  title,
  description,
  centered = false,
  className = "",
}: {
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className} mb-12`}>
      <div className={`w-16 h-1.5 bg-accent mb-6 ${centered ? "mx-auto" : ""}`}></div>
      <h2 className="text-4xl font-display font-bold mb-6 text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className={`text-slate-600 dark:text-slate-400 leading-relaxed ${centered ? "max-w-2xl mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}

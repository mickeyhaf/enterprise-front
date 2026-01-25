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
      <div className={`w-20 h-1.5 bg-accent mb-6 rounded-full ${centered ? "mx-auto" : ""}`}></div>
      <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-slate-900 dark:text-white leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p className={`text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light ${centered ? "max-w-2xl mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}

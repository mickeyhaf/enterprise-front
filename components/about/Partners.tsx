import { SectionHeader } from "@/components/ui/SectionHeader";

const partners = [
  "Mekelle University",
  "Tigray Development Association",
  "Regional Bureau of Trade",
  "Effort Investment Group",
  "Dedebit Microfinance",
  "Messebo Cement Factory",
  "Sur Construction",
  "Almeda Textile",
];

export function Partners() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Our Partners & Affiliations"
          description="Collaborating with industry leaders to create lasting impact."
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:bg-white dark:hover:bg-slate-700 transition-all group shadow-sm hover:shadow-md"
            >
              <span className="font-display font-bold text-lg text-slate-500 group-hover:text-primary text-center transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

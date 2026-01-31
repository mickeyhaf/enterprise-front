"use client";

import { useContent } from "@/lib/use-content";
import type { TestimonialItem } from "@/lib/api-client";
import { SectionHeader } from "@/components/ui/SectionHeader";

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "MU Consultancy delivered exceptional results for our infrastructure project. Their technical expertise coupled with local insight is unmatched.",
    author: "Ato Kebede T.",
    role: "CEO, Northern Construction Corp",
  },
  {
    quote:
      "Professional, reliable, and innovative. They guided us through complex regulatory landscapes seamlessly.",
    author: "Dr. Sarah Jones",
    role: "Director, NGO International",
  },
  {
    quote:
      "Their trade solutions streamlined our supply chain significantly. We saw a 20% reduction in logistics costs.",
    author: "Ms. Bethelhem A.",
    role: "Ops Manager, Trans-Ethiopia Trading",
  },
];

function TestimonialCard({
  quote,
  author,
  role,
}: {
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 relative">
      <div className="absolute top-6 left-6 text-6xl text-primary/20 font-serif leading-none">
        &quot;
      </div>
      <p className="text-slate-600 dark:text-slate-300 italic mb-6 relative z-10 pt-4 leading-relaxed">
        {quote}
      </p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{author}</div>
          <div className="text-xs font-bold uppercase tracking-wider text-primary">{role}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const { data: content } = useContent<{ items?: TestimonialItem[] }>("testimonials");
  const items = (content?.items?.length ? content.items : DEFAULT_TESTIMONIALS) as TestimonialItem[];

  return (
    <section className="py-32 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Client Success Stories"
          description="What our partners say about working with MU Consultancy."
          centered
        />
        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {items.map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              author={t.author}
              role={t.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

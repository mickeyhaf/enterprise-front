import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactCTA() {
  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
          Ready to Partner With Us?
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you need expert consultancy, trade solutions, or strategic partnership, our team is ready to help you achieve your goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Button asChild className="h-14 text-base px-10 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-14 text-base px-10 rounded-xl font-bold bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all">
            <Link href="/services">
              Explore Our Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

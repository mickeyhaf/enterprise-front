import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProductBySlug } from "@/lib/products";
import Link from "next/link";
import { ArrowRight, CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <PageShell>
      <Navbar />

      {/* Hero */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover grayscale-[20%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Package size={16} />
              Product Details
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              {product.title}
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              {product.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/contact?subject=${encodeURIComponent(product.title)}`}>
                <Button className="bg-accent text-primary px-8 py-6 rounded-md font-bold border border-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all flex items-center gap-2 text-base">
                  Request a Quote <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white px-8 py-6 rounded-md font-bold hover:bg-white/20 transition-all text-base border">
                  Back to Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader title="Overview" description={product.overview} className="mb-8" />
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
                <div className="relative h-[420px] w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-10 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-6">
                Key Highlights
              </h2>
              <ul className="space-y-4 mb-10">
                {(product.highlights ?? []).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/contact?subject=${encodeURIComponent(product.title)}`} className="w-full">
                  <Button className="w-full font-bold">
                    Talk to Our Team <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/services" className="w-full">
                  <Button variant="outline" className="w-full font-bold">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}


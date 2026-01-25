import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Calendar, User, ArrowRight, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { NEWS_ARTICLES } from "@/lib/news";

export default function NewsPage() {
  return (
    <PageShell>
      <Navbar />

      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
            alt="News and media center"
            fill
            className="object-cover grayscale-[20%]"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/40"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <Newspaper size={16} />
              Media Center
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
              News & <span className="text-accent italic">Updates</span>
            </h1>
            <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
              Stay informed with the latest announcements, industry insights, and success stories from MU Consultancy.
            </p>
          </div>
        </div>
      </header>

      {/* News Grid Section */}
      <section className="py-32 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Latest Articles"
            description="Insights and updates from our team of industry experts."
            centered
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS_ARTICLES.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    {item.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {item.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-display mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 text-base flex-grow leading-relaxed line-clamp-3 font-light">
                    {item.excerpt}
                  </p>
                  <Link href={`/news/${item.slug}`} className="inline-flex items-center text-primary font-bold text-sm hover:gap-3 transition-all group/link mt-auto">
                    Read Full Story <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center items-center gap-3">
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-slate-200 dark:border-slate-800" disabled>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="default" size="icon" className="w-12 h-12 rounded-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
              1
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all shadow-sm">
              2
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      {/* 
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-primary rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 text-white">
              <h2 className="text-3xl font-display font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-slate-200 mb-8 max-w-lg mx-auto">
                Get the latest industry news and company updates delivered directly to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-6 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Button className="bg-accent text-primary font-bold hover:bg-white transition-colors">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      */}

      <Footer />
    </PageShell>
  );
}

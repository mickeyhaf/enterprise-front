import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { Globe, Truck, Handshake, Factory, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function TradePage() {
  return (
    <PageShell>
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
            alt="Global trade background"
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
             <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 leading-[1.1]">
               Trade & Business <span className="text-accent italic">Solutions</span>
             </h1>
             <p className="text-lg text-slate-100 mb-8 max-w-xl font-light">
               Connecting your business to global markets through expert import/export services, optimized supply chains, and strategic industry partnerships.
             </p>
             <Button size="lg" className="bg-accent text-primary px-8 py-6 rounded-md font-bold hover:bg-white transition-all flex items-center gap-2 text-base w-fit">
               Contact Our Team <ArrowRight className="w-5 h-5" />
             </Button>
           </div>
        </div>
      </header>

      {/* Import & Export Section */}
      <section id="import-export" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
                alt="Import export container ship"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                <span>Global Reach</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Import & Export Services
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                We simplify the complexities of international trade. Our team handles every aspect of the process, from sourcing and compliance to final delivery, ensuring your goods move across borders without delay.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Global sourcing and procurement",
                  "Customs clearance and regulatory compliance",
                  "Freight forwarding (Air, Sea, Land)",
                  "Export documentation and trade finance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Button variant="default" className="font-bold">
                   Request a Quote
                </Button>
                <Link href="/trade/import-export">
                  <Button variant="outline" className="font-bold">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supply Chain Section */}
      <section id="supply-chain" className="py-24 bg-slate-50 dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium mb-6">
                <Truck className="w-4 h-4" />
                <span>Logistics</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Supply Chain Management
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                Efficiency is the backbone of any successful trade operation. We optimize your supply chain to reduce costs, improve visibility, and ensure timely delivery of your products.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Warehousing and inventory management",
                  "Distribution network optimization",
                  "Last-mile delivery solutions",
                  "Supply chain risk assessment"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Button variant="default" className="font-bold">
                   Analyze My Supply Chain
                </Button>
                <Link href="/trade/supply-chain">
                  <Button variant="outline" className="font-bold">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
                alt="Warehouse logistics"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section id="partnerships" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
                alt="Strategic partners handshake"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-medium mb-6">
                <Handshake className="w-4 h-4" />
                <span>Collaboration</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Partnerships & Collaborations
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                We believe in the power of connection. By fostering strategic alliances with industry leaders, academic institutions, and government bodies, we create value that goes beyond business transactions.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Joint ventures and strategic alliances",
                  "Academic research collaborations",
                  "Technology transfer programs",
                  "Public-Private Partnerships (PPP)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Button variant="default" className="font-bold">
                   Become a Partner
                </Button>
                <Link href="/trade/partnerships">
                  <Button variant="outline" className="font-bold">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-24 bg-slate-50 dark:bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 text-sm font-medium mb-6">
                <Factory className="w-4 h-4" />
                <span>Sectors</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Industry-Specific Expertise
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                Generic solutions don't solve specific problems. We offer tailored consultancy and trade services for key economic sectors, leveraging deep domain knowledge.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Manufacturing and industrial processing",
                  "Agriculture and agro-processing",
                  "Construction and infrastructure",
                  "Research and development projects"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Button variant="default" className="font-bold">
                   Consult an Expert
                </Button>
                <Link href="/trade/expertise">
                  <Button variant="outline" className="font-bold">
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
                alt="Industrial expertise"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}

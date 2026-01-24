import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Calendar, User, ArrowRight, Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  const newsItems = [
    {
      id: 1,
      title: "MU Consultancy Expands Regional Operations",
      excerpt: "We are proud to announce the opening of our new regional office in Dire Dawa, strengthening our commitment to serving clients across Ethiopia.",
      date: "January 15, 2026",
      author: "Corporate Communications",
      category: "Company News",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
    },
    {
      id: 2,
      title: "New Partnership with Global Logistics Firm",
      excerpt: "A strategic alliance has been formed to enhance our supply chain capabilities and provide faster, more reliable import/export solutions.",
      date: "December 10, 2025",
      author: "Trade Division",
      category: "Partnerships",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
    },
    {
      id: 3,
      title: "Sustainable Construction Practices Workshop",
      excerpt: "Our engineering team hosted a successful workshop on implementing green building standards in upcoming urban development projects.",
      date: "November 22, 2025",
      author: "Engineering Team",
      category: "Events",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
    },
    {
      id: 4,
      title: "2025 Annual Impact Report Released",
      excerpt: "Discover how MU Consultancy has driven economic growth and industrial innovation over the past year. Download the full report today.",
      date: "January 5, 2026",
      author: "Management",
      category: "Reports",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
    }
  ];

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
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
             title="Latest Articles" 
             description="Insights and updates from our team."
             centered
             className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-56 w-full overflow-hidden">
                   <Image 
                     src={item.image} 
                     alt={item.title}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                     {item.category}
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                     <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                     <span className="flex items-center gap-1"><User size={14} /> {item.author}</span>
                   </div>
                   <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                   <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm flex-grow leading-relaxed line-clamp-3">
                     {item.excerpt}
                   </p>
                   <Link href={`/news/${item.id}`} className="inline-flex items-center text-primary font-bold text-sm hover:underline mt-auto">
                     Read Full Story <ArrowRight className="ml-1 w-4 h-4" />
                   </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center items-center gap-2">
            <Button variant="outline" size="icon" className="w-10 h-10" disabled>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="default" size="icon" className="w-10 h-10 bg-primary text-white hover:bg-primary/90">
              1
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 hover:bg-primary hover:text-white transition-colors">
              2
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 hover:bg-primary hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
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

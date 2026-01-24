"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ProductCard } from "@/components/services/ProductCard";
import { ServiceOfferingCard } from "@/components/services/ServiceOfferingCard";
import { QuoteModal } from "@/components/services/QuoteModal";
import { Briefcase, Building2, Calculator, LineChart, Leaf, ShieldCheck, Truck, Factory } from "lucide-react";

// Mock Data
const PRODUCTS = [
  {
    title: "Construction Materials",
    description: "High-quality cement, reinforcement bars, and finishing materials for large-scale infrastructure projects.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
  },
  {
    title: "Industrial Machinery",
    description: "Advanced manufacturing equipment and heavy machinery sourced from global leaders.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
  },
  {
    title: "Agricultural Inputs",
    description: "Certified fertilizers, improved seeds, and modern farming tools to boost productivity.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
  },
  {
    title: "Textile & Garments",
    description: "Premium cotton fabrics and ready-made garments for domestic and export markets.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
  }
];

const SERVICES = [
  {
    title: "Engineering Consultancy",
    description: "Comprehensive design, supervision, and project management for civil and structural engineering works.",
    icon: Building2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
  },
  {
    title: "Environmental Assessment",
    description: "EIA studies, environmental auditing, and sustainability planning for development projects.",
    icon: Leaf,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
  },
  {
    title: "Business Strategy",
    description: "Market feasibility studies, strategic planning, and organizational development.",
    icon: LineChart,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
  },
  {
    title: "Financial Advisory",
    description: "Investment analysis, asset valuation, and financial risk management.",
    icon: Calculator,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
  },
  {
    title: "Quality Assurance",
    description: "ISO certification guidance and process optimization for manufacturing industries.",
    icon: ShieldCheck,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
  },
  {
    title: "Logistics Management",
    description: "Supply chain optimization and fleet management solutions.",
    icon: Truck,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir"
  }
];

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ name: string; type: "product" | "service" }>({ name: "", type: "product" });

  const handleRequestQuote = (name: string, type: "product" | "service") => {
    setSelectedItem({ name, type });
    setModalOpen(true);
  };

  return (
    <PageShell>
      <Navbar />
      <ServicesHero />
      
      {/* Products Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Products" 
            description="Quality inputs and materials sourced for reliability and performance."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                image={product.image}
                onRequestQuote={(title) => handleRequestQuote(title, "product")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Consultancy Services" 
            description="Expert knowledge transformed into actionable business solutions."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceOfferingCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                image={service.image}
                onRequestQuote={(title) => handleRequestQuote(title, "service")}
              />
            ))}
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        itemName={selectedItem.name}
        itemType={selectedItem.type}
      />
      
      <Footer />
    </PageShell>
  );
}

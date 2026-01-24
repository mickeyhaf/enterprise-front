import { Hero } from "@/components/home/Hero";
import { ServiceCard } from "@/components/home/ServiceCard";
import { TrustBadge } from "@/components/home/TrustBadge";
import { TeamCard } from "@/components/about/TeamCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rocket, Eye, ShieldCheck, Award, Leaf, Medal } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <PageShell>
      <Navbar />
      
      <Hero />

      {/* Heritage & Vision Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader 
                title="Our Heritage & Strategic Vision" 
                description="MU Consultancy and Business Enterprise was established to leverage the vast intellectual resources of Mekelle University for national development. For over three decades, we have been at the forefront of engineering, environmental science, and business strategy in the Horn of Africa."
              />
              
              <div className="grid gap-6">
                <ServiceCard
                  variant="primary"
                  icon={Rocket}
                  title="Our Mission"
                  description="To provide world-class consultancy and trade solutions that drive innovation and sustainable development across regional industries."
                />
                <ServiceCard
                  variant="accent"
                  icon={Eye}
                  title="Our Vision"
                  description="To be the preferred strategic partner for private and public enterprises seeking data-driven excellence and engineering precision."
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl z-10">
        <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw"
                    alt="Team meeting"
                    fill
                    className="object-cover"
                 />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-8 rounded-2xl z-20 hidden md:block">
                <div className="text-4xl font-bold mb-1 font-display">30+</div>
                <div className="text-sm font-medium opacity-80 uppercase tracking-widest">Years of Expertise</div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Leadership Team"
            description="Driven by a diverse board of industry experts and academic leaders dedicated to transformative growth."
            centered
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamCard
              name="Dr. Tesfaye Hagos"
              role="Managing Director"
              description="PhD in Strategic Management with 20+ years of consultancy experience across Africa."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDgIa0LBydZg1ubxyErFFj8XKqvTOK5d7_7OTj3Hb3A0X7RUTiA2u6saVtMh7iU9UTuv7zm4ETy4620OOZQ6TQ8oifGraLleIsE4a5xNruTpwLCNz5GCQkx5bPtwy_t50MP2Et7VF6TOmYyHXgZ2oQdIrkRouYzJDScR8jPsPGhSYrgKeG6ITv1jHiIUgF2JpypxymspFSFfkUUwUwZQaTx-dTXD5rMWviRSCI-b5F1Aq9BQirGNqYPatg2xnF2QmunNi7wDIMR-j17"
            />
             <TeamCard
              name="Ms. Selamawit Kassa"
              role="Director of Operations"
              description="Expert in logistics and infrastructure development projects in emerging markets."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuDCtxVlcl-gnjzWsuPlV6PxBvqqR1hdBZEw6kBWG6u07uAL4mBktYhy_vE5wOVnSn86F4SyCqTNkBGnOAZFmT2L1J4BmV-j-41sFOkGVi8H-0b63_se1gelW8aW-bmS1k3fa9-ZtNaRirti2pAl6mFEsKhuUTT_tzlyw3jIr0ilKu2CSyndyw73u-KJsjEJvJndBI3P1cV0zIvFyIPAeVCnzK4M3400wYIaIvX668JrC7NiRwlEeOjKg8DF97Gd31pFa7i1j4zIkZQZ"
            />
             <TeamCard
              name="Ato Gebremedhin T."
              role="Financial Controller"
              description="Certified Public Accountant specializing in public-private partnership financing."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN"
            />
             <TeamCard
              name="Dr. Almaz Berhe"
              role="Technical Advisor"
              description="Head of Innovation Lab, focusing on renewable energy and environmental tech."
              image="https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm"
            />
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 items-center gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-4">Trust & Quality</h2>
              <p className="text-slate-500 text-sm">
                Our commitment to international standards and professional ethics is recognized globally.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <TrustBadge icon={ShieldCheck} label="Standard" value="ISO 9001:2015" />
                <TrustBadge icon={Award} label="Excellence" value="National Trade Award" />
                <TrustBadge icon={Leaf} label="Compliance" value="Green Certification" />
                <TrustBadge icon={Medal} label="Recognized" value="Top Consultant 2023" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <div className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
           <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-slate-400"></span><span className="font-bold">WORLD BANK</span></div>
           <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-slate-400"></span><span className="font-bold">UN HABITAT</span></div>
           <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-slate-400"></span><span className="font-bold">EU DELEGATION</span></div>
           <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-slate-400"></span><span className="font-bold">MINISTRY OF MINES</span></div>
           <div className="flex items-center gap-2"><span className="w-8 h-8 rounded-full bg-slate-400"></span><span className="font-bold">GIZ ETHIOPIA</span></div>
        </div>
    </div>

      <Footer />
    </PageShell>
  );
}

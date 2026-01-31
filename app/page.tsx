import { Hero } from "@/components/home/Hero";
import { HeritageSection } from "@/components/home/HeritageSection";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { TrustSection } from "@/components/home/TrustSection";
import { PartnersLogos } from "@/components/home/PartnersLogos";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageShell } from "@/components/layout/PageShell";

export default function Home() {
  return (
    <PageShell>
      <Navbar />

      <Hero />
      <HeritageSection />
      <LeadershipSection />
      <TrustSection />
      <PartnersLogos />

      <Footer />
    </PageShell>
  );
}

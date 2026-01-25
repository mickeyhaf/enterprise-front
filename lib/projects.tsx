import { Building2, Leaf, Globe, CheckCircle, LucideIcon } from "lucide-react";

export type Project = {
    slug: string;
    title: string;
    category: string;
    image: string;
    description: string;
    icon: LucideIcon;
    challenge: string;
    solution: string;
    impact: string;
    location?: string;
    year?: string;
    client?: string;
};

export const PROJECTS: Project[] = [
    {
        slug: "mekelle-industrial-park-expansion",
        title: "Mekelle Industrial Park Expansion",
        category: "Engineering & Construction",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy0CHoOaR_EuZN-cOReFWOt3iAsGtQeZ0grPlPurcIegBkZj7TQDqRT4Fndi1TEfYaV7fHQR-jggMj5fqBq6y-qI3BXKdchQk14OveuGngJPx8c12b0kqAGQhaCbRGLDnJDtby4IuGV42Oa_Vh1u2MSVbvvrTfFpriQ7c-RaIAZRcNk3NEFXkZiJikWYFVSEI2R8n43TOXo0qUWLFafKmoZ9TH1qH6MH5iJHzmN4l7XU8kgptPeRMpkXMOwjz4E4fLx81vA-Frlsuw",
        description: "Structural design and project management for the 50-hectare expansion of the industrial park facilities.",
        icon: Building2,
        challenge: "The expansion needed to be completed within a tight 18-month timeframe while ensuring strict adherence to international environmental standards and accommodating complex heavy machinery requirements.",
        solution: "We implemented an agile construction management framework, utilizing pre-fabricated structural components to accelerate timelines. Our team conducted advanced soil stability analysis to optimize foundation designs for heavy load-bearing zones.",
        impact: "Delivered the project 2 months ahead of schedule, increasing the park's manufacturing capacity by 40% and creating space for 15 new international textile manufacturers.",
        location: "Mekelle, Tigray",
        year: "2023",
        client: "Industrial Parks Development Corporation"
    },
    {
        slug: "sustainable-agriculture-initiative",
        title: "Sustainable Agriculture Initiative",
        category: "Agri-Business",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAj2TqrSz5GqTnny1EaluHJdm8FZ2t59TX6BXKm7-wrKLO7cN7JYHthpE94yXx4ymfl6r4sxn50g5kYsAFepye2qDnBuUDbw-ypEtM-kjBQh0hTypufXvfeKveGZnAeWxBNEvJFc4ItvFDmsPIYMGstLGTIrCa_6q6GYz-ilZ-57QqqxJMPvWzweU3af0TvCpImFgCGlHza8TE7_ZvCm9BTlg8BCRFgVY1TmVwwo5qXXXn0jOPKTTQg2GmVVjbwXJ4oVP-AeolBVTm",
        description: "Supply chain optimization for organic sesame export, benefiting over 2,000 local farmers.",
        icon: Leaf,
        challenge: "Smallholder farmers faced post-harvest losses of up to 25% due to poor storage and lack of direct market access, resulting in low income despite high-quality produce.",
        solution: "We established a cooperative-based aggregation model with modern warehousing. Additionally, we negotiated direct contracts with European organic food processors, bypassing traditional intermediaries.",
        impact: "Reduced post-harvest losses to under 5%. Farmer incomes increased by 35% on average, and the region established itself as a reliable source of premium organic sesame.",
        location: "Western Tigray",
        year: "2024",
        client: "Regional Bureau of Agriculture"
    },
    {
        slug: "regional-trade-logistics-study",
        title: "Regional Trade Logistics Study",
        category: "Strategic Consultancy",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuq25mY3vXtdcC6waRuuYWdh-edBAMgq6MdS_JXCUmLFWfLOoyvNpZoj_099FXdAgo9XaQ8KE8PLMnWwdiQ7MyBH8IGsagy-as-ltkMky2oJGuxvfaONJ99VOQReAmppFueZxJ47Ycar9VSmxPWdSXnw7WzSRmNzGz9fYWQM84mOzB0uRpiD6zNa5QAHqZND5H5k0IyHOohMJrcRfAw9nUa8zYUh0NNjbxcNf0XrtPydzrGQfxKG0nfWx0zSDgwyVglJ7HL0HJW3ir",
        description: "Comprehensive feasibility study for a new dry port facility in Northern Ethiopia.",
        icon: Globe,
        challenge: "Identifying the optimal location and operational model for a new dry port to decongest regional trade routes and reduce import dwelling times.",
        solution: "Conducted a multi-modal transport analysis, demand forecasting simulation, and stakeholder consultations. We proposed a public-private partnership model to ensure operational efficiency and funding viability.",
        impact: "The study was approved by the Federal Transport Ministry. The proposed site is now under development, projected to cut cargo transit times by 3 days.",
        location: "Northern Ethiopia",
        year: "2023",
        client: "Ethiopian Maritime Affairs Authority"
    },
    {
        slug: "textile-quality-assurance-system",
        title: "Textile Quality Assurance System",
        category: "Manufacturing",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArZfHMXyLu6bE9DlN9LiX3kznR88dr2mhDOpHw0gvXhsxHPlaKa_lb3vpOWPa38-xxvHDwtsPx4ethSbFQKdDFuP86XQGUb5baDVtCWoovEwFD_1E1y1FV3pghTjgsP3RUAafZMG55UdLngpbe0CA1P85Z7nqVuzHKjV-yK954Et4dFvLeju_XwGkfJbRZBu5fix3mhgksBTyu1dvG4In6ssgP8yTv1NHeUAcxlJ2QT0iCRlzIs28nFTaDw5U73jj5CCOtJIt0lytN",
        description: "Implementation of ISO 9001:2015 quality management systems for a leading garment manufacturer.",
        icon: CheckCircle,
        challenge: "A major local garment manufacturer faced high rejection rates from international buyers (approx. 12%) and struggled to meet compliance documentation requirements.",
        solution: "We designed and implemented a bespoke Quality Management System (QMS) aligned with ISO 9001:2015. This included digital tracking of defects, staff training programs, and automated compliance reporting.",
        impact: "Rejection rates dropped to 0.5% within 6 months. The factory successfully secured contracts with two major European fashion brands.",
        location: "Kombolcha Industrial Park",
        year: "2022",
        client: "Global Garments PLC"
    }
];

export function getProjectBySlug(slug: string) {
    return PROJECTS.find((p) => p.slug === slug);
}
